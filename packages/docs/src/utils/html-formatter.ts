import {dedent} from './code-formatter';

export const formatHtml = (html: string): string => dedent(html);
