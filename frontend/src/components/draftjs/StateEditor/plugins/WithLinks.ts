import { Editor, Element } from 'slate';

interface ExtendedElement extends Element {
    type: any;
}

const withLinks = (editor: Editor) => {
    const { isInline } = editor;

    editor.isInline = (element: Element) => {
        const extendedElement = element as ExtendedElement;
        return extendedElement.type === 'link' ? true : isInline(element);
    };

    return editor;
}

export default withLinks;
