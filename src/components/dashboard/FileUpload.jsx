import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../contexts/DataContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiFile, FiDownload, FiTrash2, FiImage } = FiIcons;

const FileUpload = () => {
  const { files, uploadFile } = useData();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList) => {
    Array.from(fileList).forEach(file => {
      uploadFile(file);
    });
  };

  const getFileIcon = (type) => {
    return type === 'pdf' ? FiFile : FiImage;
  };

  const downloadFile = (file) => {
    // Simulate file download
    const element = document.createElement('a');
    element.href = 'data:application/octet-stream;base64,';
    element.download = file.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <SafeIcon icon={FiUpload} className="mr-2 text-primary-500" />
          File Upload
        </h2>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <SafeIcon icon={FiUpload} className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-500 mb-4">
          PDF, PNG, JPG up to 10MB
        </p>
        <input
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="file-upload"
          accept=".pdf,.png,.jpg,.jpeg"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer"
        >
          <SafeIcon icon={FiUpload} className="mr-2 h-4 w-4" />
          Select Files
        </label>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Files</h3>
        <div className="space-y-2">
          {files.slice(0, 3).map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex items-center flex-1">
                <SafeIcon 
                  icon={getFileIcon(file.type)} 
                  className="h-5 w-5 text-gray-400 mr-3" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {file.size} • {file.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadFile(file)}
                  className="p-1 text-gray-400 hover:text-green-600"
                  title="Download"
                >
                  <SafeIcon icon={FiDownload} className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 text-gray-400 hover:text-red-600"
                  title="Delete"
                >
                  <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        {files.length > 3 && (
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-3">
            View All Files ({files.length})
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FileUpload;