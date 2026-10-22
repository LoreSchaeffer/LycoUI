import React from 'react';
import {Timeline, TimelineItem} from '@loreschaeffer/lyco-ui';

export const title = 'Basic Vertical Timeline';
export const description = 'A standard vertical timeline, aligned to the left.';
export const order = 1;

export const vanillaHtml = `
<ol class="timeline timeline-vertical">
  <li class="timeline-item">
    <div class="timeline-icon-wrapper">
      <div class="timeline-icon"></div>
    </div>
    <div class="timeline-content">
      <div class="timeline-title">Repository created</div>
      <div class="timeline-time"><time>Oct 1, 2026</time></div>
    </div>
  </li>
  <li class="timeline-item">
    <div class="timeline-icon-wrapper">
      <div class="timeline-icon"></div>
    </div>
    <div class="timeline-content">
      <div class="timeline-title">Pull request merged</div>
      <div class="timeline-time"><time>Oct 15, 2026</time></div>
    </div>
  </li>
  <li class="timeline-item">
    <div class="timeline-icon-wrapper">
      <div class="timeline-icon"></div>
    </div>
    <div class="timeline-content">
      <div class="timeline-title">Version 1.0 deployed</div>
      <div class="timeline-time"><time>Oct 20, 2026</time></div>
    </div>
  </li>
</ol>
`;

export default function BasicVerticalExample() {
    return (
        <Timeline orientation="vertical" align="left">
            <TimelineItem
                title="Repository created"
                time="Oct 1, 2026"
            />
            <TimelineItem
                title="Pull request merged"
                time="Oct 15, 2026"
            />
            <TimelineItem
                title="Version 1.0 deployed"
                time="Oct 20, 2026"
            />
        </Timeline>
    );
}
