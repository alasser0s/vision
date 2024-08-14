import { Editor, Transforms, Path, Range, Element, Node } from 'slate';

interface LinkNode extends Element {
    type: 'link';
    href: string;
    target: string;
    children: { text: string }[];
}

export const createLinkNode = (href: string, showInNewTab: boolean, text: string): LinkNode => ({
    type: 'link',
    href,
    target: showInNewTab ? '_blank' : '_self',
    children: [{ text }],
});

export const insertLink = (editor: Editor, { url, showInNewTab }: { url: string; showInNewTab: boolean }) => {
    if (!url) return;

    const { selection } = editor;
    const link = createLinkNode(url, showInNewTab, 'Link');
    if (!!selection) {
        const [parent, parentPath] = Editor.parent(editor, selection.focus.path);
        const parentElement = parent as LinkNode; // Casting to LinkNode

        if (parentElement.type === 'link') {
            removeLink(editor);
        }

        if (Editor.isVoid(editor, parentElement)) {
            Transforms.insertNodes(
                editor, 
                { type: 'paragraph', children: [link] } as Node,
                {
                    at: Path.next(parentPath),
                    select: true,
                }
            );
        } else if (Range.isCollapsed(selection)) {
            Transforms.insertNodes(editor, link, { select: true });
        } else {
            Transforms.wrapNodes(editor, link, { split: true });
        }
    } else {
        Transforms.insertNodes(editor, { type: 'paragraph', children: [link] } as Node);
    }
};

export const removeLink = (editor: Editor) => {
    Transforms.unwrapNodes(editor, {
        match: n => {
            const node = n as LinkNode;
            return !Editor.isEditor(node) && Element.isElement(node) && node.type === 'link';
        },
    });
};
