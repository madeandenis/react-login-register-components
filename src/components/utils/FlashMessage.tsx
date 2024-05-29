import React, { useState, useEffect } from 'react';
import './FlashMessage.css';

interface FlashMessageProps {
    type: 'success' | 'error';
    message: string;
    duration?: number;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ type, message, duration = 3000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        // Cleans up the timer if the component unmounts before the timer completes, preventing potential memory leaks
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className={`flash-message ${type}`}>
            {type === 'error' && (
                <div className='flash-message-error'>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <span>Error</span>
                </div>
            )}
            {type === 'success' && (
                <div className='flash-message-success'>
                    <i className="fa-regular fa-circle-check"></i>
                    <span>Success</span>
                </div>
            )}
            <span className='flash-message-message'>{message}</span>
        </div>
    );
}


export default FlashMessage;