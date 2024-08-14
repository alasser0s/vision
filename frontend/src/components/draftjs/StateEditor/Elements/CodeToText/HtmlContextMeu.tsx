import React, { useState } from 'react';
import { Transforms, Path, Node, Range } from 'slate';
import Icon from '../../common/Icon';
import useContextMenu from '../../utils/customHooks/useContextMenu';

interface HtmlNode extends Node {
    type: 'htmlCode';
    html: string;
    children: Node[];
}

interface HtmlContextMenuProps {
    editor: any;  // Type correctly based on your setup, e.g., ReactEditor
    handleCodeToText: (options: { showInput: boolean; html: string; action: string; location: Range }) => void;
}

const HtmlContextMenu: React.FC<HtmlContextMenuProps> = ({ editor, handleCodeToText }) => {
    const [selection, setSelection] = useState<Range | null>(null);
    const [showMenu, { top, left }] = useContextMenu(editor, 'htmlCode', setSelection);
    const [html, setHtml] = useState<string>('');  // State to manage html

    const handleEditHtml = () => {
        if (selection) {
            Transforms.select(editor, selection);
            const parentPath = Path.parent(selection.focus.path);
            const node = Node.get(editor, parentPath) as HtmlNode;  // Casting node to HtmlNode
            setHtml(node.html);  // Set the html state with the node's html content

            handleCodeToText({
                showInput: true,
                html: node.html,  // Access the html property correctly
                action: 'update',
                location: selection,
            });
        }
    };

    return (
        showMenu && (
            <div className='contextMenu' style={{ top, left }}>
                <div className='menuOption' onClick={handleEditHtml}>
                    <Icon icon='pen' />
                    <span>Edit HTML</span>
                </div>
            </div>
        )
    );
};

export default HtmlContextMenu;
