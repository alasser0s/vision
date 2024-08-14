import React from "react";
import formats from './ToolbarOptions.js';

interface FormatData {
    className: string;
    options?: string[];
    value?: string;
}

const renderOptions = (formatData: FormatData) => {
    const { className, options } = formatData;
    return (
        <select className={className}>
            <option value="" selected={true}></option>
            {options && options.map((value, index) => (
                <option key={index} value={value}>{value}</option>
            ))}
        </select>
    );
};

const renderSingle = (formatData: FormatData) => {
    const { className, value } = formatData;
    return (
        <button className={className} value={value}>{value}</button>
    );
};

const CustomToolbar: React.FC = () => (
    <div id="toolbar">
        {formats.map((classes, index) => (
            <span key={index} className="ql-formats">
                {classes.map((formatData: FormatData, index) => (
                    formatData.options ? renderOptions(formatData) : renderSingle(formatData)
                ))}
            </span>
        ))}
    </div>
);

export default CustomToolbar;
