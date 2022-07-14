import React from 'react'
import ToastLayout from './layouts/ToastLayout';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    text: String;
}

export default function Toast({ text }: Props) {
    return (
        <ToastLayout>
            <div className='toast__wrapper'>
                <div className='wrapper__main'>
                    <p className="toast_text">
                        {text}
                    </p>
                    <button className="close_btn">
                        <CloseIcon fontSize='large' />
                    </button>
                </div>
            </div>
        </ToastLayout>
    )
}
