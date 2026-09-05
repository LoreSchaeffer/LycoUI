import React from 'react';
import {Step, Stepper} from '@loreschaeffer/lyco-ui';

export const title = 'Horizontal Stepper';
export const description = 'A standard horizontal wizard flow showing completed, active, and upcoming steps.';
export const order = 1;

export const vanillaHtml = `
<ol class="stepper stepper--horizontal">
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step__header">
      <div class="step__icon">1</div>
    </div>
    <div class="step__content">
      <div class="step__title">Personal Info</div>
      <div class="step__description">Enter your details</div>
    </div>
  </li>
  <li class="step is-active" aria-current="step">
    <div class="step__header">
      <div class="step__icon">2</div>
    </div>
    <div class="step__content">
      <div class="step__title">Shipping</div>
      <div class="step__description">Choose delivery method</div>
    </div>
  </li>
  <li class="step">
    <div class="step__header">
      <div class="step__icon">3</div>
    </div>
    <div class="step__content">
      <div class="step__title">Payment</div>
      <div class="step__description">Provide credit card</div>
    </div>
  </li>
</ol>
`;

export default function HorizontalExample() {
    return (
        <Stepper activeStep={1}>
            <Step
                title="Personal Info"
                description="Enter your details"
            />
            <Step
                title="Shipping"
                description="Choose delivery method"
            />
            <Step
                title="Payment"
                description="Provide credit card"
            />
        </Stepper>
    );
}
