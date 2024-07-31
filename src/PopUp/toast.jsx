import React, { useEffect } from 'react';
import '../css/toast.css';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <div className="toast-content">
        <span className="toast-icon">✔️</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
};

export default Toast;