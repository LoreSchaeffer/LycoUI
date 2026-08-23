import React, { useState } from 'react';
import { DataTable, Badge } from '@loreschaeffer/lyco-ui';
import type { DataTableColumn } from '@loreschaeffer/lyco-ui';

export const title = 'Kitchen Sink';
export const description = <p>A comprehensive example demonstrating sorting, pagination, search filtering, and row selection all working together seamlessly.</p>;
export const order = 1;

export const vanillaHtml = `
<!-- Not available for this complex React component demonstration -->
`;

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
}

const mockData: Transaction[] = [
    { id: 'TRX-001', date: '2026-08-23', description: 'Cloud Hosting Subscription', amount: 49.99, status: 'completed' },
    { id: 'TRX-002', date: '2026-08-22', description: 'Software License', amount: 199.00, status: 'completed' },
    { id: 'TRX-003', date: '2026-08-21', description: 'Consulting Services', amount: 1500.00, status: 'pending' },
    { id: 'TRX-004', date: '2026-08-20', description: 'Workspace Equipment', amount: 849.50, status: 'completed' },
    { id: 'TRX-005', date: '2026-08-19', description: 'Advertising Campaign', amount: 350.00, status: 'failed' },
    { id: 'TRX-006', date: '2026-08-18', description: 'Server Maintenance', amount: 120.00, status: 'completed' },
    { id: 'TRX-007', date: '2026-08-17', description: 'UI/UX Design Assets', amount: 45.00, status: 'completed' },
    { id: 'TRX-008', date: '2026-08-16', description: 'SaaS Annual Renewal', amount: 890.00, status: 'pending' },
    { id: 'TRX-009', date: '2026-08-15', description: 'Coffee Machine Repair', amount: 85.00, status: 'completed' },
    { id: 'TRX-010', date: '2026-08-14', description: 'Domain Registration', amount: 15.00, status: 'completed' },
    { id: 'TRX-011', date: '2026-08-13', description: 'Freelance Copywriting', amount: 250.00, status: 'completed' },
    { id: 'TRX-012', date: '2026-08-12', description: 'Legal Consultation', amount: 600.00, status: 'failed' },
];

const columns: DataTableColumn<Transaction>[] = [
    {
        id: 'id',
        header: 'Transaction ID',
        render: (row) => <strong>{row.id}</strong>,
    },
    {
        id: 'date',
        header: 'Date',
    },
    {
        id: 'description',
        header: 'Description',
    },
    {
        id: 'amount',
        header: 'Amount',
        render: (row) => `$${row.amount.toFixed(2)}`,
        compare: (a, b) => a.amount - b.amount,
    },
    {
        id: 'status',
        header: 'Status',
        render: (row) => {
            const variants = {
                completed: 'success',
                pending: 'warning',
                failed: 'danger',
            } as const;
            return <Badge variant={variants[row.status]}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</Badge>;
        }
    }
];

export default function KitchenSinkExample() {
    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-md)' }}>
                Selected Rows: <strong>{selectedKeys.length}</strong>
            </div>
            <DataTable
                columns={columns}
                data={mockData}
                selectable
                selectedRowKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                pageSizeOptions={[5, 10, 20]}
                defaultPageSize={5}
                searchPlaceholder="Search transactions..."
            />
        </div>
    );
}
