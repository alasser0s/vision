import { BaseElement, BaseText } from 'slate';

export interface CustomText extends BaseText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontFamily?: string;
}

export interface ParagraphElement extends BaseElement {
  type: 'paragraph';
  children: (CustomText | LinkElement | ImageElement | VideoElement | EquationElement | TableElement | ListItemElement)[];
}

export interface LinkElement extends BaseElement {
  type: 'link';
  url: string;
  target?: '_blank' | '_self';
  children: CustomText[];
}

export interface ImageElement extends BaseElement {
  type: 'image';
  url: string;
  alt?: string;
  children: CustomText[];
}

export interface VideoElement extends BaseElement {
  type: 'video';
  url: string;
  alt?: string;
  children: CustomText[];
}

export interface EquationElement extends BaseElement {
  type: 'equation';
  math: string;
  inline?: boolean;
  children: CustomText[];
}

export interface TableElement extends BaseElement {
  type: 'table';
  rows: number;
  columns: number;
  children: TableRowElement[];
}

export interface TableRowElement extends BaseElement {
  type: 'table-row';
  children: TableCellElement[];
}

export interface TableCellElement extends BaseElement {
  type: 'table-cell';
  children: ParagraphElement[];
}

export interface ListItemElement extends BaseElement {
  type: 'list-item';
  children: CustomText[];
}
