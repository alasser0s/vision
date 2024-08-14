import { useState, useEffect, RefObject } from 'react';

// This hook returns whether the click was inside the popup ref or outside it.
function usePopup(popupRef: RefObject<HTMLElement>): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            const clickedComponent = e.target as HTMLElement;
            if (popupRef.current && !popupRef.current.contains(clickedComponent)) {
                setShowPopup(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [popupRef]);

    return [showPopup, setShowPopup];
}

export default usePopup;
