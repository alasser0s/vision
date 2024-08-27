import React, { useState } from 'react';

interface ModalProps {
  cancelOperationHandler: () => void;
  proceedOperationHandler: (inputText: string) => void;
  inputLabel: string;
}

export const Modal: React.FC<ModalProps> = ({
  cancelOperationHandler,
  proceedOperationHandler,
  inputLabel,
}) => {
  const [inputText, setInputText] = useState<string>('');

  return (
    <div className="modal">
      <div className="modal-content">
        <label className="link-input-label">{inputLabel}</label>
        <br />
        <input
          className="link-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <br />
        <button
          className="btn btn-primary-black"
          onClick={() => proceedOperationHandler(inputText)}
        >
          Add
        </button>
        <button
          className="btn btn-primary-inactive"
          onClick={() => {
            setInputText('');
            cancelOperationHandler();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
