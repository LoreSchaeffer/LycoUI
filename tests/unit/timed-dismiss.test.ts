import {describe, expect, it, vi} from 'vitest';
import {durationToMilliseconds, TimedDismiss, type TimedDismissScheduler} from '../../packages/core/src/interaction/timed-dismiss.ts';

function scheduler(): TimedDismissScheduler & {advance(ms: number): void} {
    let now = 0;
    let id = 0;
    const jobs = new Map<number, {at: number; callback: () => void}>();
    return {now: () => now, set: (callback, delay) => { const next = ++id; jobs.set(next, {at: now + delay, callback}); return next; }, clear: (timer) => jobs.delete(timer), advance: (ms) => { now += ms; [...jobs.entries()].filter(([, job]) => job.at <= now).forEach(([timer, job]) => { jobs.delete(timer); job.callback(); }); }};
}

describe('TimedDismiss', () => {
    it('resumes only the remaining duration and closes once', () => {
        const clock = scheduler();
        const close = vi.fn();
        const timer = new TimedDismiss(100, close, clock);
        timer.start(); clock.advance(40); timer.pause(); clock.advance(100); expect(close).not.toHaveBeenCalled();
        timer.resume(); clock.advance(59); expect(close).not.toHaveBeenCalled(); clock.advance(1); timer.close(); expect(close).toHaveBeenCalledTimes(1);
    });

    it('treats zero as immediate and destroy as final', () => {
        const clock = scheduler(); const close = vi.fn();
        new TimedDismiss(0, close, clock).start(); expect(close).toHaveBeenCalledOnce();
        const timer = new TimedDismiss(10, close, clock); timer.start(); timer.destroy(); clock.advance(10); expect(close).toHaveBeenCalledOnce();
        expect(durationToMilliseconds('long')).toBe(8000);
    });
});
