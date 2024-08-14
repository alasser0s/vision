import { Transforms, Range, Editor } from "slate";

interface EquationNode {
    type: 'equation';
    inline: boolean;
    math: string;
    children: { text: string }[];
}

const createEquationNode = (math: string, inline: boolean): EquationNode => ({
    type: 'equation',
    inline,
    math,
    children: [{ text: '' }]
});

export const insertEquation = (editor: Editor, math: string, inline: boolean) => {
    const equation = createEquationNode(math, inline);

    const { selection } = editor;
    if (!!selection) {
        if (Range.isExpanded(selection)) {
            Transforms.collapse(editor, { edge: 'end' });
        }

        Transforms.insertNodes(editor, equation, { select: true });
    }
};
