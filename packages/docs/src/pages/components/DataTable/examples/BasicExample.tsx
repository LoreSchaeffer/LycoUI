import {DataTable, type DataTableColumn} from '@loreschaeffer/lyco-ui';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    joined: string;
}

const sampleData: User[] = [
    {id: 1, name: 'Alice Johnson', email: 'alice.j@acmecorp.com', role: 'Admin', status: 'Active', joined: '2023-11-04'},
    {id: 2, name: 'Bob Smith', email: 'bsmith@globex.io', role: 'Editor', status: 'Active', joined: '2024-02-20'},
    {id: 3, name: 'Carol Williams', email: 'cwilliams@stark-ind.com', role: 'Viewer', status: 'Inactive', joined: '2023-08-12'},
    {id: 4, name: 'David Brown', email: 'david.brown@wayneent.com', role: 'Editor', status: 'Active', joined: '2024-03-22'},
    {id: 5, name: 'Eva Martinez', email: 'emartinez@oscorp.net', role: 'Admin', status: 'Active', joined: '2022-05-18'},
    {id: 6, name: 'Frank Lee', email: 'flee@dailybugle.com', role: 'Viewer', status: 'Active', joined: '2024-04-18'},
    {id: 7, name: 'Grace Kim', email: 'grace.k@umbrellacorp.co', role: 'Editor', status: 'Inactive', joined: '2023-10-01'},
    {id: 8, name: 'Hank Davis', email: 'hdavis@massive-dynamic.com', role: 'Viewer', status: 'Active', joined: '2024-05-14'},
    {id: 9, name: 'Iris Chen', email: 'iris.c@cyberdyne.sys', role: 'Admin', status: 'Active', joined: '2021-12-02'},
    {id: 10, name: 'Jack Wilson', email: 'jwilson@initech.com', role: 'Editor', status: 'Active', joined: '2024-06-20'},
    {id: 11, name: 'Kate Taylor', email: 'ktaylor@hooli.com', role: 'Viewer', status: 'Inactive', joined: '2023-07-08'},
    {id: 12, name: 'Liam Anderson', email: 'landerson@piedpiper.com', role: 'Admin', status: 'Active', joined: '2022-09-25'},
    {id: 13, name: 'Mia Thomas', email: 'mia.t@veidt-ent.com', role: 'Editor', status: 'Active', joined: '2024-01-10'},
    {id: 14, name: 'Noah Garcia', email: 'ngarcia@lexcorp.com', role: 'Viewer', status: 'Active', joined: '2024-02-28'},
    {id: 15, name: 'Olivia Harris', email: 'oharris@virtucon.net', role: 'Admin', status: 'Inactive', joined: '2022-11-15'},
];

const columns: DataTableColumn<User>[] = [
    {id: 'id', header: '#', minWidth: '3rem'},
    {id: 'name', header: 'Name', minWidth: '10rem'},
    {id: 'email', header: 'Email', minWidth: '12rem'},
    {id: 'role', header: 'Role'},
    {id: 'status', header: 'Status'},
    {id: 'joined', header: 'Joined'},
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
