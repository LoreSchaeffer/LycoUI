import { DataTable, type DataTableColumn } from '@loreschaeffer/lyco-ui';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    joined: string;
}

const sampleData: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-10' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active', joined: '2024-03-22' },
    { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Admin', status: 'Active', joined: '2024-04-05' },
    { id: 6, name: 'Frank Lee', email: 'frank@example.com', role: 'Viewer', status: 'Active', joined: '2024-04-18' },
    { id: 7, name: 'Grace Kim', email: 'grace@example.com', role: 'Editor', status: 'Inactive', joined: '2024-05-01' },
    { id: 8, name: 'Hank Davis', email: 'hank@example.com', role: 'Viewer', status: 'Active', joined: '2024-05-14' },
    { id: 9, name: 'Iris Chen', email: 'iris@example.com', role: 'Admin', status: 'Active', joined: '2024-06-02' },
    { id: 10, name: 'Jack Wilson', email: 'jack@example.com', role: 'Editor', status: 'Active', joined: '2024-06-20' },
    { id: 11, name: 'Kate Taylor', email: 'kate@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-07-08' },
    { id: 12, name: 'Liam Anderson', email: 'liam@example.com', role: 'Admin', status: 'Active', joined: '2024-07-25' },
    { id: 13, name: 'Mia Thomas', email: 'mia@example.com', role: 'Editor', status: 'Active', joined: '2024-08-10' },
    { id: 14, name: 'Noah Garcia', email: 'noah@example.com', role: 'Viewer', status: 'Active', joined: '2024-08-28' },
    { id: 15, name: 'Olivia Harris', email: 'olivia@example.com', role: 'Admin', status: 'Inactive', joined: '2024-09-15' },
];

const columns: DataTableColumn<User>[] = [
    { id: 'id', header: '#', minWidth: '3rem' },
    { id: 'name', header: 'Name', minWidth: '10rem' },
    { id: 'email', header: 'Email', minWidth: '12rem' },
    { id: 'role', header: 'Role' },
    { id: 'status', header: 'Status' },
    { id: 'joined', header: 'Joined' },
];

export const title = 'Basic DataTable';
export const description = (
    <p>
        A fully-featured DataTable with search, sorting, and pagination.
        Click column headers to sort, type in the search bar to filter,
        and use the controls to navigate pages.
    </p>
);
export const order = 1;

export default function BasicExample() {
    return (
        <DataTable<User>
            columns={columns}
            data={sampleData}
            defaultPageSize={10}
            bordered
        />
    );
}
