import React, { useCallback, useState } from 'react';
import {
  EditorContent,
  useEditor,
  Editor
} from '@tiptap/react';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Gapcursor from '@tiptap/extension-gapcursor';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import './styles.scss'
interface TextEditorProps {
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      BulletList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `
      <ul>
        <li>A list item</li>
        <li>And another one</li>
      </ul>
      <p>This is a basic example of implementing images. Drag to re-order.</p>
      <img src="https://placehold.co/800x400" />
      <img src="https://placehold.co/800x400/6A00F5/white" />
    `,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="control-group">
        <div className="button-group bg-slate-50 p-5 ">
          <button
            onClick={() =>
              editor.chain().focus().insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: true,
              }).run()
            }
          >
            Insert table
          </button>
          <button onClick={() => editor.chain().focus().addColumnBefore().run()}>
            Add column before
          </button>
          <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
            Add column after
          </button>
          <button onClick={() => editor.chain().focus().deleteColumn().run()}>
            Delete column
          </button>
          <button onClick={() => editor.chain().focus().addRowBefore().run()}>
            Add row before
          </button>
          <button onClick={() => editor.chain().focus().addRowAfter().run()}>
            Add row after
          </button>
          <button onClick={() => editor.chain().focus().deleteRow().run()}>
            Delete row
          </button>
          <button onClick={() => editor.chain().focus().deleteTable().run()}>
            Delete table
          </button>
          <button onClick={() => editor.chain().focus().mergeCells().run()}>
            Merge cells
          </button>
          <button onClick={() => editor.chain().focus().splitCell().run()}>
            Split cell
          </button>
          <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
            Toggle header column
          </button>
          <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
            Toggle header row
          </button>
          <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
            Toggle header cell
          </button>
          <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
            Merge or split
          </button>
          <button
            onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}
          >
            Set cell attribute
          </button>
          <button onClick={() => editor.chain().focus().fixTables().run()}>
            Fix tables
          </button>
          <button onClick={() => editor.chain().focus().goToNextCell().run()}>
            Go to next cell
          </button>
          <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>
            Go to previous cell
          </button>
          <button onClick={addImage}>Set image</button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Toggle bullet list
          </button>
          <button
            onClick={() => editor.chain().focus().splitListItem('listItem').run()}
            disabled={!editor.can().splitListItem('listItem')}
          >
            Split list item
          </button>
          <button
            onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
            disabled={!editor.can().sinkListItem('listItem')}
          >
            Sink list item
          </button>
          <button
            onClick={() => editor.chain().focus().liftListItem('listItem').run()}
            disabled={!editor.can().liftListItem('listItem')}
          >
            Lift list item
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            H3
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </>
  );
};

export default TextEditor;
