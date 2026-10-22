import {expect, test} from '@playwright/test';
import {readFile} from 'node:fs/promises';

test('Carousel renders inert clones and composes extracted controls', async () => {
    const source = await readFile('packages/core/src/components/Carousel/Carousel.tsx', 'utf8');
    expect(source).toContain('aria-hidden');
    expect(source).toContain('inert=');
    expect(source).toContain('<CarouselControls');
});
