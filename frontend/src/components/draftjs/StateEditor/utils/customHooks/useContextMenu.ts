import { useState, useEffect } from 'react';
import { Editor, Range } from 'slate';
import useFormat from './useFormat';

interface MenuLocation {
    top: string;
    left: string;
}

const useContextMenu = (
    editor: Editor,
    format: string,
    setSelection: (selection: Range | null) => void
): [boolean, MenuLocation] => {
    const isFormat = useFormat(editor, format);
    const [showMenu, setShowMenu] = useState(false);
    const [menuLocation, setMenuLocation] = useState<MenuLocation>({
        top: '0px',
        left: '0px',
    });

    const handleClick = () => {
        setShowMenu(false);
    };

    const handleContextMenu = (e: MouseEvent) => {
        if (!isFormat) return;
        setSelection(editor.selection);
        e.preventDefault();
        setShowMenu(true);
        const xPos = `${e.pageX}px`;
        const yPos = `${e.pageY}px`;
        setMenuLocation({
            top: yPos,
            left: xPos,
        });
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [isFormat]);

    return [showMenu, menuLocation];
};

export default useContextMenu;
