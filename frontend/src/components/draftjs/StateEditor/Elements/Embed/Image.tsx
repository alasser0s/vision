import React from 'react';
import { useSelected, useFocused } from 'slate-react';
import './Image.css';
import Icon from '../../common/Icon';
import useResize from '../../utils/customHooks/useResize';
interface ImageElement {
  url: string;
  width: string | number;
  height: string | number;
  alt?: string;
  attr?: React.HTMLAttributes<HTMLDivElement>;
}

interface ImageProps {
  attributes: React.HTMLAttributes<HTMLDivElement>;
  element: ImageElement;
  children: React.ReactNode;
}

const Image: React.FC<ImageProps> = ({ attributes, element, children }) => {
  const { url,  alt } = element;
  const selected = useSelected();
  const focused = useFocused();
  const [size,onMouseDown] = useResize();

  return (
    <div
      {...attributes}
      className="element-image"
      style={{
        display: 'flex',
        boxShadow: selected && focused ? '0 0 3px 3px lightgray' : undefined,
        ...element.attr?.style,
      }}
    >
      <div contentEditable={false} style={{width:`${size.width}px`,height:`${size.height}px`}} >
        <img alt={alt} src={url}  />
        {
          selected && 
          <button onMouseDown={onMouseDown} style={{width:'15px',height:'15px',opacity:1,background:'transparent'}}><Icon icon='resize'/></button>
        }
      </div>
      {children}
    </div>
  );
};

export default Image;
