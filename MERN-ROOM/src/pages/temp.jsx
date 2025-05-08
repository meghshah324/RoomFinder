import React, { useState } from 'react';
import Alert from '../components/Alert.jsx';

function Temp() {
  const [alert, setAlert] = useState({ 
    type: '', 
    message: '',
    timeoutId: null
  });

  const showAlert = (type, message, duration = 3000) => {
    // Clear previous timeout if any
    if (alert.timeoutId) {
      clearTimeout(alert.timeoutId);
    }

    setAlert({ type, message });
    
    // Set new timeout
    const timeoutId = setTimeout(() => {
      setAlert(prev => ({ ...prev, message: '' }));
    }, duration);

    setAlert(prev => ({ ...prev, timeoutId }));
  };

  return (
    <div className="App min-h-screen bg-gray-50 p-8">
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => showAlert('success', 'Item created successfully!')}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
        >
          Show Success Alert
        </button>

        <button
          onClick={() => showAlert('error', 'Something went wrong!')}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
        >
          Show Error Alert
        </button>

        <button
          onClick={() => showAlert('info', 'You are logged out.')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
        >
          Show Info Alert
        </button>

        <button
          onClick={() => showAlert('warning', 'This action cannot be undone!', 5000)}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
        >
          Show Warning Alert
        </button>
      </div>

      {/* Display alert */}
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert(prev => ({ ...prev, message: '' }))}
      />

      <div className="mt-8 p-6 bg-white rounded-lg shadow-md transition-all hover:shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Alert Demo</h2>
        <p className="text-gray-600">
          Click the buttons above to see different alert types with smooth animations. 
          Alerts will slide in and fade out automatically.
        </p>
      </div>
    </div>
  );
}

export default Temp;