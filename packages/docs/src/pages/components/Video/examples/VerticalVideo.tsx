import {Video} from '@loreschaeffer/lyco-ui';

export const title = 'Vertical Video (9/16)';
export const order = 2;
export const description = 'You can easily adjust the aspect ratio to accommodate vertical video formats like YouTube Shorts, TikToks, or Reels.';
export const vanillaHtml = `
<div class="lyco-video" style="--lyco-video-ratio: 9 / 16;">
    <iframe src="https://www.youtube.com/embed/5_Q3FnX1Hp8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
`;

export default function VerticalVideo() {
    return (
        <Video
            src="https://www.youtube.com/embed/5_Q3FnX1Hp8"
            aspectRatio="9 / 16"
        />
    );
}
