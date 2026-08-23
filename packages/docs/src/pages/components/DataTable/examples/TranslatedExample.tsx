import React from 'react';
import { DataTable } from '@loreschaeffer/lyco-ui';
import type { DataTableColumn } from '@loreschaeffer/lyco-ui';

export const title = 'Translated & Compact';
export const description = <p>Demonstrates full Italian translation using the <code>localization</code> prop, compact pagination info, and footer pagination positioning.</p>;
export const order = 2;

export const vanillaHtml = `
<!-- Not available for this complex React component demonstration -->
`;

interface User {
    id: number;
    name: string;
    role: string;
}

const mockUsers: User[] = [
    { id: 1, name: 'Lorenzo Schaeffer', role: 'Admin' },
    { id: 2, name: 'Mario Rossi', role: 'Editor' },
    { id: 3, name: 'Giulia Bianchi', role: 'Viewer' },
    { id: 4, name: 'Luca Verdi', role: 'Editor' },
    { id: 5, name: 'Anna Neri', role: 'Viewer' },
    { id: 6, name: 'Marco Gialli', role: 'Viewer' },
    { id: 7, name: 'Sofia Viola', role: 'Admin' },
];

const columns: DataTableColumn<User>[] = [
    { id: 'id', header: 'ID', minWidth: '80px' },
    { id: 'name', header: 'Nome' },
    { id: 'role', header: 'Ruolo' },
];

export default function TranslatedExample() {
    return (
        <DataTable
            columns={columns}
            data={mockUsers}
            searchPlaceholder="Cerca utenti..."
            paginationPosition="bottom"
            paginationInfo="compact"
            pageSizeOptions={[3, 5, 10]}
            defaultPageSize={3}
            striped
            localization={{
                rowsPerPage: 'Righe per pagina:',
                showingResults: (from, to, total) => `Mostrando ${from}-${to} di ${total}`
            }}
        />
    );
}
