import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
interface ToolConstructable {
  new(...args: any[]): any;
}

interface ToolSettings {
  class: ToolConstructable;
  inlineToolbar?: string[] | boolean;
  config?: any;
  shortcut?: string;
}
interface EditorTools {
  [toolName: string]: ToolConstructable | ToolSettings;
}
interface EditorTools {
  embed: typeof Embed;
  table: typeof Table;
  list: typeof List;
  warning: typeof Warning;
  code: typeof Code;
  linkTool: typeof LinkTool;
  image: typeof Image;
  raw: typeof Raw;
  header: typeof Header;
  quote: typeof Quote;
  marker: typeof Marker;
  checklist: typeof CheckList;
  delimiter: typeof Delimiter;
  inlineCode: typeof InlineCode;
  simpleImage: typeof SimpleImage;
  paragraph?: typeof Paragraph; // Optional since it's commented out in your original code
}

export const EDITOR_JS_TOOLS: EditorTools = {
  embed: Embed,
  table: Table,
  // paragraph: Paragraph,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
