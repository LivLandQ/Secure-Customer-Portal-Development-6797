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
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-brand-grey flex items-center font-helvetica">
          <SafeIcon icon={FiUpload} className="mr-2 text-brand-teal" />
          File Upload
        </h2>
      </div>

      <div
        className={`border-2 border-dashed rounded-brand p-6 text-center transition-colors ${
          dragActive 
            ? 'border-brand-teal bg-primary-50' 
            : 'border-gray-300 hover:border-brand-teal'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <SafeIcon icon={FiUpload} className="mx-auto h-12 w-12 text-grey-400 mb-4" />
        <p className="text-lg font-medium text-brand-grey mb-2 font-helvetica">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-grey-400 mb-4 font-helvetica">
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
          className="btn-primary inline-flex items-center cursor-pointer"
        >
          <SafeIcon icon={FiUpload} className="mr-2 h-4 w-4" />
          Select Files
        </label>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-brand-grey mb-3 font-helvetica">Recent Files</h3>
        <div className="space-y-2">
          {files.slice(0, 3).map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-brand card-hover"
            >
              <div className="flex items-center flex-1">
                <SafeIcon 
                  icon={getFileIcon(file.type)} 
                  className="h-5 w-5 text-grey-400 mr-3" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-grey truncate font-helvetica">
                    {file.name}
                  </p>
                  <p className="text-xs text-grey-400 font-helvetica">
                    {file.size} • {file.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => downloadFile(file)}
                  className="p-1 rounded-brand text-grey-400 hover:text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                  title="Download"
                >
                  <SafeIcon icon={FiDownload} className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="icon-btn-danger"
                  title="Delete"
                >
                  <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        {files.length > 3 && (
          <button className="text-brand-teal hover:text-primary-600 text-sm font-medium mt-3 font-helvetica">
            View All Files ({files.length})
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default FileUpload;