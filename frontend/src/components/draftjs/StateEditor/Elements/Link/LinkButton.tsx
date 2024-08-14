import React, { useRef, useState } from 'react';
import { insertLink } from '../../utils/link';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import { isBlockActive } from '../../utils/StateUtilityFunctions';
import usePopup from '../../utils/customHooks/usePopup';
import { Transforms, Range } from 'slate';
import { ReactEditor } from 'slate-react';

interface LinkButtonProps {
    editor: ReactEditor;
    active:boolean;
    format:string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ editor }) => {
    const linkInputRef = useRef<HTMLDivElement>(null);
    const [showInput, setShowInput] = usePopup(linkInputRef);
    const [url, setUrl] = useState<string>('');
    const [showInNewTab, setShowInNewTab] = useState<boolean>(false);
    const [selection, setSelection] = useState<Range | null>(null);

    const handleInsertLink = () => {
        if (selection) {
            Transforms.select(editor, selection);
            insertLink(editor, { url, showInNewTab });
            setUrl('');
            setShowInput(prev => !prev);
            setShowInNewTab(false);
        }
    };

    const toggleLink = () => {
        setSelection(editor.selection);
        setShowInput(prev => !prev);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'checkbox') {
            setShowInNewTab(prev => !prev);
        } else {
            setUrl(event.target.value);
        }
    };

    return (
        <div ref={linkInputRef} className="popup-wrapper">
            <Button
                className={showInput ? 'clicked' : ''}
                active={isBlockActive(editor, 'link')}
                format="link"
                onClick={toggleLink}
            >
                <Icon icon="link" />
            </Button>
            {showInput && (
                <div className="popup">
                    <div style={{ display: 'flex', gap: '4px', margin: '5px 2px' }}>
                        <input
                            type="text"
                            placeholder="https://google.com"
                            value={url}
                            onChange={handleInputChange}
                        />
                        <div onClick={handleInsertLink}>
                            <Icon icon="add" />
                        </div>
                    </div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showInNewTab}
                            onChange={handleInputChange}
                        />
                        <span style={{ fontSize: '0.8em' }}>Open in new tab</span>
                    </label>
                </div>
            )}
        </div>
    );
};

export default LinkButton;
