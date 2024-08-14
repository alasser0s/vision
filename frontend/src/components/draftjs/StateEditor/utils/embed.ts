import { Transforms, Editor } from 'slate';
import { createParagraph } from './paragraph';

interface EmbedData {
  url: string;
  alt: string;
}

export const createEmbedNode = (type: string, { url, alt }: EmbedData) => ({
  type,
  alt,
  url,
  children: [{ text: "" }]
});

export const insertEmbed = (editor: Editor, embedData: EmbedData, format: string) => {
  const { url } = embedData;
  if (!url) return;
  const embed = createEmbedNode(format, embedData);

  Transforms.insertNodes(editor, embed, { select: true });
  Transforms.insertNodes(editor, createParagraph(""));
};
