import React, { useRef, useState } from 'react';
import { MdFormatColorText, MdFormatColorFill, MdCheck } from 'react-icons/md';
import './ColorPicker.css';
import { colors } from './defaultColors';
import { addMarkData, activeMark } from '../../utils/StateUtilityFunctions';
import { Transforms } from 'slate';
import usePopup from '../../utils/customHooks/usePopup';
import { ReactEditor, BaseSelection } from 'slate-react';

interface ColorPickerProps {
    format: 'color' | 'bgColor';
    editor: ReactEditor;
}

const logo = {
    color: <MdFormatColorText size={20} />,
    bgColor: <MdFormatColorFill size={20} />,
};

const ColorPicker: React.FC<ColorPickerProps> = ({ format, editor }) => {
    const [selection, setSelection] = useState<BaseSelection | null>(null);
    const [hexValue, setHexValue] = useState<string>('');
    const [validHex, setValidHex] = useState<boolean | undefined>(undefined);
    const colorPickerRef = useRef<HTMLDivElement>(null);
    const [showOptions, setShowOptions] = usePopup(colorPickerRef);

    const isValidHexSix = /^#[0-9A-Fa-f]{6}$/;
    const isValidHexThree = /^#[0-9A-Fa-f]{3}$/;

    const changeColor = (e: React.MouseEvent<HTMLDivElement>) => {
        const clickedColor = e.currentTarget.getAttribute('data-value')!;
        if (selection) {
            Transforms.select(editor, selection);
            ReactEditor.focus(editor);
            addMarkData(editor, { format, value: clickedColor });
            setShowOptions(false);
        }
    };

    const toggleOption = () => {
        const currentSelection = editor.selection;
        if (currentSelection) {
            setSelection(currentSelection);
            ReactEditor.focus(editor);
        }
        setShowOptions((prev:Boolean) => !prev);
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validHex || !selection) return;

        Transforms.select(editor, selection);
        addMarkData(editor, { format, value: hexValue });
        setShowOptions(false);
        setValidHex(undefined);
        setHexValue('');
        ReactEditor.focus(editor);
    };

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHex = e.target.value;
        setValidHex(isValidHexSix.test(newHex) || isValidHexThree.test(newHex));
        setHexValue(newHex);
    };

    return (
        <div className='color-picker popup-wrapper' ref={colorPickerRef}>
            <button
                style={{
                    color: showOptions ? 'black' : activeMark(editor, format),
                    opacity: '1',
                }}
                className={showOptions ? 'clicked' : ''}
                onClick={toggleOption}
            >
                {logo[format]}
            </button>
            {showOptions && (
                <div className='popup'>
                    <div className='color-options'>
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                data-value={color}
                                onClick={changeColor}
                                className='option'
                                style={{ background: color }}
                            />
                        ))}
                    </div>
                    <p style={{ textAlign: 'center', opacity: '0.7', width: '100%' }}>OR</p>
                    <form onSubmit={handleFormSubmit}>
                        <div
                            className='hexPreview'
                            style={{ background: validHex ? hexValue : '#000000' }}
                        ></div>
                        <input
                            type='text'
                            placeholder='#000000'
                            value={hexValue}
                            onChange={handleHexChange}
                            style={{
                                border: validHex === false ? '1px solid red' : '1px solid lightgray',
                            }}
                        />
                        <button style={{ color: validHex ? 'green' : '' }} type='submit'>
                            <MdCheck size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
