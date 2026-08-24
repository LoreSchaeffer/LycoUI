import { Avatar } from '@loreschaeffer/lyco-ui';

export const title = 'Basic Avatars';
export const description = <p>Avatars can display images, text initials, or icons. If an image fails to load, it will automatically show the provided fallback.</p>;
export const order = 1;

export const vanillaHtml = `
<div class="avatar avatar--md avatar--circle">
  <img src="https://i.pravatar.cc/150?img=32" alt="User profile" class="avatar__image" />
</div>

<div class="avatar avatar--md avatar--circle">
  <div class="avatar__fallback">JD</div>
</div>

<div class="avatar avatar--md avatar--circle">
  <div class="avatar__fallback">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  </div>
</div>
`;

export default function BasicExample() {
  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=32" alt="User profile" />
      <Avatar fallback="JD" />
      <Avatar fallback={UserIcon} />
      <Avatar src="https://invalid-url.com/broken-image.jpg" fallback="ER" />
    </div>
  );
}
