import React, { useRef, useState } from 'react';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import usePopup from '../../utils/customHooks/usePopup';
import { insertEquation } from '../../utils/equation';
import { Transforms, Range } from 'slate';
import { ReactEditor } from 'slate-react';

interface EquationButtonProps {
    editor: ReactEditor;
}

const EquationButton: React.FC<EquationButtonProps> = ({ editor }) => {
    const equationInputRef = useRef<HTMLDivElement>(null);
    const [showInput, setShowInput] = usePopup(equationInputRef);
    const [math, setMath] = useState('');
    const [displayInline, setDisplayInline] = useState(false);
    const [selection, setSelection] = useState<Range | null>(null);

    const toggleButton = () => {
        setShowInput((prev:any) => !prev);
        setDisplayInline(false);
        setSelection(editor.selection);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if (target.type === 'checkbox') {
            setDisplayInline(prev => !prev);
        } else {
            setMath(target.value);
        }
    };

    const handleAddEquation = () => {
        if (!math) return;
        if (selection) {
            Transforms.select(editor, selection);
        }
        insertEquation(editor, math, displayInline);
        setShowInput(false);
    };

    return (
        <div ref={equationInputRef} className='popup-wrapper'>
            <Button format='equation' onClick={toggleButton}>
            </Button>
            {showInput && (
                <div className='popup'>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <input
                            type='text'
                            value={math}
                            onChange={handleInputChange}
                            placeholder='Enter formula'
                        />
                        <div onClick={handleAddEquation}>
                            <Icon icon='add' />
                        </div>
                    </div>
                    <label>
                        <input
                            type='checkbox'
                            checked={displayInline}
                            onChange={handleInputChange}
                        />
                        Inline Equation
                    </label>
                </div>
            )}
        </div>
    );
};

export default EquationButton;
