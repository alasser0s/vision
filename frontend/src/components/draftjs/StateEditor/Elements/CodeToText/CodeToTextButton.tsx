import React from 'react';
import Button from '../../common/Button';
import Icon from '../../common/Icon';

interface CodeToTextButtonProps {
    handleButtonClick: (state: Partial<{ showInput: boolean; action: string }>) => void;
}

const CodeToTextButton: React.FC<CodeToTextButtonProps> = ({ handleButtonClick }) => {
    return (
        <>
            <Button format="insert Html" onClick={() => handleButtonClick({ showInput: true, action: 'insert' })}>
                <Icon icon="insertHtml" />
            </Button>
        </>
    );
};

export default CodeToTextButton;
