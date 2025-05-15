import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function AlertMessage({ type = 'info', message, onClose, autoClose = 3000, position = 'top-center' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  // Alert type configurations
  const alertConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      progress: 'bg-green-400',
      icon: (
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      )
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      progress: 'bg-red-400',
      icon: (
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      )
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      progress: 'bg-blue-400',
      icon: (
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
      )
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      progress: 'bg-yellow-400',
      icon: (
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      )
    }
  };

  // Position classes
  const positionClasses = {
    'top-center': 'items-start justify-center pt-10',
    'top-right': 'items-start justify-end pt-10 pr-4',
    'top-left': 'items-start justify-start pt-10 pl-4',
    'bottom-center': 'items-end justify-center pb-10',
    'bottom-right': 'items-end justify-end pb-10 pr-4',
    'bottom-left': 'items-end justify-start pb-10 pl-4'
  };

  const getAlertClass = () => {
    const config = alertConfig[type] || alertConfig.info;
    return `p-4 rounded-lg shadow-xl flex justify-between items-center relative overflow-hidden ${config.bg} ${config.border} ${config.text}`;
  };

  const getIcon = () => {
    const config = alertConfig[type] || alertConfig.info;
    return (
      <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        {config.icon}
      </svg>
    );
  };

  const getProgressColor = () => {
    const config = alertConfig[type] || alertConfig.info;
    return config.progress;
  };

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setProgress(100);
      
      if (autoClose) {
        const interval = setInterval(() => {
          setProgress(prev => Math.max(0, prev - 100 / (autoClose / 50)));
        }, 50);
        
        const timer = setTimeout(() => {
          clearInterval(interval);
          startExitAnimation();
        }, autoClose);
        
        return () => {
          clearInterval(interval);
          clearTimeout(timer);
        };
      }
    }
  }, [message, autoClose]);

  const startExitAnimation = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      if (onClose) onClose();
    }, 300);
  };

  const handleClose = () => {
    startExitAnimation();
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 flex ${positionClasses[position]} z-50 pointer-events-none`}>
      <div 
        className={`${getAlertClass()} max-w-md w-full pointer-events-auto transition-all duration-300 transform ${
          isExiting 
            ? 'opacity-0 translate-y-[-20px] scale-95' 
            : 'opacity-100 translate-y-0 scale-100'
        }`}
        role="alert"
      >
        {/* Progress bar */}
        {autoClose && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-opacity-20 bg-current">
            <div 
              className={`h-full ${getProgressColor()} transition-all duration-50 ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        <div className="flex items-start">
          {getIcon()}
          <div className="flex-1">
            <span className="block font-medium">{message}</span>
          </div>
        </div>
        
        <button
          onClick={handleClose}
          className="ml-4 text-gray-500 hover:text-current focus:outline-none transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

AlertMessage.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  autoClose: PropTypes.number,
  position: PropTypes.oneOf(['top-center', 'top-right', 'top-left', 'bottom-center', 'bottom-right', 'bottom-left'])
};

export default AlertMessage;