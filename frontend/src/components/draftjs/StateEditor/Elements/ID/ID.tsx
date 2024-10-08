import { Range, Editor, Transforms } from 'slate';
import React, { useRef, useState } from 'react';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import usePopup from '../../utils/customHooks/usePopup';
import { ReactEditor } from 'slate-react';

interface IdProps {
    editor: ReactEditor;
}

const Id: React.FC<IdProps> = ({ editor }) => {
    const idInputRef = useRef<HTMLDivElement>(null);
    const [showInput, setShowInput] = usePopup(idInputRef);
    const [selection, setSelection] = useState<Range | null>(null);
    const [id, setId] = useState('');

    const toggleId = () => {
        setSelection(editor.selection);
        setShowInput((prev:Boolean) => !prev);
    };

    const handleId = () => {
        if (!selection || !id) return;
        
        Transforms.setNodes(
            editor,
            { attr: { id } },
            { at: selection }
        );
        
        setShowInput(false);
        setId('');
    };

    return (
        <div className="popup-wrapper" ref={idInputRef}>
            <Button className={showInput ? 'clicked' : ''} format={'add Id'} onClick={toggleId}>
                <Icon icon="addId" />
            </Button>
            {showInput && (
                <div className="popup" style={{ display: 'flex', gap: '4px' }}>
                    <input
                        type="text"
                        placeholder="Enter a unique ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <div onClick={handleId}>
                        <Icon icon="add" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Id;
