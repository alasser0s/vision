import { useState } from 'react';
import { Modal } from './modal';
import { Editor } from '@tiptap/react'; // Import the correct type for the editor

interface AddlinksProps {
  editor: Editor;
}
// Component to add hyperlink to the selected text
export const AddHyperlink:React.FC<AddlinksProps> = ({ editor }) => {
	const [showModal, setShowModal] = useState(false);

	//sets the hyperlink to the text
	const setLink = (linkInput :string) => {
		if (linkInput) {
			editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href: linkInput })
				.run();
		}
		setShowModal(false);
	};

	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className={
					editor.isActive('link')
						? 'btn btn-primary-black'
						: 'btn btn-primary-inactive'
				}>
				<i className='fas fa-link'></i>
			</button>

			{editor.isActive('link') && (
				<button
					className='btn btn-primary-black'
					onClick={() => editor.chain().focus().unsetLink().run()}>
					<i className='fas fa-unlink'></i>
				</button>
			)}

			{/* Modal to enter hyperlink */}
			{showModal && (
				<Modal
					cancelOperationHandler={() => setShowModal(false)}
					proceedOperationHandler={setLink}
					inputLabel='Enter hyperlink here'
				/>
			)}
		</>
	);
};
