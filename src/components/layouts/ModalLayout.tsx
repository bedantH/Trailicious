import React, { useEffect, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById("modal") as HTMLElement;

interface ModalProps {
    children?: ReactNode;
}

export default function ModalLayout({ children }: ModalProps) {
    const el = useRef(document.createElement('div'));

    useEffect(() => {
        const current = el.current;

        modalRoot!.appendChild(current);
        return () => void modalRoot!.removeChild(current);
    }, []);

    return createPortal(children, el.current);
}