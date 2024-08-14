import { useEffect, useState } from 'react';
import { Editor, Element, BaseElement } from 'slate';

// Extend BaseElement to include a `type` property.
interface CustomElement extends BaseElement {
    type: string;
    // Add any other custom properties your elements might have
}

const useFormat = (editor: Editor, format: string): boolean => {
    const [isFormat, setIsFormat] = useState(false);

    useEffect(() => {
        if (editor.selection) {
            // It matches at the editor.selection location by default, so if null handle it separately.
            const [node] = Editor.nodes<CustomElement>(editor, {
                match: n => !Editor.isEditor(n) && Element.isElement(n) && (n as CustomElement).type === format,
            });

            setIsFormat(!!node);
        } else {
            setIsFormat(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor.selection]);

    return isFormat;
};

export default useFormat;
