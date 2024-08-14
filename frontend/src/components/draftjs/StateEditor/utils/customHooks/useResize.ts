import { useState } from 'react';

interface Size {
    width: number;
    height: number;
}

const useResize = (): [Size, () => void, boolean] => {
    const [size, setSize] = useState<Size>({ width: 300, height: 300 });
    const [resizing, setResizing] = useState(false);

    const onMouseDown = () => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        setResizing(true);
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        setResizing(false);
    };

    const onMouseMove = (e: MouseEvent) => {
        setSize(currentSize => ({
            width: currentSize.width + e.movementX,
            height: currentSize.height + e.movementY,
        }));
    };

    return [size, onMouseDown, resizing];
};

export default useResize;
