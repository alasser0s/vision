import React from 'react';
import { RenderElementProps } from 'slate-react';

const Table: React.FC<RenderElementProps> = ({ attributes, children }) => {
    return (
        <table>
            <tbody {...attributes}>
                {children}
            </tbody>
        </table>
    );
};

export default Table;
