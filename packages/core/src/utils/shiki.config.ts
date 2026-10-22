import type {LanguageRegistration, ShikiTransformer} from 'shiki';

export const customLanguages: LanguageRegistration[] = [];
export const customTransformers: ShikiTransformer[] = [];

export const registerShikiLanguage = (lang: LanguageRegistration) => customLanguages.push(lang);
export const registerShikiTransformer = (transformer: ShikiTransformer) => customTransformers.push(transformer);
