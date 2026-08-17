import { useState, useCallback } from 'react';
import { DataTable, type DataTableColumn } from '@loreschaeffer/lyco-ui';

interface Step {
    id: number;
    step: string;
    description: string;
}

const initialSteps: Step[] = [
    { id: 1, step: 'Gather requirements', description: 'Collect specs from stakeholders' },
    { id: 2, step: 'Design mockups', description: 'Create wireframes and visual designs' },
    { id: 3, step: 'Set up project', description: 'Initialize repository and tooling' },
    { id: 4, step: 'Implement core', description: 'Build the main functionality' },
    { id: 5, step: 'Write tests', description: 'Add unit and integration tests' },
    { id: 6, step: 'Deploy to staging', description: 'Push to staging environment' },
    { id: 7, step: 'QA review', description: 'Quality assurance testing' },
    { id: 8, step: 'Deploy to production', description: 'Release to end users' },
];

const columns: DataTableColumn<Step>[] = [
    { id: 'id', header: '#', minWidth: '3rem' },
    { id: 'step', header: 'Step', minWidth: '10rem' },
    { id: 'description', header: 'Description', minWidth: '14rem' },
];

export const title = 'Drag & Drop Reorder';
export const description = (
    <p>
        Pass the <code>onRowReorder</code> callback to enable native drag-and-drop row reordering.
        When enabled, pagination and sorting are automatically disabled since reordering
        operates on the original data array.
        Grab a row by the drag handle on the left and drop it to a new position.
    </p>
);
export const order = 5;

export default function DragDropExample() {
    const [steps, setSteps] = useState(initialSteps);

    const handleReorder = useCallback((sourceIndex: number, destIndex: number) => {
        setSteps(prev => {
            const next = [...prev];
            const [moved] = next.splice(sourceIndex, 1);
            next.splice(destIndex, 0, moved);
            // Renumber steps
            return next.map((item, i) => ({ ...item, id: i + 1 }));
        });
    }, []);

    return (
        <DataTable<Step>
            columns={columns}
            data={steps}
            onRowReorder={handleReorder}
            bordered
        />
    );
}
