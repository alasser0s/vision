import React from 'react';
import { useFocused, useSelected, useSlateStatic } from 'slate-react';
import { RenderElementProps } from 'slate-react';
import { removeLink } from '../../utils/link';
import unlink from '../../Toolbar/toolbarIcons/unlink.svg';
import './styles.css';

interface LinkElement extends RenderElementProps {
    element: {
        href: string;
        target?: string;
        attr?: Record<string, any>;
        children: any;
    };
}

const Link: React.FC<LinkElement> = ({ attributes, element, children }) => {
    const editor = useSlateStatic();
    const selected = useSelected();
    const focused = useFocused();

    return (
        <div className='link'>
            <a href={element.href} {...attributes} {...element.attr} target={element.target}>
                {children}
            </a>
            {selected && focused && (
                <div className='link-popup' contentEditable={false}>
                    <a href={element.href} target={element.target}>
                        {element.href}
                    </a>
                    <button onClick={() => removeLink(editor)}>
                        <img src={unlink} alt="" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Link;
