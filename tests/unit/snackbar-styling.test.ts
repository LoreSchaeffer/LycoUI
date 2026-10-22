import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {describe, expect, it} from 'vitest';

const snackbarScss = readFileSync(
    resolve(process.cwd(), 'packages/core/src/components/Snackbar/Snackbar.scss'),
    'utf8'
);

describe('Snackbar styling contract', () => {
    it('uses the semantic variant color for icons and a bottom accent', () => {
        expect(snackbarScss).toContain('align-items: center;');
        expect(snackbarScss).toContain('border-bottom: 3px solid var(--snackbar-border);');
        expect(snackbarScss).toContain('color: var(--snackbar-border);');
        expect(snackbarScss).not.toContain('border-left: 3px solid var(--snackbar-border);');
    });
});
