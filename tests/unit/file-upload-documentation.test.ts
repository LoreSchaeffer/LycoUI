import {readdir, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';

const inputExamplesDirectory = resolve(process.cwd(), 'packages/docs/src/pages/components/Input/examples');
const fileUploadExamplesDirectory = resolve(process.cwd(), 'packages/docs/src/pages/components/FileUpload/examples');

describe('FileUpload documentation', () => {
    it('keeps FileUpload examples out of the Input page', async () => {
        const exampleNames = (await readdir(inputExamplesDirectory)).filter((name) => name.endsWith('.tsx'));
        const sources = await Promise.all(exampleNames.map((name) => readFile(resolve(inputExamplesDirectory, name), 'utf8')));

        expect(exampleNames.filter((name) => name.startsWith('FileUpload'))).toEqual([]);
        for (const source of sources) {
            expect(source).not.toContain('FileUpload');
            expect(source).not.toContain('dropzone');
        }
    });

    it('uses explicitly sized icons in every dedicated FileUpload example', async () => {
        const exampleNames = (await readdir(fileUploadExamplesDirectory)).filter((name) => name.endsWith('.tsx'));
        const sources = await Promise.all(exampleNames.map(async (name) => ({
            name,
            source: await readFile(resolve(fileUploadExamplesDirectory, name), 'utf8')
        })));

        expect(sources).toHaveLength(3);
        for (const {name, source} of sources) {
            expect(source).toContain('width="48"');
            expect(source).toContain('height="48"');
            expect(source).toContain('fill="currentColor"');
            expect(source).toContain("marginBottom: '1rem'");
            const tabIndex = name === 'DisabledExample.tsx' ? '-1' : '0';
            expect(source).toMatch(new RegExp(`vanillaHtml = \`[^\`]*tabindex="${tabIndex}"`));
        }
    });
});
