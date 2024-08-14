import { Transforms, Path, Node, BaseElement } from 'slate';

// Define a new interface that extends BaseElement to include the 'type' property.
interface ExtendedElement extends BaseElement {
  type: string;
}

const withEmbeds = (editor: any) => {
  const { isVoid, insertBreak } = editor;

  editor.isVoid = (element: ExtendedElement) =>
    ['video', 'image', 'htmlCode'].includes(element.type) ? true : isVoid(element);

  editor.insertBreak = (...args: any) => {
    const parentPath = Path.parent(editor.selection.focus.path);
    const parentNode = Node.get(editor, parentPath) as ExtendedElement;

    if (editor.isVoid(parentNode)) {
      const nextPath = Path.next(parentPath);
      Transforms.insertNodes(
        editor,
        {
          type: 'paragraph',
          children: [{ text: '' }],
        } as BaseElement,
        {
          at: nextPath,
          select: true, // Focus on this node once inserted
        }
      );
    } else {
      insertBreak(...args);
    }
  };

  return editor;
};

export default withEmbeds;
