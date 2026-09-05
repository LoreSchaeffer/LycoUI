import {Video} from '@loreschaeffer/lyco-ui';

export const title = 'Standard Video (16/9)';
export const order = 1;
export const description = 'The default aspect ratio is 16/9, perfect for most horizontal video content.';
export const vanillaHtml = `
<div class="lyco-video">
    <iframe src="https://www.youtube.com/embed/YE7VzlLtp-4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
`;

export default function StandardVideo() {
    return (
        <Video
            src="https://www.youtube.com/embed/YE7VzlLtp-4"
            aspectRatio="16 / 9"
        />
    );
}
