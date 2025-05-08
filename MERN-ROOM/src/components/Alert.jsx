import React, { useEffect, useState } from 'react';

function AlertMessage({ type, message, onClose, autoClose = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const getAlertClass = () => {
    const baseClasses = 'p-4 rounded-lg shadow-lg flex justify-between items-center transform transition-all duration-300';
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-100 border-l-4 border-green-500 text-green-700`;
      case 'error':
        return `${baseClasses} bg-red-100 border-l-4 border-red-500 text-red-700`;
      case 'info':
        return `${baseClasses} bg-blue-100 border-l-4 border-blue-500 text-blue-700`;
      case 'warning':
        return `${baseClasses} bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700`;
      default:
        return `${baseClasses} bg-gray-100 border-l-4 border-gray-500 text-gray-700`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
    }
  };

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      
      if (autoClose) {
        const timer = setTimeout(() => {
          startExitAnimation();
        }, autoClose);
        return () => clearTimeout(timer);
      }
    }
  }, [message, autoClose]);

  const startExitAnimation = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      onClose();
    }, 300); // Match this with the CSS transition duration
  };

  const handleClose = () => {
    startExitAnimation();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-10 z-50 pointer-events-none">
      <div 
        className={`${getAlertClass()} max-w-md w-full pointer-events-auto ${
          isExiting ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'
        }`}
        role="alert"
      >
        <div className="flex items-center">
          {getIcon()}
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AlertMessage;