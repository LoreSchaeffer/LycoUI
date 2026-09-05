import React from 'react';
import {Step, Stepper} from '@loreschaeffer/lyco-ui';

export const title = 'Vertical Stepper';
export const description = 'A vertical stepper is useful for timelines, sidebars, or when step descriptions are lengthy.';
export const order = 2;

export const vanillaHtml = `
<ol class="stepper stepper--vertical">
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step__header">
      <div class="step__icon">1</div>
    </div>
    <div class="step__content">
      <div class="step__title">Account Creation</div>
      <div class="step__description">Account has been created successfully.</div>
    </div>
  </li>
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step__header">
      <div class="step__icon">2</div>
    </div>
    <div class="step__content">
      <div class="step__title">Email Verification</div>
      <div class="step__description">Email verified via magic link.</div>
    </div>
  </li>
  <li class="step is-active" aria-current="step">
    <div class="step__header">
      <div class="step__icon">3</div>
    </div>
    <div class="step__content">
      <div class="step__title">Setup Profile</div>
      <div class="step__description">Add your avatar and bio.</div>
    </div>
  </li>
</ol>
`;

export default function VerticalExample() {
    return (
        <Stepper orientation="vertical" activeStep={2}>
            <Step
                title="Account Creation"
                description="Account has been created successfully."
            />
            <Step
                title="Email Verification"
                description="Email verified via magic link."
            />
            <Step
                title="Setup Profile"
                description="Add your avatar and bio."
            />
        </Stepper>
    );
}
