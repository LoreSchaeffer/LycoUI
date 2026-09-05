import React from 'react';
import {Step, Stepper} from '@loreschaeffer/lyco-ui';

export const title = 'Error State';
export const description = 'Demonstrates a stepper with a step in an error state.';
export const order = 3;

export const vanillaHtml = `
<ol class="stepper stepper--horizontal">
  <li class="step is-completed">
    <span class="hidden">Completed: </span>
    <div class="step__header">
      <div class="step__icon">1</div>
    </div>
    <div class="step__content">
      <div class="step__title">Setup</div>
    </div>
  </li>
  <li class="step is-error">
    <div class="step__header">
      <div class="step__icon">2</div>
    </div>
    <div class="step__content">
      <div class="step__title">Connection Failed</div>
      <div class="step__description">Check your network</div>
    </div>
  </li>
  <li class="step">
    <div class="step__header">
      <div class="step__icon">3</div>
    </div>
    <div class="step__content">
      <div class="step__title">Sync</div>
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
