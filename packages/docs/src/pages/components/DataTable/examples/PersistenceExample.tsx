import { useState, useCallback } from 'react';
import { DataTable, type DataTableColumn, type SortDirection } from 'lyco-ui';

interface Task {
    id: number;
    title: string;
    priority: string;
    assignee: string;
}

const tasks: Task[] = [
    { id: 1, title: 'Fix login bug', priority: 'High', assignee: 'Alice' },
    { id: 2, title: 'Update documentation', priority: 'Low', assignee: 'Bob' },
    { id: 3, title: 'Add dark mode', priority: 'Medium', assignee: 'Carol' },
    { id: 4, title: 'Optimize queries', priority: 'High', assignee: 'David' },
    { id: 5, title: 'Write unit tests', priority: 'Medium', assignee: 'Eva' },
    { id: 6, title: 'Deploy to staging', priority: 'High', assignee: 'Frank' },
    { id: 7, title: 'Review PR #42', priority: 'Low', assignee: 'Grace' },
    { id: 8, title: 'Set up CI/CD', priority: 'Medium', assignee: 'Hank' },
    { id: 9, title: 'Migrate database', priority: 'High', assignee: 'Iris' },
    { id: 10, title: 'Create API docs', priority: 'Low', assignee: 'Jack' },
    { id: 11, title: 'Refactor auth module', priority: 'Medium', assignee: 'Kate' },
    { id: 12, title: 'Performance audit', priority: 'High', assignee: 'Liam' },
];

const columns: DataTableColumn<Task>[] = [
    { id: 'id', header: '#', minWidth: '3rem' },
    { id: 'title', header: 'Title', minWidth: '10rem' },
    { id: 'priority', header: 'Priority' },
    { id: 'assignee', header: 'Assignee' },
];

export const title = 'State Persistence';
export const description = (
    <p>
        Use the <code>onSearchChange</code>, <code>onSortChange</code>, <code>onPageSizeChange</code>,
        and <code>onPageChange</code> callbacks to persist table state externally. This example logs
        every state change to the panel below, but in a real app you would save them
        to <code>localStorage</code>, URL parameters, or your state management library.
    </p>
);
export const order = 4;

export default function PersistenceExample() {
    const [log, setLog] = useState<string[]>([]);

    const addLog = useCallback((entry: string) => {
        setLog(prev => [`[${new Date().toLocaleTimeString()}] ${entry}`, ...prev.slice(0, 9)]);
    }, []);

    const handleSearchChange = useCallback((query: string) => {
        addLog(`Search → "${query}"`);
        // Example: localStorage.setItem('myTable_search', query);
    }, [addLog]);

    const handleSortChange = useCallback((columnId: string, direction: SortDirection) => {
        addLog(`Sort → ${columnId} ${direction}`);
        // Example: localStorage.setItem('myTable_sortBy', columnId);
        // Example: localStorage.setItem('myTable_sortDir', direction);
    }, [addLog]);

    const handlePageSizeChange = useCallback((pageSize: number) => {
        addLog(`Page size → ${pageSize}`);
        // Example: localStorage.setItem('myTable_pageSize', String(pageSize));
    }, [addLog]);

    const handlePageChange = useCallback((page: number, pageSize: number) => {
        addLog(`Page → ${page} (size: ${pageSize})`);
    }, [addLog]);

    return (
        <div>
            <DataTable<Task>
                columns={columns}
                data={tasks}
                defaultPageSize={10}
                bordered
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
                onPageSizeChange={handlePageSizeChange}
                onPageChange={handlePageChange}
            />
            <div style={{
                marginTop: 'var(--spacing-4)',
                padding: 'var(--spacing-4)',
                background: 'var(--color-bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-base)',
                fontFamily: 'monospace',
                fontSize: 'var(--font-size-xs)',
                maxHeight: '12rem',
                overflowY: 'auto',
            }}>
                <strong style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: 'var(--spacing-2)' }}>
                    Event Log:
                </strong>
                {log.length === 0 ? (
                    <span style={{ color: 'var(--color-text-muted)' }}>Interact with the table to see events...</span>
                ) : (
                    log.map((entry, i) => (
                        <div key={i} style={{ color: 'var(--color-text-primary)', padding: '2px 0' }}>
                            {entry}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
