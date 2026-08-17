import { useCallback, useState } from 'react';
import { Col, Input, Row } from '@loreschaeffer/lyco-ui';

export const title = 'Validation';
export const description = <p>Validation can be automatic (based on native HTML constraints and a custom <code>validationFn</code>), or manually controlled via the <code>validation</code> prop. Auto-validation triggers after the first blur.</p>;
export const order = 6;

export const vanillaHtml = `
<!-- Auto validation (required field) -->
<div class="mb-4">
  <input type="email" class="input-custom" data-validation="auto" required placeholder="Required email..." />
</div>

<!-- Auto validation with custom validator -->
<!-- Register: window.lycoValidators = { minLen: v => v.length < 5 ? 'At least 5 characters' : null } -->
<div class="mb-4">
  <input type="text" class="input-custom" data-validation="auto" data-validation-fn="minLen" placeholder="Min 5 characters..." />
</div>

<!-- Manual: valid -->
<div class="mb-4">
  <input type="text" class="input-custom" data-validation="valid" data-validation-message="This field looks good!" value="Correct value" />
</div>

<!-- Manual: invalid -->
<div>
  <input type="text" class="input-custom" data-validation="invalid" data-validation-message="This value is not acceptable." value="Wrong" />
</div>
`;

export default function ValidationExample() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const usernameValidator = useCallback((value: string) => {
    if (value.length > 0 && value.length < 5) {
      return 'Username must be at least 5 characters.';
    }
    return null;
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  return (
    <Row>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Auto Validation (required email)</div>
        <Input
          type="email"
          validation="auto"
          required
          placeholder="Required email..."
          value={email}
          onChange={handleEmailChange}
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Auto + Custom Validator</div>
        <Input
          validation="auto"
          validationFn={usernameValidator}
          placeholder="Min 5 characters..."
          value={username}
          onChange={handleUsernameChange}
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Manual: Valid</div>
        <Input
          validation="valid"
          validationMessage="This field looks good!"
          defaultValue="Correct value"
        />
      </Col>
      <Col span={12} md={6} className="mb-4">
        <div className="text-sm fw-bold mb-2 text-secondary">Manual: Invalid</div>
        <Input
          validation="invalid"
          validationMessage="This value is not acceptable."
          defaultValue="Wrong"
        />
      </Col>
    </Row>
  );
}
