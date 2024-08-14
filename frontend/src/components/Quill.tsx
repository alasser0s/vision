import React, { useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillTable from 'quill-table';
import 'quill-table-ui/dist/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

// Registering the table module with Quill
Quill.register({
  'modules/table': QuillTable,
}, true);

// Define the toolbar options
const  ى\

\toolbarOptions = [
  [{ 'font': [] }, { 'size': [] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }, { 'align': [] }],
  ['link', 'image', 'video', 'formula'],
  ['clean'],
  ['table'], // Adding the table button to the toolbar
];

const QuillEditor: React.FC = () => {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      // You can manipulate the quill instance here if needed
    }
  }, []);

  return (
    <div>
      <div id="toolbar-container">
        {/* Quill toolbar will be generated here */}
      </div>
      <ReactQuill
        ref={quillRef}
        modules={{
          syntax: {
            highlight: text => hljs.highlightAuto(text).value,
          },
          toolbar: {
            container:  toolbarOptions, // Use the custom toolbar options
          },
          table: true, // Enable the table module
        }}
        theme="snow"
        placeholder="Compose an epic..."
      />
    </div>
  );
};

export default QuillEditor;
