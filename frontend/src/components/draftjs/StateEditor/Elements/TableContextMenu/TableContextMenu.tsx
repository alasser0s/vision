import React, { useState } from 'react';
import useContextMenu from '../../utils/customHooks/useContextMenu';
import Icon,{IconName} from '../../common/Icon';
import './styles.css';
import { TableUtil } from '../../utils/table';
import { Transforms, Range } from 'slate';
import { ReactEditor } from 'slate-react';

interface TableContextMenuProps {
    editor: ReactEditor;
}

interface MenuAction {
    type: 'insertRow' | 'insertColumn' | 'remove';
    position?: 'before' | 'after';  // Make sure only 'before' or 'after' are used
}

interface MenuOption {
    icon: IconName;  // Use IconName type for icons
    text: string;
    action: MenuAction;
}

const TableContextMenu: React.FC<TableContextMenuProps> = ({ editor }) => {
    const [selection, setSelection] = useState<Range | null>(null);
    const [showMenu, { top, left }] = useContextMenu(editor, 'table', setSelection);
    const table = new TableUtil(editor);

    const menu: MenuOption[] = [
        {
            icon: 'insertColumnRight',  // Cast the string as IconName
            text: 'Insert Columns to the Right',
            action: {
                type: 'insertColumn',
                position: 'after',
            },
        },
        {
            icon: 'insertColumnLeft',  // Cast the string as IconName
            text: 'Insert Columns to the Left',
            action: {
                type: 'insertColumn',
                position: 'before', // Changed from 'at' to 'before'
            },
        },
        {
            icon: 'insertRowAbove',  // Cast the string as IconName
            text: 'Insert Row Above',
            action: {
                type: 'insertRow',
                position: 'before', // Changed from 'at' to 'before'
            },
        },
        {
            icon: 'insertRowBelow',  // Cast the string as IconName
            text: 'Insert Row Below',
            action: {
                type: 'insertRow',
                position: 'after',
            },
        },
        {
            icon: 'trashCan',  // Cast the string as IconName
            text: 'Remove Table',
            action: {
                type: 'remove',
            },
        },
    ];

    const handleInsert = (action: MenuAction) => {
        if (selection) {
            Transforms.select(editor, selection);
            switch (action.type) {
                case 'insertRow':
                    if (action.position) {
                        table.insertRow(action.position);
                    }
                    break;
                case 'insertColumn':
                    if (action.position) {
                        table.insertColumn(action.position);
                    }
                    break;
                case 'remove':
                    table.removeTable();
                    break;
                default:
                    return;
            }
            ReactEditor.focus(editor);
        }
    };

    return (
        showMenu && (
            <div className="contextMenu" style={{ top, left }}>
                {menu.map(({ icon, text, action }, index) => (
                    <div className="menuOption" key={index} onClick={() => handleInsert(action)}>
                        <Icon icon={icon as IconName} />
                        <span>{text}</span>
                    </div>
                ))}
            </div>
        )
    );
};

export default TableContextMenu;
