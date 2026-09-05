import {useState} from 'react';
import {Select} from '@loreschaeffer/lyco-ui';

export const title = 'Searchable Select';
export const description = 'A select component that allows filtering options. The native Vanilla equivalent uses `<input list="...">` and `<datalist>`.';
export const order = 4;

export const vanillaHtml = `
<div class="select select--md">
    <div class="select__trigger" tabindex="-1" role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-controls="datalist-example">
        <div class="select__content">
            <input type="text" class="select__input" placeholder="Search countries..." list="country-options" role="textbox" />
        </div>
        <button type="button" class="select__chevron-btn" tabindex="-1" aria-label="Toggle dropdown">
            <svg class="select__chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>
    </div>
</div>
<datalist id="country-options">
    <option value="United States">United States</option>
    <option value="Canada">Canada</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Australia">Australia</option>
    <option value="Germany">Germany</option>
    <option value="France">France</option>
</datalist>
<p class="text-sm text-secondary mt-2">Note: For a fully styled Vanilla experience matching the React component, use the <code>data-searchable="true"</code> attribute on a native <code>&lt;select&gt;</code> and let LycoUI initialize it.</p>
`;

export default function SearchableExample() {
    const [value, setValue] = useState<string | number>('');

    const options = [
        {label: 'United States', value: 'US'},
        {label: 'Canada', value: 'CA'},
        {label: 'United Kingdom', value: 'UK'},
        {label: 'Australia', value: 'AU'},
        {label: 'Germany', value: 'DE'},
        {label: 'France', value: 'FR'},
        {label: 'Japan', value: 'JP'},
        {label: 'Brazil', value: 'BR'},
        {label: 'India', value: 'IN'},
        {label: 'China', value: 'CN'}
    ];

    return (
        <div style={{maxWidth: '300px'}}>
            <Select
                searchable
                options={options}
                value={value}
                onChange={setValue}
                placeholder="Search countries..."
            />
            <div className="mt-2 text-sm text-secondary">
                Selected Value: {value || 'None'}
            </div>
        </div>
    );
}
