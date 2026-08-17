import { DataTable, type DataTableColumn } from '@loreschaeffer/lyco-ui';

interface Item {
    id: number;
    name: string;
    value: string;
}

const columns: DataTableColumn<Item>[] = [
    { id: 'id', header: '#' },
    { id: 'name', header: 'Name' },
    { id: 'value', header: 'Value' },
];

export const title = 'Loading State';
export const description = (
    <p>
        Set <code>loading=true</code> to display a centered <code>Spinner</code> instead
        of table rows. This is useful when fetching data asynchronously.
    </p>
);
export const order = 3;

export default function LoadingExample() {
    return (
        <DataTable<Item>
            columns={columns}
            data={[]}
            loading
            bordered
        />
    );
}
