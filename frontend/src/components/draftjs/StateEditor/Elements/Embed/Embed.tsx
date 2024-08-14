import React, { useRef, useState } from 'react';
import Button from '../../common/Button';
import Icon, { IconName } from '../../common/Icon';
import { isBlockActive } from '../../utils/StateUtilityFunctions';
import usePopup from '../../utils/customHooks/usePopup';
import { insertEmbed } from '../../utils/embed';
import { Transforms, Range } from 'slate';
import { ReactEditor } from 'slate-react';

import './Embed.css';

interface EmbedProps {
    editor: ReactEditor;
    format: IconName;
}

const Embed: React.FC<EmbedProps> = ({ editor, format }) => {
    const urlInputRef = useRef<HTMLDivElement>(null);
    const [showInput, setShowInput] = usePopup(urlInputRef);
    const [formData, setFormData] = useState({ url: '', alt: '', width: '', height: '' });
    const [selection, setSelection] = useState<Range | null>(null);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelection(editor.selection);
        ReactEditor.focus(editor);
        setShowInput(prev => !prev);
    };

    const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selection) {
            Transforms.select(editor, selection);
            ReactEditor.focus(editor);
            insertEmbed(editor, { ...formData }, format);
            setShowInput(false);
            setFormData({ url: '', alt: '', width: '', height: '' });
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const url = reader.result as string;
                setFormData(prev => ({ ...prev, url }));
                // Automatically submit after loading the image
                if (selection) {
                    Transforms.select(editor, selection);
                    ReactEditor.focus(editor);
                    insertEmbed(editor, { ...formData, url }, format);
                    setShowInput(false);
                    setFormData({ url: '', alt: '', width: '', height: '' });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div ref={urlInputRef} className='popup-wrapper'>
            <Button
                active={isBlockActive(editor, format)}
                style={{
                    border: showInput ? '1px solid lightgray' : '',
                    borderBottom: 'none',
                }}
                format={format}
                onClick={handleButtonClick}
            >
                <Icon icon={format} />
            </Button>
            {showInput && (
                <div className='popup'>
                    {format === 'image' && (
                        <div>
                            <div className='flex '>
                                <Icon icon='upload' />
                                <input type='file' accept="image/*" onChange={handleImageUpload} />
                            </div>
                            <p style={{ textAlign: 'center', opacity: '0.7', width: '100%' }}>OR</p>
                        </div>
                    )}
                    <div onSubmit={handleFormSubmit}>
                        <input
                            type='text'
                            placeholder='Enter url'
                            value={formData.url}
                            onChange={e =>
                                setFormData(prev => ({
                                    ...prev,
                                    url: e.target.value,
                                }))
                            }
                        />
                        <input
                            type='text'
                            placeholder='Enter alt'
                            value={formData.alt}
                            onChange={e =>
                                setFormData(prev => ({
                                    ...prev,
                                    alt: e.target.value,
                                }))
                            }
                        />
                        <input
                            type='text'
                            placeholder='Enter width'
                            value={formData.width}
                            onChange={e =>
                                setFormData(prev => ({
                                    ...prev,
                                    width: e.target.value,
                                }))
                            }
                        />
                        <input
                            type='text'
                            placeholder='Enter height'
                            value={formData.height}
                            onChange={e =>
                                setFormData(prev => ({
                                    ...prev,
                                    height: e.target.value,
                                }))
                            }
                        />
                        <Button type="button" onClick={handleFormSubmit}>Save</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Embed;
