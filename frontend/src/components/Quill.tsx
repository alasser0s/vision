import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);

const TextEditor: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>('');

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            [{ 'header': '1' }, { 'header': '2' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            ['clean'],
          ],
          imageResize: {
            // Optional custom configuration
          },
        }}
        formats={[
          'font', 'size', 'header', 'bold', 'italic', 'underline', 'strike',
          'align', 'list', 'bullet', 'script', 'link', 'image',
          'blockquote', 'code-block',
        ]}
        placeholder="Compose an epic..."
      />
      <button
        style={{ marginTop: '10px', backgroundColor: '#FFD700', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
        onClick={() => console.log(editorContent)}
      >
        Show Code
      </button>
    </div>
  );
};

export default TextEditor;
