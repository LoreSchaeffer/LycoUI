import React from 'react';
import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '../../packages/core/src/components/DropdownMenu/DropdownMenu';
import {LycoNavbarController} from '../../packages/core/src/components/Navbar/Navbar.vanilla';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('menu instance identity and scoping', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('gives each rendered dropdown trigger and content a matching unique id', async () => {
        const container = document.createElement('div');
        document.body.append(container);
        const root = createRoot(container);

        await act(async () => root.render(
            <>
                <DropdownMenu isOpen>
                    <DropdownMenuTrigger>First</DropdownMenuTrigger>
                    <DropdownMenuContent><DropdownMenuItem>First item</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu isOpen>
                    <DropdownMenuTrigger>Second</DropdownMenuTrigger>
                    <DropdownMenuContent><DropdownMenuItem>Second item</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
            </>,
        ));

        const triggers = [...container.querySelectorAll<HTMLElement>('[aria-controls]')];
        const surfaces = [...document.body.querySelectorAll<HTMLElement>('[role="menu"]')];

        expect(triggers).toHaveLength(2);
        expect(surfaces).toHaveLength(2);
        expect(new Set(triggers.map(trigger => trigger.getAttribute('aria-controls'))).size).toBe(2);
        expect(triggers.map(trigger => trigger.getAttribute('aria-controls')))
            .toEqual(surfaces.map(surface => surface.id));

        await act(async () => root.unmount());
    });

    it('resolves navbar collapse panels within the current navbar instance', () => {
        const first = document.createElement('nav');
        first.innerHTML = '<button class="navbar-toggle" aria-controls="shared-collapse" aria-expanded="false"></button><div class="navbar-collapse" id="shared-collapse" hidden></div>';
        const second = document.createElement('nav');
        second.innerHTML = '<button class="navbar-toggle" aria-controls="shared-collapse" aria-expanded="false"></button><div class="navbar-collapse" id="shared-collapse" hidden></div>';
        document.body.append(first, second);

        const controller = new LycoNavbarController(second);
        second.querySelector<HTMLButtonElement>('.navbar-toggle')?.click();

        expect(second.querySelector<HTMLElement>('.navbar-collapse')?.hidden).toBe(false);
        expect(first.querySelector<HTMLElement>('.navbar-collapse')?.hidden).toBe(true);

        controller.destroy();
    });

    it('does not return focus to a different trigger while opening another dropdown', async () => {
        const container = document.createElement('div');
        document.body.append(container);
        const root = createRoot(container);

        await act(async () => root.render(
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger>First trigger</DropdownMenuTrigger>
                    <DropdownMenuContent><DropdownMenuItem>First item</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>Second trigger</DropdownMenuTrigger>
                    <DropdownMenuContent><DropdownMenuItem>Second item</DropdownMenuItem></DropdownMenuContent>
                </DropdownMenu>
            </>,
        ));

        const [firstTrigger, secondTrigger] = [...container.querySelectorAll<HTMLButtonElement>('button[aria-haspopup="menu"]')];
        await act(async () => firstTrigger.click());
        const firstFocus = vi.spyOn(firstTrigger, 'focus');

        await act(async () => {
            secondTrigger.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
            secondTrigger.click();
        });

        expect(firstFocus).not.toHaveBeenCalled();
        expect(document.activeElement?.textContent).toBe('Second item');

        await act(async () => root.unmount());
    });

    it('positions a portaled menu before moving focus to its first item', async () => {
        const container = document.createElement('div');
        document.body.append(container);
        const root = createRoot(container);
        const getBoundingClientRect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
            bottom: 120,
            height: 20,
            left: 40,
            right: 140,
            top: 100,
            width: 100,
            x: 40,
            y: 100,
            toJSON: () => ({}),
        } as DOMRect);
        const focusedMenuTops: string[] = [];

        try {
            await act(async () => root.render(
                <DropdownMenu isOpen>
                    <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onFocus={(event) => focusedMenuTops.push(event.currentTarget.parentElement?.style.top ?? '')}>
                            Item
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>,
            ));

            expect(focusedMenuTops).toEqual(['124px']);
        } finally {
            getBoundingClientRect.mockRestore();
            await act(async () => root.unmount());
        }
    });
});
