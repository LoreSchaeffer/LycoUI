import {deriveRows, type DataTableModelColumn, type DataTableSortDirection} from './data-model';
import {renderDataTableRows, type VanillaDataTableColumn} from './DataTableRenderer';
import {controllerRegistry} from '../../vanilla/controller-registry';

export interface VanillaDataTableOptions<T extends Record<string, unknown>> {
  rows?: T[];
  columns?: VanillaDataTableColumn<T>[];
  pageSize?: number;
  selectable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onSelectionChange?: (rows: T[]) => void;
  reorderable?: boolean;
  onRowReorder?: (sourceIndex: number, destinationIndex: number) => void;
}

export class LycoDataTableController<T extends Record<string, unknown> = Record<string, unknown>> {
  private readonly table: HTMLTableElement;
  private readonly body: HTMLTableSectionElement;
  private readonly originalParent: ParentNode;
  private readonly originalNextSibling: ChildNode | null;
  private readonly root: HTMLDivElement;
  private readonly container: HTMLDivElement;
  private readonly searchInput: HTMLInputElement;
  private readonly rows: T[];
  private readonly columns: VanillaDataTableColumn<T>[];
  private readonly authoredRows = new Map<T, HTMLTableRowElement>();
  private readonly authoredOrder: HTMLTableRowElement[] = [];
  private readonly renderedRows = new Map<HTMLTableRowElement, T>();
  private page = 1;
  private sortColumn?: string;
  private sortDirection: DataTableSortDirection = 'asc';
  private readonly selectable: boolean;
  private readonly selected = new Set<T>();
  private readonly onSelectionChange?: (rows: T[]) => void;
  private readonly reorderable: boolean;
  private readonly onRowReorder?: (sourceIndex: number, destinationIndex: number) => void;
  private draggedRow?: HTMLTableRowElement;
  private readonly onSearchInput = (): void => this.setSearch(this.searchInput.value);

  constructor(table: HTMLTableElement, options: VanillaDataTableOptions<T> = {}) {
    this.table = table;
    this.originalParent = table.parentNode ?? document.body;
    this.originalNextSibling = table.nextSibling;
    this.root = document.createElement('div');
    this.root.className = 'data-table';
    const toolbar = document.createElement('div');
    toolbar.className = 'data-table-toolbar';
    const search = document.createElement('div');
    search.className = 'data-table-search';
    this.searchInput = document.createElement('input');
    this.searchInput.type = 'search';
    this.searchInput.className = 'input input-sm';
    this.searchInput.placeholder = table.dataset.searchPlaceholder ?? 'Search...';
    this.searchInput.setAttribute('aria-label', this.searchInput.placeholder);
    search.append(this.searchInput); toolbar.append(search);
    this.container = document.createElement('div');
    this.container.className = 'data-table-container';
    this.originalParent.insertBefore(this.root, table);
    this.root.append(toolbar, this.container);
    this.container.append(table);
    this.body = table.tBodies[0] ?? table.createTBody();
    this.selectable = options.selectable ?? table.dataset.selectable === 'true';
    this.onSelectionChange = options.onSelectionChange;
    this.reorderable = options.reorderable ?? table.dataset.reorderable === 'true';
    this.onRowReorder = options.onRowReorder;
    this.columns = options.columns ?? [...table.tHead?.querySelectorAll('th') ?? []].map((header, index) => ({id: header.dataset.column ?? String(index), header: header.textContent ?? '', sortable: header.dataset.sortable !== 'false'} as VanillaDataTableColumn<T>));
    this.rows = options.rows ?? [...this.body.rows].map((row) => {
      const data = Object.fromEntries([...row.cells].map((cell, index) => [this.columns[index]?.id ?? String(index), cell.textContent ?? ''])) as T;
      this.authoredRows.set(data, row);
      this.authoredOrder.push(row);
      return data;
    });
    table.tHead?.addEventListener('click', this.onHeaderClick);
    table.tHead?.addEventListener('keydown', this.onHeaderKeyDown);
    if (this.selectable) table.tBodies[0]?.addEventListener('click', this.onRowClick);
    if (this.reorderable) this.enableReorder();
    this.searchInput.addEventListener('input', this.onSearchInput);
    [...table.tHead?.querySelectorAll<HTMLTableCellElement>('th[data-column]') ?? []].forEach((header) => {
      if (header.dataset.sortable !== 'false') {
        header.classList.add('data-table-th', 'data-table-th-sortable');
        header.tabIndex = header.tabIndex < 0 ? 0 : header.tabIndex;
      }
    });
    if (options.loading) this.setLoading(true, options.emptyMessage);
    else if (this.rows.length === 0) this.setEmpty(options.emptyMessage);
    else if (options.rows) this.render();
  }

  private readonly onHeaderClick = (event: Event): void => {
    const header = (event.target as Element).closest<HTMLTableCellElement>('th[data-column]');
    const id = header?.dataset.column;
    if (!id || header?.dataset.sortable === 'false') return;
    this.sortDirection = this.sortColumn === id && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = id;
    this.page = 1;
    this.render();
    this.table.dispatchEvent(new CustomEvent('lyco:datatable-sort', {bubbles: true, detail: {column: id, direction: this.sortDirection}}));
  };

  private readonly onHeaderKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const header = (event.target as Element).closest<HTMLTableCellElement>('th[data-column]');
    if (!header) return;
    event.preventDefault();
    header.click();
  };

  private readonly onRowClick = (event: Event): void => {
    const node = (event.target as Element).closest<HTMLTableRowElement>('tbody tr');
    if (!node) return;
    const row = [...this.authoredRows.entries()].find(([, candidate]) => candidate === node)?.[0] ?? this.renderedRows.get(node);
    if (!row) return;
    this.selected.has(row) ? this.selected.delete(row) : this.selected.add(row);
    node.setAttribute('aria-selected', String(this.selected.has(row)));
    const selectedRows = [...this.selected];
    this.onSelectionChange?.(selectedRows);
    this.table.dispatchEvent(new CustomEvent('lyco:datatable-selection-change', {bubbles: true, detail: {rows: selectedRows}}));
  };

  private enableReorder(): void {
    const nodes = this.authoredRows.size ? [...this.authoredRows.values()] : [...this.renderedRows.keys()];
    nodes.forEach((node) => {
      node.draggable = true;
      node.addEventListener('dragstart', this.onDragStart);
      node.addEventListener('dragover', this.onDragOver);
      node.addEventListener('drop', this.onDrop);
      node.tabIndex = 0;
      node.addEventListener('keydown', this.onRowKeyDown);
    });
  }

  private readonly onDragStart = (event: DragEvent): void => {
    this.draggedRow = (event.currentTarget as HTMLTableRowElement);
    event.dataTransfer?.setData('text/plain', 'lyco-row');
  };

  private readonly onDragOver = (event: DragEvent): void => event.preventDefault();

  private readonly onRowKeyDown = (event: KeyboardEvent): void => {
    if (!event.altKey || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) return;
    const source = event.currentTarget as HTMLTableRowElement;
    const ordered = [...this.body.rows].filter((row) => !row.hidden);
    const sourcePosition = ordered.indexOf(source);
    if (event.key === 'ArrowDown') {
      const destination = ordered[sourcePosition + 1];
      if (!destination) return;
      event.preventDefault();
      const sourceModel = [...this.authoredRows.entries()].find(([, node]) => node === source)?.[0] ?? this.renderedRows.get(source);
      const sourceIndex = sourceModel ? this.rows.indexOf(sourceModel) : sourcePosition;
      const destinationModel = [...this.authoredRows.entries()].find(([, node]) => node === destination)?.[0] ?? this.renderedRows.get(destination);
      const destinationIndex = destinationModel ? this.rows.indexOf(destinationModel) : sourcePosition + 1;
      destination.after(source);
      const [row] = this.rows.splice(sourceIndex, 1);
      if (row) this.rows.splice(destinationIndex, 0, row);
      this.onRowReorder?.(sourceIndex, destinationIndex);
      this.table.dispatchEvent(new CustomEvent('lyco:datatable-row-reorder', {bubbles: true, detail: {sourceIndex, destinationIndex}}));
      source.focus();
      return;
    }
    const destination = ordered[sourcePosition - 1];
    if (!destination) return;
    event.preventDefault();
    this.draggedRow = source;
    this.onDrop({preventDefault: () => undefined, currentTarget: destination} as unknown as DragEvent);
    source.focus();
  };

  private readonly onDrop = (event: DragEvent): void => {
    event.preventDefault();
    const destination = event.currentTarget as HTMLTableRowElement;
    const source = this.draggedRow;
    if (!source || source === destination) return;
    const ordered = [...this.body.rows];
    const sourceModel = [...this.authoredRows.entries()].find(([, node]) => node === source)?.[0] ?? this.renderedRows.get(source);
    const destinationModel = [...this.authoredRows.entries()].find(([, node]) => node === destination)?.[0] ?? this.renderedRows.get(destination);
    const sourceIndex = sourceModel ? this.rows.indexOf(sourceModel) : ordered.indexOf(source);
    const destinationIndex = destinationModel ? this.rows.indexOf(destinationModel) : ordered.indexOf(destination);
    destination.before(source);
    const [row] = this.rows.splice(sourceIndex, 1);
    const insertionIndex = sourceIndex < destinationIndex ? destinationIndex - 1 : destinationIndex;
    if (row) this.rows.splice(insertionIndex, 0, row);
    this.onRowReorder?.(sourceIndex, destinationIndex);
    this.table.dispatchEvent(new CustomEvent('lyco:datatable-row-reorder', {bubbles: true, detail: {sourceIndex, destinationIndex}}));
  };

  setSearch(query: string): void {
    this.table.dataset.search = query;
    this.page = 1;
    this.render();
  }

  setPage(page: number): void {
    this.page = page;
    this.render();
  }

  setLoading(loading: boolean, message = 'Loading'): void {
    if (loading) {
      this.body.replaceChildren(this.statusRow(message, 'status'));
      this.table.setAttribute('aria-busy', 'true');
    } else {
      this.table.removeAttribute('aria-busy');
      this.render();
    }
  }

  private setEmpty(message = 'No results'): void {
    this.body.replaceChildren(this.statusRow(message, 'status'));
  }

  private statusRow(message: string, role: string): HTMLTableRowElement {
    const row = document.createElement('tr');
    row.dataset.lycoDatatableStatus = 'true';
    const cell = document.createElement('td');
    cell.colSpan = Math.max(1, this.columns.length);
    cell.setAttribute('role', role);
    cell.textContent = message;
    row.append(cell);
    return row;
  }

  private render(): void {
    const modelColumns: DataTableModelColumn<T>[] = this.columns.map(({id, sortable, searchable}) => ({id, sortable, searchable}));
    const result = deriveRows(this.rows, modelColumns, {query: this.table.dataset.search, sortColumn: this.sortColumn, sortDirection: this.sortDirection, page: this.page, pageSize: Number(this.table.dataset.pageSize) || this.rows.length});
    this.page = result.page;
    if (this.authoredRows.size) {
      const visible = new Set(result.rows);
      this.rows.forEach((row) => {
        const node = this.authoredRows.get(row);
        if (node) node.hidden = !visible.has(row);
      });
      result.rows.forEach((row) => {
        const node = this.authoredRows.get(row);
        if (node) this.body.append(node);
      });
    } else {
      renderDataTableRows(this.body, result.rows, this.columns);
      this.renderedRows.clear();
      [...this.body.rows].forEach((node, index) => {
        const row = result.rows[index];
        if (!row) return;
        this.renderedRows.set(node, row);
        node.setAttribute('aria-selected', String(this.selected.has(row)));
      });
      if (this.reorderable) this.enableReorder();
    }
    this.table.dispatchEvent(new CustomEvent('lyco:datatable-update', {bubbles: true, detail: result}));
  }

  destroy(): void {
    this.table.tHead?.removeEventListener('click', this.onHeaderClick);
    this.table.tHead?.removeEventListener('keydown', this.onHeaderKeyDown);
    this.searchInput.removeEventListener('input', this.onSearchInput);
    if (this.selectable) this.table.tBodies[0]?.removeEventListener('click', this.onRowClick);
    this.authoredRows.forEach((node) => {
      node.removeEventListener('dragstart', this.onDragStart);
      node.removeEventListener('dragover', this.onDragOver);
      node.removeEventListener('drop', this.onDrop);
      node.removeEventListener('keydown', this.onRowKeyDown);
    });
    this.renderedRows.forEach((_, node) => {
      node.removeEventListener('dragstart', this.onDragStart);
      node.removeEventListener('dragover', this.onDragOver);
      node.removeEventListener('drop', this.onDrop);
      node.removeEventListener('keydown', this.onRowKeyDown);
    });
    if (this.authoredOrder.length) {
      this.body.querySelectorAll('tr[data-lyco-datatable-status]').forEach((node) => node.remove());
      this.authoredOrder.forEach((node) => {
        node.hidden = false;
        node.removeAttribute('aria-selected');
        node.draggable = false;
        this.body.append(node);
      });
    }
    if (this.originalNextSibling) this.originalParent.insertBefore(this.table, this.originalNextSibling); else this.originalParent.append(this.table);
    this.root.remove();
  }
}

export function initLycoDataTables(root: ParentNode = document): void {
  root.querySelectorAll<HTMLTableElement>('table[data-lyco-datatable]').forEach((table) => {
    if (!controllerRegistry.get(table, 'datatable')) controllerRegistry.register(table, 'datatable', new LycoDataTableController(table));
  });
}
