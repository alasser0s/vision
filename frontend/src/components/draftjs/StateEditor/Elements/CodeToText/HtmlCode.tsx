import React, { useEffect } from 'react';
import { Transforms, Path } from 'slate';
import { useSlateStatic, useSelected, useFocused } from 'slate-react';
import { Node, BaseElement } from 'slate';

interface HtmlNode extends BaseElement {
    type: 'htmlCode';
    html: string;
    children: Node[]; // or HtmlNode[] if children are of the same type
}


const HtmlCode = (props: any) => {
    const { attributes, element, children } = props;
    const selected = useSelected();
    const focused = useFocused();
    const editor = useSlateStatic();

    const isHtmlEmbed = editor.selection && editor.selection.focus && element.type === 'htmlCode';

    const handleKeyUp = (e: KeyboardEvent) => {
        if (!isHtmlEmbed) return;

        if (e.key === 'Enter') {
            const parentPath = Path.parent(editor.selection!.focus.path);
            const nextPath = Path.next(parentPath);

            Transforms.insertNodes(
                editor,
                { type: 'paragraph', children: [{ text: '' }] },
                { at: nextPath, select: true }
            );
        } else if (e.key === 'Backspace') {
            Transforms.removeNodes(editor, { at: editor.selection!.focus.path });
        }
    };

    useEffect(() => {
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [isHtmlEmbed]);

    return (
        <div
            {...attributes}
            style={{ boxShadow: selected && focused ? '0 0 3px 3px lightgray' : undefined, marginRight: '20px' }}
        >
            <div contentEditable={false}>
                {/* Your content here */}
            </div>
            {children}
        </div>
    );
};

export default HtmlCode;