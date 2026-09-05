import {useState} from 'react';
import {Select} from '@loreschaeffer/lyco-ui';

export const title = 'Custom Values with Validation';
export const description = 'Combine searchable and allowCustomValues to let users enter their own text. You can also provide a validate function.';
export const order = 5;

export const vanillaHtml = `
<!-- When using the vanilla JS bundle, add data-searchable and data-allow-custom. -->
<select class="select-custom" data-searchable="true" data-allow-custom="true" data-validate-pattern="^[^@]+@[^@]+\\.[a-zA-Z]{2,}$" data-validate-message="Invalid email address">
    <option value="user@example.com">user@example.com</option>
    <option value="admin@example.com">admin@example.com</option>
</select>
`;

export default function CustomValuesExample() {
    const [value, setValue] = useState<string | number>('');

    const options = [
        {label: 'user@example.com', value: 'user@example.com'},
        {label: 'admin@example.com', value: 'admin@example.com'},
        {label: 'support@example.com', value: 'support@example.com'}
    ];

    const validateEmail = (val: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
            return 'Please enter a valid email address.';
        }
        return null;
    };

    return (
        <div style={{maxWidth: '300px'}}>
            <Select
                searchable
                allowCustomValues
                validate={validateEmail}
                options={options}
                value={value}
                onChange={setValue}
                placeholder="Enter or select email..."
            />
            <div className="mt-2 text-sm text-secondary">
                Selected Email: {value || 'None'}
            </div>
        </div>
    );
}
