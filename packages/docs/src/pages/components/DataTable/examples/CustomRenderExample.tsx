import {Badge, DataTable, type DataTableColumn} from '@loreschaeffer/lyco-ui';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const products: Product[] = [
    {id: 1, name: 'Wireless Headphones', category: 'Audio', price: 79.99, stock: 142, status: 'in-stock'},
    {id: 2, name: 'Mechanical Keyboard', category: 'Peripherals', price: 149.99, stock: 8, status: 'low-stock'},
    {id: 3, name: 'USB-C Hub', category: 'Accessories', price: 39.99, stock: 0, status: 'out-of-stock'},
    {id: 4, name: '4K Monitor', category: 'Displays', price: 499.99, stock: 23, status: 'in-stock'},
    {id: 5, name: 'Webcam HD', category: 'Peripherals', price: 69.99, stock: 5, status: 'low-stock'},
    {id: 6, name: 'Desk Lamp', category: 'Accessories', price: 34.99, stock: 67, status: 'in-stock'},
    {id: 7, name: 'Noise Cancelling Earbuds', category: 'Audio', price: 129.99, stock: 0, status: 'out-of-stock'},
    {id: 8, name: 'Ergonomic Mouse', category: 'Peripherals', price: 59.99, stock: 31, status: 'in-stock'},
    {id: 9, name: 'Portable SSD 1TB', category: 'Storage', price: 89.99, stock: 3, status: 'low-stock'},
    {id: 10, name: 'Laptop Stand', category: 'Accessories', price: 44.99, stock: 55, status: 'in-stock'},
    {id: 11, name: 'Studio Microphone', category: 'Audio', price: 199.99, stock: 12, status: 'in-stock'},
    {id: 12, name: 'Thunderbolt Cable', category: 'Accessories', price: 29.99, stock: 0, status: 'out-of-stock'},
];

const statusConfig = {
    'in-stock': {label: 'In Stock', variant: 'success' as const},
    'low-stock': {label: 'Low Stock', variant: 'warning' as const},
    'out-of-stock': {label: 'Out of Stock', variant: 'danger' as const},
};

const columns: DataTableColumn<Product>[] = [
    {id: 'id', header: '#', minWidth: '3rem', sortable: false},
    {id: 'name', header: 'Product', minWidth: '12rem'},
    {id: 'category', header: 'Category'},
    {
        id: 'price',
        header: 'Price',
        render: (row) => (
            <span style={{fontWeight: 'var(--font-weight-medium)'}}>
                ${row.price.toFixed(2)}
            </span>
        ),
        compare: (a, b) => a.price - b.price,
    },
    {
        id: 'stock',
        header: 'Stock',
        compare: (a, b) => a.stock - b.stock,
    },
    {
        id: 'status',
        header: 'Status',
        render: (row) => {
            const config = statusConfig[row.status];
            return <Badge variant={config.variant}>{config.label}</Badge>;
        },
        searchValue: (row) => statusConfig[row.status].label,
    },
];

export const title = 'Custom Cell Rendering';
export const description = (
    <p>
        Use the <code>render</code> property on column definitions to customize how cells are displayed.
        This example shows formatted prices and <code>Badge</code> components for status.
        The <code>compare</code> and <code>searchValue</code> properties ensure sorting and
        searching still work correctly with custom renderers.
    </p>
);
export const order = 2;

export default function CustomRenderExample() {
    return (
        <DataTable<Product>
            columns={columns}
            data={products}
            defaultPageSize={10}
            bordered
        />
    );
}
