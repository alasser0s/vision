import React, { useEffect, useRef } from 'react';
import './CodeToText.css';
import Icon from '../../common/Icon';
import { Interweave } from 'interweave';
import { Node, Transforms, Path } from 'slate';  
import { useSlateStatic } from 'slate-react';

interface HtmlNode extends Node {
    type: any;
    html: string;
    children: Node[];
}

interface CodeToTextProps {
    html: string;
    action: string;
    location: Path;  
    handleCodeToText: (state: { showInput?: boolean; html?: string }) => void;
}

const CodeToText: React.FC<CodeToTextProps> = ({ html, action, location, handleCodeToText }) => {
    const codeToTextRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const editor = useSlateStatic();

    const checkClick = (e: MouseEvent) => {
        const clickedComponent = e.target as HTMLElement;
        if (
            wrapperRef.current?.contains(clickedComponent) &&
            !codeToTextRef.current?.contains(clickedComponent)
        ) {
            const partialState: { showInput?: boolean; html?: string } = {
                showInput: false,
            };
            if (html) {
                partialState.html = action === 'update' ? '' : html;
            }
            handleCodeToText(partialState);
        }
    };

    useEffect(() => {
        document.addEventListener('click', checkClick);
        return () => {
            document.removeEventListener('click', checkClick);
        };
    }, [checkClick]);

    const codeOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleCodeToText({ html: e.target.value });
    };

    const addHtml = () => {
        if (html) {
            if (action === 'update') {
                Transforms.setNodes<HtmlNode>(editor, { type: 'htmlCode', html }, { at: location });
            } else {
                Transforms.insertNodes<HtmlNode>(
                    editor,
                    {
                        type: 'htmlCode',
                        html,
                        children: [{ text: '' }],
                    }as Node,
                    {
                        select: true,
                    }
                );
                Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] } as Node);
            }
        }
        handleCodeToText({ showInput: false, html: '' });
    };

    const clearHtml = () => {
        handleCodeToText({ html: '' });
    };

    return (
        <div className="code-wrapper" ref={wrapperRef}>
            <div ref={codeToTextRef} className="codeToTextWrapper">
                <div className="codeToText">
                    <textarea
                        value={html}
                        onChange={codeOnChange}
                        placeholder="Write html here..."
                    ></textarea>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Icon icon="arrowRight" />
                    </div>
                    <div className="textOutput">
                        <Interweave content={html} />
                    </div>
                </div>
                <div>
                    <button onClick={addHtml} className="done">
                        Done
                    </button>
                    <button className="clear" onClick={clearHtml}>
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeToText;
