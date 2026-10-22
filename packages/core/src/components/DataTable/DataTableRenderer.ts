export interface VanillaDataTableColumn<T extends Record<string, unknown>> {
  id: keyof T & string;
  header?: string;
  sortable?: boolean;
  searchable?: boolean;
  render?: (row: T, rowIndex: number) => Node | string;
}

export function renderDataTableRows<T extends Record<string, unknown>>(body: HTMLTableSectionElement, rows: readonly T[], columns: readonly VanillaDataTableColumn<T>[]): void {
  body.replaceChildren(...rows.map((row, rowIndex) => {
    const tr = document.createElement('tr');
    columns.forEach((column) => {
      const td = document.createElement('td');
      const content = column.render?.(row, rowIndex) ?? String(row[column.id] ?? '');
      if (content instanceof Node) td.append(content); else td.textContent = content;
      tr.append(td);
    });
    return tr;
  }));
}
