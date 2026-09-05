import React from 'react';
import {Timeline, TimelineItem} from '@loreschaeffer/lyco-ui';
import {FiCheck} from 'react-icons/fi';

export const title = 'Alternating Timeline';
export const description = 'A vertical timeline where items alternate left and right of the center line, visually demonstrating project progress with color states and icons.';
export const order = 2;

export const vanillaHtml = `
<ol class="timeline timeline--vertical timeline--alternate">
  <li class="timeline__item has-color" style="--timeline-color-base: var(--color-success);">
    <div class="timeline__icon-wrapper">
      <div class="timeline__icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
    <div class="timeline__content">
      <div class="timeline__title">Requirement Gathering</div>
      <div class="timeline__time"><time>Jan 2026</time></div>
    </div>
  </li>
  <li class="timeline__item has-color" style="--timeline-color-base: var(--color-success);">
    <div class="timeline__icon-wrapper">
      <div class="timeline__icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
    <div class="timeline__content">
      <div class="timeline__title">UI/UX Design</div>
      <div class="timeline__time"><time>Feb 2026</time></div>
    </div>
  </li>
  <li class="timeline__item has-color" style="--timeline-color-base: var(--color-primary);">
    <div class="timeline__icon-wrapper">
      <div class="timeline__icon"></div>
    </div>
    <div class="timeline__content">
      <div class="timeline__title">Development Phase</div>
      <div class="timeline__time"><time>Mar 2026</time></div>
    </div>
  </li>
  <li class="timeline__item">
    <div class="timeline__icon-wrapper">
      <div class="timeline__icon"></div>
    </div>
    <div class="timeline__content">
      <div class="timeline__title">Beta Release</div>
      <div class="timeline__time"><time>Apr 2026</time></div>
    </div>
  </li>
</ol>
`;

export default function AlternatingExample() {
    return (
        <Timeline orientation="vertical" align="alternate">
            <TimelineItem
                title="Requirement Gathering"
                time="Jan 2026"
                color="primary"
                icon={<FiCheck size={14} style={{display: 'block'}}/>}
            />
            <TimelineItem
                title="UI/UX Design"
                time="Feb 2026"
                color="primary"
                icon={<FiCheck size={14} style={{display: 'block'}}/>}
            />
            <TimelineItem
                title="Development Phase"
                time="Mar 2026"
            />
            <TimelineItem
                title="Beta Release"
                time="Apr 2026"
            />
        </Timeline>
    );
}
