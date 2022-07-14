import React, { useEffect, useRef, ReactNode } from 'react'
import { createPortal } from 'react-dom';

const toastRoot = document.getElementById("toast") as HTMLElement;

interface ToastProps {
    children?: ReactNode;
}

export default function ToastLayout({ children }: ToastProps) {
    const el = useRef(document.createElement('div'));

    useEffect(() => {
        const current = el.current;

        toastRoot!.appendChild(current);
        return () => void toastRoot!.removeChild(current);
    }, []);

    return createPortal(children, el.current);
}