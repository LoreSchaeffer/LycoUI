import React from 'react';
import {Step, Stepper} from '@loreschaeffer/lyco-ui';

export const title = 'Success State';
export const description = 'Demonstrates a step explicitly marked as successful using the `isSuccess` prop.';
export const order = 5;

export const vanillaHtml = `
<ol class="stepper stepper-horizontal">
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step-header">
      <div class="step-icon">1</div>
    </div>
    <div class="step-content">
      <div class="step-title">Data Validation</div>
    </div>
  </li>
  <li class="step is-success is-active" aria-current="step">
    <div class="step-header">
      <div class="step-icon">
        <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
      </div>
    </div>
    <div class="step-content">
      <div class="step-title">Analysis Complete</div>
      <div class="step-description">No issues found</div>
    </div>
  </li>
  <li class="step">
    <div class="step-header">
      <div class="step-icon">3</div>
    </div>
    <div class="step-content">
      <div class="step-title">Report</div>
    </div>
  </li>
</ol>
`;

const CheckIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
);

export default function SuccessExample() {
    return (
        <Stepper activeStep={1}>
            <Step title="Data Validation"/>
            <Step
                title="Analysis Complete"
                description="No issues found"
                icon={<CheckIcon/>}
                isSuccess
            />
            <Step title="Report"/>
        </Stepper>
    );
}
