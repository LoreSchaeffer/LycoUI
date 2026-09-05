import React from 'react';
import {Step, Stepper} from '@loreschaeffer/lyco-ui';

export const title = 'Custom Color';
export const description = 'Provide a custom semantic color name via the `color` prop to override the default primary color.';
export const order = 6;

export const vanillaHtml = `
<ol class="stepper stepper--horizontal" style="--stepper-color-base: var(--fuchsia-500);">
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step__header">
      <div class="step__icon">1</div>
    </div>
    <div class="step__content">
      <div class="step__title">First Step</div>
    </div>
  </li>
  <li class="step is-active" aria-current="step">
    <div class="step__header">
      <div class="step__icon">2</div>
    </div>
    <div class="step__content">
      <div class="step__title">Second Step</div>
    </div>
  </li>
  <li class="step">
    <div class="step__header">
      <div class="step__icon">3</div>
    </div>
    <div class="step__content">
      <div class="step__title">Third Step</div>
    </div>
  </li>
</ol>
`;

export default function CustomColorExample() {
    return (
        <Stepper activeStep={1} color="fuchsia">
            <Step title="First Step"/>
            <Step title="Second Step"/>
            <Step title="Third Step"/>
        </Stepper>
    );
}
