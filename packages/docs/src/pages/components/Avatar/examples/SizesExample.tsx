import { Avatar } from '@loreschaeffer/lyco-ui';

export const title = 'Avatar Sizes & Shapes';
export const description = <p>Avatars come in four standard sizes (<code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code>) and two shapes (<code>circle</code> and <code>square</code>).</p>;
export const order = 2;

export const vanillaHtml = `
<div class="avatar avatar--sm avatar--circle">
  <div class="avatar__fallback">S</div>
</div>
<div class="avatar avatar--md avatar--circle">
  <div class="avatar__fallback">M</div>
</div>
<div class="avatar avatar--lg avatar--circle">
  <div class="avatar__fallback">L</div>
</div>
<div class="avatar avatar--xl avatar--circle">
  <div class="avatar__fallback">XL</div>
</div>

<div class="avatar avatar--md avatar--square">
  <img src="https://i.pravatar.cc/150?img=47" alt="User square" class="avatar__image" />
</div>
`;

export default function SizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <Avatar size="sm" fallback="SM" />
        <Avatar size="md" fallback="MD" />
        <Avatar size="lg" fallback="LG" />
        <Avatar size="xl" fallback="XL" />
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <Avatar shape="square" size="sm" src="https://i.pravatar.cc/150?img=47" fallback="SM" />
        <Avatar shape="square" size="md" src="https://i.pravatar.cc/150?img=47" fallback="MD" />
        <Avatar shape="square" size="lg" src="https://i.pravatar.cc/150?img=47" fallback="LG" />
        <Avatar shape="square" size="xl" src="https://i.pravatar.cc/150?img=47" fallback="XL" />
      </div>
    </div>
  );
}
