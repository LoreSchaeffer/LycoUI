import React from 'react';
import {Step, Stepper} from '@loreschaeffer/lyco-ui';

export const title = 'Custom Icons';
export const description = 'You can override the default numerical indicators with custom SVG icons.';
export const order = 4;

export const vanillaHtml = `
<ol class="stepper stepper--horizontal">
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step__header">
      <div class="step__icon">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
      </div>
    </div>
    <div class="step__content">
      <div class="step__title">Cart</div>
    </div>
  </li>
  <li class="step is-active is-warning" aria-current="step">
    <div class="step__header">
      <div class="step__icon">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      </div>
    </div>
    <div class="step__content">
      <div class="step__title">Review</div>
    </div>
  </li>
</ol>
`;

const CheckIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
);

const AlertIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
);

export default function CustomIconsExample() {
    return (
        <Stepper activeStep={1}>
            <Step title="Cart" icon={<CheckIcon/>}/>
            <Step title="Review" icon={<AlertIcon/>} isWarning/>
        </Stepper>
    );
}
