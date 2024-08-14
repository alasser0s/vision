import React from 'react';
import { RenderElementProps } from 'slate-react';
import { InlineMath, BlockMath } from 'react-katex';
import { BaseElement } from 'slate';
import './styles.css';

interface EquationElement extends BaseElement {
    type: 'equation';
    inline: boolean;
    math: string;
    attr?: Record<string, any>;
}

const Equation: React.FC<RenderElementProps> = ({ attributes, element, children }) => {
    const equationElement = element as EquationElement;
    const { inline, math } = equationElement;

    return (
        <div className={inline ? 'equation-inline' : ''}>
            <span {...attributes} {...equationElement.attr}>
                <span contentEditable={false}>
                    {inline ? <InlineMath math={math} /> : <BlockMath math={math} />}
                </span>
                {children}
            </span>
        </div>
    );
};

export default Equation;
