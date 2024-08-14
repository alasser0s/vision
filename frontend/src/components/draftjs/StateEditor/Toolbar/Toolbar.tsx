import React, { useEffect, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import Button from '../common/Button';
import Icon from '../common/Icon';
import { ToolbarElement } from './toolbarGroups';
import { toggleBlock, toggleMark, isMarkActive, addMarkData, isBlockActive, activeMark } from '../utils/StateUtilityFunctions';
import useFormat from '../utils/customHooks/useFormat';
import defaultToolbarGroups from './toolbarGroups';
import './styles.css';
import ColorPicker from '../Elements/Color Picker/ColorPicker';
import LinkButton from '../Elements/Link/LinkButton';
import Embed from '../Elements/Embed/Embed';
import TableSelector from '../Elements/Table/TableSelector';
import EquationButton from '../Elements/Equation/EquationButton';
import Id from '../Elements/ID/ID';
import TableContextMenu from '../Elements/TableContextMenu/TableContextMenu';
import CodeToTextButton from '../Elements/CodeToText/CodeToTextButton';
import HtmlContextMenu from '../Elements/CodeToText/HtmlContextMeu';
import { IconName } from '../common/Icon';
import LinkButtonTable from '../Elements/Link/LinkButtonTable';
interface ToolbarProps {
    handleCodeToText: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ handleCodeToText }) => {
    const editor = useSlate();
    const isTable = useFormat(editor, 'table');
    const [toolbarGroups, setToolbarGroups] = useState<ToolbarElement[][]>(defaultToolbarGroups);

    useEffect(() => {
        let filteredGroups = JSON.parse(JSON.stringify(defaultToolbarGroups)) as ToolbarElement[][];
    
        if (isTable) {
            filteredGroups = filteredGroups.map(grp =>
                grp.filter(element =>
                    !['codeToText'].includes(element.type)
                )
            );
            filteredGroups = filteredGroups.filter(elem => elem.length > 0);
        }
        setToolbarGroups(filteredGroups);
    }, [isTable]);

    const BlockButton: React.FC<{ format: string }> = ({ format }) => (
        <Button
            active={isBlockActive(editor, format)}
            format={format}
            onMouseDown={e => {
                e.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <Icon icon={format as any} />
        </Button>
    );

    const MarkButton: React.FC<{ format: string }> = ({ format }) => (
        <Button
            active={isMarkActive(editor, format)}
            format={format}
            onMouseDown={e => {
                e.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon icon={format as any} />
        </Button>
    );

    const Dropdown: React.FC<{ format: string; options: { value: string; text: string }[] }> = ({ format, options }) => (
        <select value={activeMark(editor, format) ?? ''} onChange={(e) => changeMarkData(e, format)}>
            {options.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.text}
                </option>
            ))}
        </select>
    );
    
    const changeMarkData = (event: React.ChangeEvent<HTMLSelectElement>, format: string) => {
        event.preventDefault();
        const value = event.target.value;
        addMarkData(editor, { format, value });
    };

    return (
        <div className="toolbar">
            {toolbarGroups.map((group, index) => (
                <span key={index} className="toolbar-grp">
                    {group.map((element) => {
                        switch (element.type) {
                            case 'block':
                                return <BlockButton key={element.id} format={element.format!} />;
                            case 'mark':
                                return <MarkButton key={element.id} format={element.format!} />;
                            case 'dropdown':
                                return <Dropdown key={element.id} format={element.format!} options={element.options!} />;
                            case 'link':
                                return <LinkButton 
                                key={element.id} 
                                active={isBlockActive(editor, 'link')} 
                                editor={editor as ReactEditor} 
                                format="link" 
                            />
                            case 'link2':
                                return <LinkButtonTable 
                                key={element.id} 
                                active={isBlockActive(editor, 'link')} 
                                editor={editor as ReactEditor} 
                                format="link2" 
                            />
                            ;
                                case 'embed':
                                    const validFormats: IconName[] = ['image', 'video']; // Add other valid formats if needed
                                    if (validFormats.includes(element.format as IconName)) {
                                        return <Embed key={element.id} format={element.format as IconName} editor={editor as any} />;
                                    }
                                    return null;
                                case 'color-picker':
                                    if (element.format === 'color' || element.format === 'bgColor') {
                                        return <ColorPicker key={element.id} format={element.format} editor={editor as any} />;
                                    }
                                    return null; // Safeguard against invalid formats
                                
                            case 'table':
                                return <TableSelector key={element.id} editor={editor as any} />;
                            case 'id':
                                return <Id key={element.id} editor={editor as any} />;
                            case 'equation':
                                return <EquationButton key={element.id} editor={editor as any} />;
                            case 'codeToText':
                                return <CodeToTextButton key={element.id} handleButtonClick={handleCodeToText} />;
                            default:
                                return null;
                        }
                    })}
                </span>
            ))}
            <TableContextMenu editor={editor as any} />
            <HtmlContextMenu editor={editor as any} handleCodeToText={handleCodeToText} />
        </div>
    );
};

