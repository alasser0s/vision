import { Editor, Element } from 'slate';

interface ExtendedElement extends Element {
    type: any;
    inline?: boolean;
}

const withEquation = (editor: Editor) => {
    const { isInline } = editor;

    editor.isInline = (element: Element) => {
        const extendedElement = element as ExtendedElement;
        return extendedElement.type === 'equation' && extendedElement.inline ? true : isInline(element);
    };

    return editor;
}

export default withEquation;
