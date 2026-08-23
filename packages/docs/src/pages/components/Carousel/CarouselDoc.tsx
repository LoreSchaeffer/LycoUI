import { DocTemplate } from '../../../components/DocTemplate';
import { apiConfig } from './api';

const exampleModules = import.meta.glob('./examples/*.tsx', { eager: true });
const rawSources = import.meta.glob('./examples/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
});

export default function CarouselDoc() {
    return (
        <DocTemplate
            title="Carousel"
            description={<p>A high-performance carousel powered by CSS Scroll Snap. This approach guarantees 60fps scrolling, native mobile swipe physics, and zero layout shift, avoiding heavy JavaScript physics engines.</p>}
            exampleModules={exampleModules}
            rawSources={rawSources}
            apiConfig={apiConfig}
        />
    );
}
