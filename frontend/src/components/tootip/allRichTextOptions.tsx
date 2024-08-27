import { AddTextStyles } from './AddTextStyles';
import { AddHyperlink } from './addHyberlink';
import { AddImage } from './addImage';

//Component wrapping all the Rich text editing options in single Componnet
export const AllRichTextOptions = ({ editor }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className='rich-text-options-wrapper'>
			<AddTextStyles editor={editor} />
			<AddHyperlink editor={editor} />
			<AddImage editor={editor} />
		</div>
	);
};
