import {useState} from 'react';
import {Col, Row, Select} from '@loreschaeffer/lyco-ui';
import {FiLogOut, FiSettings, FiUser} from 'react-icons/fi';

export const title = 'Icons & Spacers';
export const description = <p>Enhance options with leading icons and separate logical groups using spacers. In Vanilla HTML, pass SVG strings via the <code>data-icon</code> attribute.</p>;
export const order = 2;

export const vanillaHtml = `
<select class="select-custom" data-variant="primary">
    <option value="profile" data-icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path><circle cx='12' cy='7' r='4'></circle></svg>">
        Profile
    </option>
    <option value="settings" data-icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='3'></circle><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path></svg>">
        Settings
    </option>
    <option disabled data-spacer="true"></option>
    <option value="logout" data-icon="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path><polyline points='16 17 21 12 16 7'></polyline><line x1='21' y1='12' x2='9' y2='12'></line></svg>">
        Logout
    </option>
</select>
`;

export default function IconsAndSpacersExample() {
    const [value, setValue] = useState<string | number>('profile');

    return (
        <Row>
            <Col span={12} md={6}>
                <Select
                    value={value}
                    onChange={setValue}
                    icon={<FiUser/>}
                    options={[
                        {label: 'Profile', value: 'profile', icon: <FiUser/>},
                        {label: 'Settings', value: 'settings', icon: <FiSettings/>},
                        {isSpacer: true},
                        {label: 'Logout', value: 'logout', icon: <FiLogOut/>}
                    ]}
                />
            </Col>
        </Row>
    );
}