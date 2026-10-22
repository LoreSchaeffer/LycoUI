import {expect, test} from '@playwright/test';
import {readFile} from 'node:fs/promises';

test('Code source isolates its runtime highlighter behind a dynamic import', async () => {
    const source = await readFile('packages/core/src/components/Code/highlighter.ts', 'utf8');
    expect(source).toContain("import('shiki/core')");
});
