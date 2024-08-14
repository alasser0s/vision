import React from 'react';
import { useSelected, useFocused } from 'slate-react';
import Icon from '../../common/Icon';
import useResize from '../../utils/customHooks/useResize';

interface VideoProps {
    attributes: any;
    element: {
        url: string;
        alt: string;
        attr?: Record<string, any>;
    };
    children: React.ReactNode;
}

const Video: React.FC<VideoProps> = ({ attributes, element, children }) => {
    const { url, alt, attr } = element;
    const [size, onMouseDown, resizing] = useResize();
    const selected = useSelected();
    const focused = useFocused();

    return (
        <div
            {...attributes}
            className="embed"
            style={{
                display: 'flex',
                boxShadow: selected && focused ? '0 0 3px 3px lightgray' : undefined,
            }}
            {...attr}
        >
            <div contentEditable={false} style={{ width: `${size.width}px`, height: `${size.height}px` }}>
                {resizing ? (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            border: '2px dashed black',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Icon icon="videoPlayer" />
                    </div>
                ) : (
                    <iframe src={url} frameBorder="0" title={alt} />
                )}

                {selected && (
                    <button
                        onMouseDown={onMouseDown}
                        style={{ width: '15px', height: '15px', opacity: 1, background: 'transparent' }}
                    >
                        <Icon icon="resize" />
                    </button>
                )}
            </div>
            {children}
        </div>
    );
};

export default Video;
