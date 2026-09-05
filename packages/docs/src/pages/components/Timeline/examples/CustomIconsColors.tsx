import React from 'react';
import {Timeline, TimelineItem} from '@loreschaeffer/lyco-ui';

export const title = 'Custom Icons & Colors';
export const description = 'Override default colors and icons for specific states (e.g. success, error).';
export const order = 3;

export const vanillaHtml = `
<ol class="timeline timeline--vertical">
  <li class="timeline__item has-color" style="--timeline-color-base: var(--success-500, var(--color-success));">
    <div class="timeline__icon-wrapper">
      <div class="timeline__icon">
        <svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
      </div>
    </div>
    <div class="timeline__content">
      <div class="timeline__title">Order Placed</div>
      <div class="timeline__time"><time>Yesterday</time></div>
    </div>
  </li>
  <li class="timeline__item has-color" style="--timeline-color-base: var(--primary-500, var(--color-primary));">
    <div class="timeline__icon-wrapper">
      <div class="timeline__icon">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
      </div>
    </div>
    <div class="timeline__content">
      <div class="timeline__title">Processing</div>
      <div class="timeline__time"><time>Today, 08:30 AM</time></div>
    </div>
  </li>
  <li class="timeline__item has-color" style="--timeline-color-base: var(--danger-500, var(--color-danger));">
    <div class="timeline__icon-wrapper">
      <div class="timeline__icon">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
      </div>
    </div>
    <div class="timeline__content">
      <div class="timeline__title">Delivery Failed</div>
      <div class="timeline__time"><time>Today, 10:15 AM</time></div>
    </div>
  </li>
</ol>
`;

const CheckIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
    </svg>
);
const AddIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
);
const CloseIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
);

export default function CustomIconsColorsExample() {
    return (
        <Timeline orientation="vertical" align="left">
            <TimelineItem
                title="Order Placed"
                time="Yesterday"
                icon={<CheckIcon/>}
                color="success"
            />
            <TimelineItem
                title="Processing"
                time="Today, 08:30 AM"
                icon={<AddIcon/>}
                color="primary"
            />
            <TimelineItem
                title="Delivery Failed"
                time="Today, 10:15 AM"
                icon={<CloseIcon/>}
                color="danger"
            />
        </Timeline>
    );
}
