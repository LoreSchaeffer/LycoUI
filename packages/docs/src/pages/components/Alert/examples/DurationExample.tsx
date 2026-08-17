import { useState } from 'react';
import { Alert, Button } from '@loreschaeffer/lyco-ui';

export const title = 'Timed Duration Alerts';
export const description = <p>Provide a <code>duration</code> in seconds. The alert will display a shrinking progress bar and automatically unmount (and call <code>onClose</code>) when the time expires.</p>;
export const order = 4;

export const vanillaHtml = `
<!-- The Vanilla controller reads data-duration and injects the progress bar automatically -->
<div class="alert alert-danger alert-closable" data-duration="5" role="alert">
  <div class="alert__content">This vanilla alert will self-destruct in 5 seconds.</div>
  <button type="button" class="alert__close" aria-label="Close">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>
</div>
`;

export default function DurationExample() {
  const [alerts, setAlerts] = useState<{id: number}[]>([]);

  const addAlert = () => {
    setAlerts(prev => [...prev, { id: Date.now() }]);
  };

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Button onClick={addAlert}>Spawn Timed Alert</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            variant="primary"
            closable
            duration={5}
            onClose={() => removeAlert(alert.id)}
          >
            This alert will self-destruct in 5 seconds!
          </Alert>
        ))}
      </div>
    </div>
  );
}
