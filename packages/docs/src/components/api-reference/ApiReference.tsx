import './ApiReference.scss';
import React, {type ReactNode} from 'react';

export interface PropDefinition {
    name: string;
    type: string;
    defaultValue?: string;
    description: ReactNode;
}

export interface PropsTableProps {
    title: string;
    data: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({title, data}) => {
    return (
        <div className="lyco-mb-8">
            <h3 className="lyco-mb-4">{title}</h3>
            <div className="lyco-table-wrapper">
                <table className="lyco-table">
                    <thead>
                    <tr>
                        <th>Prop</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr key={row.name}>
                            <td className="lyco-td-prop">
                                <code>{row.name}</code>
                            </td>
                            <td className="lyco-td-type">
                                <code>{row.type}</code>
                            </td>
                            <td className="lyco-td-default">
                                {row.defaultValue ? (
                                    <code>{row.defaultValue}</code>
                                ) : (
                                    <span className="lyco-text-muted">-</span>
                                )}
                            </td>
                            <td className="lyco-td-description">{row.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
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
        <div className="lyco-mb-8">
            <h3 className="lyco-mb-4">{title}</h3>
            <div className="lyco-table-wrapper">
                <table className="lyco-table">
                    <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Default Value</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr key={row.name}>
                            <td className="lyco-td-prop">
                                <code>{row.name}</code>
                            </td>
                            <td className="lyco-td-default">
                                <code>{row.defaultValue}</code>
                            </td>
                            <td className="lyco-td-description">{row.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};