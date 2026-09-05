import React, {type ReactNode} from 'react';
import {Badge, Table, TableBody, TableCell, TableHead, TableRow} from '@loreschaeffer/lyco-ui';

export interface PropDefinition {
    name: string;
    type: string;
    typeLink?: string;
    defaultValue?: string;
    required?: boolean;
    description: ReactNode;
}

export interface PropsTableProps {
    title: string;
    data: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({title, data}) => {
    return (
        <div className="mb-8">
            <h3 className="mb-4">{title}</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell isHeader>Prop</TableCell>
                        <TableCell isHeader>Type</TableCell>
                        <TableCell isHeader>Default</TableCell>
                        <TableCell isHeader>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell className="td-prop">
                                <code>{row.name}</code>
                            </TableCell>
                            <TableCell className="td-type">
                                {row.typeLink ? (
                                    <a href={row.typeLink} className="type-link"><Badge variant="secondary">{row.type}</Badge></a>
                                ) : (
                                    <Badge variant="secondary">{row.type}</Badge>
                                )}
                            </TableCell>
                            <TableCell className="td-default">
                                {row.defaultValue ? (
                                    <code>{row.defaultValue}</code>
                                ) : (
                                    <span className="text-muted">-</span>
                                )}
                            </TableCell>
                            <TableCell className="td-description">{row.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export interface CssVarDefinition {
    name: string;
    defaultValue: string;
    description: ReactNode;
}

export interface CssVarsTableProps {
    title: string;
    data: CssVarDefinition[];
}

export const CssVarsTable: React.FC<CssVarsTableProps> = ({title, data}) => {
    return (
        <div className="mb-8">
            <h3 className="mb-4">{title}</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell isHeader>Variable</TableCell>
                        <TableCell isHeader>Default Value</TableCell>
                        <TableCell isHeader>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell className="td-prop">
                                <code>{row.name}</code>
                            </TableCell>
                            <TableCell className="td-default">
                                <code>{row.defaultValue}</code>
                            </TableCell>
                            <TableCell className="td-description">{row.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
