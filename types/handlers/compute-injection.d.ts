declare type comp = (getIconContent: import('../types/IconContent').getIconContentType, computeIconTemplate: import('./compute-icon-template').computeLocalIconTemplateType) => (list: import('../types/List').List) => string;
export declare const computeInjection: comp;
export {};
