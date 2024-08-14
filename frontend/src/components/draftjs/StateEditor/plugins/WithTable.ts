import { Editor, Element as SlateElement, Transforms, Point, Range, Path } from 'slate';

interface ExtendedElement extends SlateElement {
    type: any;
}

const withTable = (editor: Editor) => {
    const { deleteBackward, deleteForward, insertBreak } = editor;

    editor.deleteBackward = (unit) => {
        const { selection } = editor;
        if (selection) {
            const [cell] = Editor.nodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as ExtendedElement).type === 'table-cell',
            });
            const prevNodePath = Editor.before(editor, selection);

            const [tableNode] = Editor.nodes(editor, {
                at: prevNodePath,
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as ExtendedElement).type === 'table-cell',
            });

            if (cell) {
                const [, cellPath] = cell;
                const start = Editor.start(editor, cellPath);
                if (Point.equals(selection.anchor, start)) {
                    return;
                }
            }
            if (!cell && tableNode) {
                return;
            }
        }

        deleteBackward(unit);
    };

    editor.deleteForward = (unit) => {
        const { selection } = editor;
        if (selection && Range.isCollapsed(selection)) {
            const [cell] = Editor.nodes(editor, {
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as ExtendedElement).type === 'table-cell',
            });

            const prevNodePath = Editor.after(editor, selection);
            const [tableNode] = Editor.nodes(editor, {
                at: prevNodePath,
                match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as ExtendedElement).type === 'table-cell',
            });

            if (cell) {
                const [, cellPath] = cell;
                const end = Editor.end(editor, cellPath);

                if (Point.equals(selection.anchor, end)) {
                    return;
                }
            }
            if (!cell && tableNode) {
                return;
            }
        }

        deleteForward(unit);
    };

    editor.insertBreak = (...args) => {
        if (editor.selection) {
            const parentPath = Path.parent(editor.selection.focus?.path);
            const [parentNode] = Editor.node(editor, parentPath);

            if ((parentNode as ExtendedElement).type === 'table-cell') {
                const nextPath = Path.next(parentPath);
                Transforms.insertNodes(editor, {
                    type: 'paragraph',
                    children: [{ text: '' }],
                } as SlateElement, {
                    at: nextPath,
                    select: true,
                });
            } else {
                insertBreak(...args);
            }
        } else {
            insertBreak(...args);
        }
    };

    return editor;
};

export default withTable;
