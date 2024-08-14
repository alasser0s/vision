export const createParagraph = (text: string) => ({
    type: 'paragraph',
    children: [{ text }],
});
