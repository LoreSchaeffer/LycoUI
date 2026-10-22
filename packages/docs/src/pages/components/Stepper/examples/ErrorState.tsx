import React from 'react';
import {Step, Stepper} from '@loreschaeffer/lyco-ui';

export const title = 'Error State';
export const description = 'Demonstrates a stepper with a step in an error state.';
export const order = 3;

export const vanillaHtml = `
<ol class="stepper stepper-horizontal">
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step-header">
      <div class="step-icon">1</div>
    </div>
    <div class="step-content">
      <div class="step-title">Setup</div>
    </div>
  </li>
  <li class="step is-error">
    <div class="step-header">
      <div class="step-icon">2</div>
    </div>
    <div class="step-content">
      <div class="step-title">Connection Failed</div>
      <div class="step-description">Check your network</div>
    </div>
  </li>
  <li class="step">
    <div class="step-header">
      <div class="step-icon">3</div>
    </div>
    <div class="step-content">
      <div class="step-title">Sync</div>
    </div>
  </li>
</ol>
`;

export default function ErrorExample() {
    return (
        <Stepper activeStep={1}>
            <Step title="Setup"/>
            <Step
                title="Connection Failed"
                description="Check your network"
                isError
            />
            <Step title="Sync"/>
        </Stepper>
    );
}
