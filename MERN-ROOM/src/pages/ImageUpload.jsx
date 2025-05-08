import React, { useState, useRef } from 'react';
import { Upload, X, Check, AlertCircle, Loader } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { useParams } from "react-router-dom";


const PremiumMultiImageUploader = (req,res) => {
  const { formData, setFormData } = useFormContext();
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  console.log(req.params);
  const { residenceId } = useParams();;


  
  const MAX_IMAGES = 5;
  const MAX_SIZE_MB = 5;
  
  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.floor(Math.random() * 10);
      });
    }, 300);
    
    return () => clearInterval(interval);
  };
  
  const validateFile = (file) => {
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `${file.name} exceeds the ${MAX_SIZE_MB}MB limit`;
    }
    
    if (!file.type.startsWith('image/')) {
      return `${file.name} is not a valid image file`;
    }
    
    return null;
  };

  const handleFiles = (files) => {
    setError('');
    const fileArray = Array.from(files);
    
    if (fileArray.length + images.length > MAX_IMAGES) {
      setError(`You can upload a maximum of ${MAX_IMAGES} images`);
      return;
    }
    
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return;
      }
    }
    
    const imagePromises = fileArray.map((file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({
          name: `${Date.now()}-${file.name}`,
          base64: reader.result,
          file: file
        });
        reader.readAsDataURL(file);
      })
    );
    
    Promise.all(imagePromises).then(newImages => {
      setImages(prevImages => [...prevImages, ...newImages]);
    });
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setError('Please select at least one image');
      return;
    }
  
    setIsUploading(true);
    const stopSimulation = simulateProgress();
  
    try {
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', image.file);
      });
      
      const res = await fetch(`/api/listing/upload/image/${residenceId}`, {
        method: 'POST',
        body: formData,
      });
        // First check if the response is JSON

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(text || 'Server returned non-JSON response');
      }
  
      const data = await res.json();
      setUploadProgress(100);
      setFormData({postId : ''});
  
      if (!res.ok) {
        throw new Error(data.message || 'Upload failed');
      }
  
      setUploadedImages(prev => [...prev, ...data.images]);
      setImages([]);
    } catch (error) {
      console.error('Upload error:', error);
      if (error.message.includes('<!DOCTYPE html>')) {
        setError('Server error occurred. Please try again later.');
      } else {
        setError(error.message || 'Upload failed');
      }
    } finally {
      setTimeout(() => setIsUploading(false), 500);
      clearTimeout(stopSimulation);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">

      <div className='flex justify-center text-green-500 font-bold text-2xl'>Upload Property Images</div>
      <div className="border-2 border-dashed rounded-lg bg-gray-50 border-gray-300 relative">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          ref={fileInputRef}
        />
        
        <div
          className={`flex flex-col items-center justify-center p-12 text-center cursor-pointer ${isDragging ? 'bg-green-50' : ''}`}
          onClick={() => fileInputRef.current.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload size={48} className="text-green-500 mb-4" />
          <p className="text-xl font-medium text-gray-700">Drag & drop your images here</p>
          <p className="text-sm text-gray-500 mt-2">or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">Up to {MAX_IMAGES} images, {MAX_SIZE_MB}MB each</p>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center p-4 text-red-800 bg-red-50 rounded-lg">
          <AlertCircle size={20} className="mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Preview area */}
      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Selected Images ({images.length}/{MAX_IMAGES})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={image.base64} 
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
                <p className="text-xs text-gray-500 truncate mt-1">{image.name.split('-').slice(1).join('-')}</p>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`flex items-center justify-center px-6 py-3 rounded-lg text-white w-full 
              ${isUploading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} transition-colors`}
          >
            {isUploading ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                Uploading... {uploadProgress}%
              </>
            ) : (
              <>
                <Upload size={18} className="mr-2" />
                Upload {images.length} {images.length === 1 ? 'Image' : 'Images'}
              </>
            )}
          </button>
          
          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
      
      {/* Uploaded images gallery */}
      {uploadedImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center">
            <h3 className="text-lg font-medium">Uploaded Images</h3>
            <div className="ml-2 flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
              <Check size={14} className="mr-1" />
              Successfully uploaded
            </div>
          </div>
          
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg shadow-sm"
                />
                <p className="text-xs text-gray-500 truncate mt-1">{image.public_id}</p>
              </div>
            ))}
          </div> */}
        </div>
      )}


    </div>
  );


};

export default PremiumMultiImageUploader;