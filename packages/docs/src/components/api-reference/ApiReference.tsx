import './ApiReference.scss';
import React, {type ReactNode} from 'react';

export interface PropDefinition {
    name: string;
    type: string;
    typeLink?: string;
    defaultValue?: string;
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
            <div className="table-wrapper">
                <table className="table">
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
                            <td className="td-prop">
                                <code>{row.name}</code>
                            </td>
                            <td className="td-type">
                                {row.typeLink ? (
                                    <a href={row.typeLink} className="type-link"><code>{row.type}</code></a>
                                ) : (
                                    <code>{row.type}</code>
                                )}
                            </td>
                            <td className="td-default">
                                {row.defaultValue ? (
                                    <code>{row.defaultValue}</code>
                                ) : (
                                    <span className="text-muted">-</span>
                                )}
                            </td>
                            <td className="td-description">{row.description}</td>
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
        <div className="mb-8">
            <h3 className="mb-4">{title}</h3>
            <div className="table-wrapper">
                <table className="table">
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
                            <td className="td-prop">
                                <code>{row.name}</code>
                            </td>
                            <td className="td-default">
                                <code>{row.defaultValue}</code>
                            </td>
                            <td className="td-description">{row.description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};