import { Editor, Transforms, Element as SlateElement, BaseElement } from 'slate';

interface CustomElement extends BaseElement {
    type: string;
    children: any[];
}

const alignment = ['alignLeft', 'alignRight', 'alignCenter'];
const list_types = ['orderedList', 'unorderedList'];

export const sizeMap = {
    small: '0.75em',
    normal: '1em',
    medium: '1.75em',
    huge: '2.5em',
};

export const fontFamilyMap = {
    sans: 'Helvetica, Arial, sans-serif',
    serif: 'Georgia, Times New Roman, serif',
    monospace: 'Monaco, Courier New, monospace',
};

// Typing the marks object explicitly
type MarkType = Record<string, any> | null;

export const toggleBlock = (editor: Editor, format: string): void => {
    const isActive = isBlockActive(editor, format);
    const isList = list_types.includes(format);
    const isIndent = alignment.includes(format);
    const isAligned = alignment.some(alignmentType => isBlockActive(editor, alignmentType));

    if (isAligned && isIndent) {
        Transforms.unwrapNodes(editor, {
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                alignment.includes((n as CustomElement).type),
            split: true,
        });
    }

    if (isIndent) {
        Transforms.wrapNodes(editor, {
            type: format,
            children: [],
        } as CustomElement);
        return;
    }

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            list_types.includes((n as CustomElement).type),
        split: true,
    });

    Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    } as Partial<CustomElement>);

    if (isList && !isActive) {
        Transforms.wrapNodes(editor, {
            type: format,
            children: [],
        } as CustomElement);
    }
};

export const addMarkData = (editor: Editor, data: { format: string; value: any }): void => {
    Editor.addMark(editor, data.format, data.value);
};

export const toggleMark = (editor: Editor, format: string): void => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export const isMarkActive = (editor: Editor, format: string): boolean => {
    const marks = Editor.marks(editor) as MarkType;
    return marks ? marks[format] === true : false;
};

export const isBlockActive = (editor: Editor, format: string): boolean => {
    const [match] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            (n as CustomElement).type === format,
    });

    return !!match;
};

export const activeMark = (editor: Editor, format: string) => {
    const defaultMarkData = {
        color: 'black',
        bgColor: 'black',
        fontSize: 'normal',
        fontFamily: 'sans',
    };
    const marks = Editor.marks(editor) as MarkType;
    const defaultValue = defaultMarkData[format];
    return marks?.[format] ?? defaultValue;
};
