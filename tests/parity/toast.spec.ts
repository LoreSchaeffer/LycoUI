import {expect, test} from '@playwright/test';
import {appendWithMaximum} from '../../packages/core/src/components/Notification/notification-store.ts';

test('toast store applies a shared maximum-eviction policy', () => {
    const result = appendWithMaximum([{id: 'one'}, {id: 'two'}], {id: 'three'}, 2);
    expect(result.items.map((item) => item.id)).toEqual(['two', 'three']);
    expect(result.evicted.map((item) => item.id)).toEqual(['one']);
});
