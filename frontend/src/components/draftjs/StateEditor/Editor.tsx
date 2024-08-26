import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { BaseEditor, createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { Toolbar } from './Toolbar/Toolbar';
import { sizeMap, fontFamilyMap } from './utils/StateUtilityFunctions';
import withLinks from './plugins/WithLinks';
import withTables from './plugins/WithTable';
import withEmbeds from './plugins/WithEmbeds';
import withEquation from './plugins/WithEquation';
import './Editor.css';
import Link from './Elements/Link/Link';
import Image from './Elements/Embed/Image';
import Video from './Elements/Embed/Video';
import Equation from './Elements/Equation/Equation';
import { debounce } from 'lodash';

// Define the custom editor type
type CustomEditor = BaseEditor & ReactEditor;
interface CustomElement extends Descendant {
    type: string;
    children: any[];
}

interface SlateEditorProps {
    value?: Descendant[]; // New prop to accept value from parent
    onChange?: (value: Descendant[]) => void;
}

const Element = (props: any) => {
    const { attributes, children, element } = props;

    switch (element.type) {
        case 'headingOne':
            return <h1 {...attributes} {...element.attr}>{children}</h1>;
        case 'headingTwo':
            return <h2 {...attributes} {...element.attr}>{children}</h2>;
        case 'headingThree':
            return <h3 {...attributes} {...element.attr}>{children}</h3>;
        case 'blockquote':
            return <blockquote {...attributes} {...element.attr}>{children}</blockquote>;
        case 'alignLeft':
            return <div style={{ listStylePosition: 'inside' }} {...attributes} {...element.attr}>{children}</div>;
        case 'alignCenter':
            return <div style={{ display: 'flex', justifyContent: 'center', listStylePosition: 'inside' }} {...attributes} {...element.attr}>{children}</div>;
        case 'alignRight':
            return <div style={{ display: 'flex', justifyContent: 'flex-end', listStylePosition: 'inside' }} {...attributes} {...element.attr}>{children}</div>;
        case 'list-item':
            return <li {...attributes} {...element.attr}>{children}</li>;
        case 'orderedList':
            return <ol type='1' {...attributes}>{children}</ol>;
        case 'unorderedList':
            return <ul {...attributes}>{children}</ul>;
        case 'link':
            return <Link {...props} />;
        case 'table':
            return <table><tbody {...attributes}>{children}</tbody></table>;
        case 'table-row':
            return <tr {...attributes}>{children}</tr>;
        case 'table-cell':
            return <td {...element.attr} {...attributes}>{children}</td>;
        case 'image':
            return <Image {...props} />;
        case 'video':
            return <Video {...props} />;
        case 'equation':
            return <Equation {...props} />;
        default:
            return <div {...element.attr} {...attributes}>{children}</div>;
    }
};

const Leaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.strikethrough) {
        children = <span style={{ textDecoration: 'line-through' }}>{children}</span>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    if (leaf.superscript) {
        children = <sup>{children}</sup>;
    }

    if (leaf.subscript) {
        children = <sub>{children}</sub>;
    }

    if (leaf.color) {
        children = <span style={{ color: leaf.color }}>{children}</span>;
    }

    if (leaf.bgColor) {
        children = <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>;
    }

    if (leaf.fontSize) {
        const size = sizeMap[leaf.fontSize as keyof typeof sizeMap];
        children = <span style={{ fontSize: size }}>{children}</span>;
    }

    if (leaf.fontFamily) {
        const family = fontFamilyMap[leaf.fontFamily as keyof typeof fontFamilyMap];
        children = <span style={{ fontFamily: family }}>{children}</span>;
    }

    return <span {...attributes}>{children}</span>;
};

const SlateEditor: React.FC<SlateEditorProps> = ({ value: externalValue, onChange }) => {
    const editor = useMemo(() => withEquation(withHistory(withEmbeds(withTables(withLinks(withReact(createEditor() as CustomEditor)))))), []);

    const initialValue: Descendant[] = [
        {
            type: 'paragraph',
            children: [{ text: 'First line of text in Slate JS.' }],
        } as CustomElement,
    ];

    const [value, setValue] = useState<Descendant[]>(externalValue || initialValue);

    // Sync external value with internal state
    useEffect(() => {
        if (externalValue) {
            setValue(externalValue);
        }
    }, [externalValue]);
    console.log("Current Editor Value:", value);

    const renderElement = useCallback((props: any) => <Element {...props} />, []);
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

    const handleChange = debounce((newValue: Descendant[]) => {
        setValue(newValue);
        console.log("Editor Content:", newValue);
        if (onChange) {
            onChange(newValue);
        }
    }, 300); // Adjust debounce time as needed

    const handleCodeToText = () => {
        console.log('Code to Text conversion');
    };

    return (
        <Slate editor={editor as ReactEditor} initialValue={value} onChange={handleChange}>
            <Toolbar handleCodeToText={handleCodeToText} />
            <div className="editor-wrapper" style={{ border: '1px solid #f3f3f3', padding: '0 10px' }}>
                <Editable
                    placeholder="Write something"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    required
                    className='w-[1000px]'
                />
            </div>
        </Slate>
    );
};

export default SlateEditor;
