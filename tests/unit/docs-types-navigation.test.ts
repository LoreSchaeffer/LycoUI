import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';

const routeFile = resolve(process.cwd(), 'packages/docs/src/routes/auto-discovery.ts');

describe('shared types documentation navigation', () => {
    it('exposes one consolidated types entry without fragmented page imports', async () => {
        const source = await readFile(routeFile, 'utf8');

        expect(source).toContain("name: 'Shared Types'");
        expect(source).toContain("import('../pages/types/TypesDoc.tsx')");
        expect(source).not.toContain('ComponentTypes.tsx');
        expect(source).not.toContain('ContextTypes.tsx');
        expect(source).not.toContain('PolymorphicTypes.tsx');
        expect((source.match(/name: '(?:Custom|Component|Context|Polymorphic|Shared) Types'/g) ?? [])).toHaveLength(1);
    });
});
