import React, {useMemo} from 'react';
import {type CssVarDefinition, CssVarsTable, type PropDefinition, PropsTable} from "./api-reference/ApiReference.tsx";
import {CodeExample} from "./CodeExample.tsx";
import {Alert} from '@loreschaeffer/lyco-ui';

export interface ExampleModule {
    title: string;
    description?: React.ReactNode;
    order?: number;
    vanillaHtml?: string;
    default: React.ComponentType;
}

export interface ExtraSection {
    title: string;
    description: React.ReactNode;
    order: number;
}

export interface ApiSectionConfig {
    name: string;
    data: PropDefinition[] | CssVarDefinition[];
}

export interface DocTemplateProps {
    title: string;
    description: React.ReactNode;
    /** @deprecated The global import block has been removed. Imports are now documented contextually inside individual CodeExamples. */
    importCode?: string;
    a11yNotes?: React.ReactNode;
    exampleModules: Record<string, unknown>;
    rawSources: Record<string, string>;
    apiConfig?: ApiSectionConfig[];
    extraSections?: ExtraSection[];
}

type ContentBlock =
    | { type: 'example'; id: string; title: string; description?: React.ReactNode; order: number; Component: React.ComponentType; source: string; vanillaHtml?: string }
    | { type: 'extra'; id: string; title: string; description: React.ReactNode; order: number };

const formatApiTitle = (exportName: string): string => {
    return exportName
        .replace(/Data$/, '')
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
};

export const DocTemplate: React.FC<DocTemplateProps> = ({
                                                            title,
                                                            description,
                                                            a11yNotes,
                                                            exampleModules,
                                                            rawSources,
                                                            apiConfig,
                                                            extraSections = []
                                                        }) => {
    const contentBlocks = useMemo(() => {
        const blocks: ContentBlock[] = [];

        Object.keys(exampleModules).forEach((path) => {
            const mod = exampleModules[path] as ExampleModule;
            blocks.push({
                type: 'example',
                id: path,
                title: mod.title || 'Example',
                description: mod.description,
                order: mod.order ?? 99,
                Component: mod.default,
                source: rawSources[path] || '',
                vanillaHtml: mod.vanillaHtml,
            });
        });

        extraSections.forEach((section, index) => {
            blocks.push({
                type: 'extra',
                id: `extra-section-${index}`,
                title: section.title,
                description: section.description,
                order: section.order,
            });
        });

        return blocks.sort((a, b) => a.order - b.order);
    }, [exampleModules, rawSources, extraSections]);

    const apiSections = useMemo(() => {
        if (!apiConfig) return [];

        return apiConfig.map((section) => ({
            id: section.name,
            title: formatApiTitle(section.name),
            data: section.data
        }));
    }, [apiConfig]);

    return (
        <article>
            <h1>{title}</h1>
            <div className="text-lead mb-8">
                {description}
            </div>

            <section className="mb-10">
                <h2 className="mb-4">Examples</h2>
                {contentBlocks.map((block) => {
                    if (block.type === 'example') {
                        return (
                            <div key={block.id} className="mb-10">
                                <CodeExample
                                    title={block.title}
                                    description={block.description}
                                    reactCode={block.source}
                                    vanillaHtml={block.vanillaHtml}
                                >
                                    <block.Component/>
                                </CodeExample>
                            </div>
                        );
                    }

                    return (
                        <div key={block.id} className="mb-10">
                            <h3 className="mb-4">{block.title}</h3>
                            <div className="text-secondary mb-6">
                                {block.description}
                            </div>
                        </div>
                    );
                })}
            </section>

            {apiSections.length > 0 && (
                <section className="mt-10 mb-10">
                    <h2 className="mb-4">API Reference</h2>
                    <p className="text-secondary mb-6">
                        Comprehensive list of props and variables for {title} components.
                    </p>

                    {apiSections.map(({id, title: tableTitle, data}) => {
                        if (data.length === 0) return null;

                        const isPropDef = 'type' in data[0];

                        return isPropDef ? (
                            <PropsTable
                                key={id}
                                title={tableTitle}
                                data={data as PropDefinition[]}
                            />
                        ) : (
                            <CssVarsTable
                                key={id}
                                title={tableTitle}
                                data={data as CssVarDefinition[]}
                            />
                        );
                    })}
                </section>
            )}

            <section className="mt-10 mb-10">
                <h2 className="mb-4">Accessibility</h2>
                <Alert variant="info">
                    {a11yNotes || `Standard keyboard navigation and ARIA roles apply to the ${title} component.`}
                </Alert>
            </section>
        </article>
    );
};
