import React from 'react';
import {Step, Stepper} from '@loreschaeffer/lyco-ui';

export const title = 'Compact Timeline';
export const description = 'Use the `compact` and `hideNumbers` props for a sleek, numberless timeline look, suitable for tight spaces or cards.';
export const order = 7;

export const vanillaHtml = `
<ol class="stepper stepper--horizontal stepper--compact">
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step__header">
      <div class="step__icon"></div>
    </div>
    <div class="step__content">
      <div class="step__title">Cart</div>
    </div>
  </li>
  <li class="step is-active" aria-current="step">
    <div class="step__header">
      <div class="step__icon"></div>
    </div>
    <div class="step__content">
      <div class="step__title">Billing</div>
    </div>
  </li>
  <li class="step">
    <div class="step__header">
      <div class="step__icon"></div>
    </div>
    <div class="step__content">
      <div class="step__title">Done</div>
    </div>
  </li>
</ol>
`;

export default function CompactVersionExample() {
    return (
        <Stepper activeStep={1} compact hideNumbers>
            <Step title="Cart"/>
            <Step title="Billing"/>
            <Step title="Done"/>
        </Stepper>
    );
}
