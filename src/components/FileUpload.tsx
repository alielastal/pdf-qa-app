
import React, { useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  errorMessage: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, errorMessage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div
        onClick={handleClick}
        className="w-full h-full border-4 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-slate-50 transition-colors"
      >
        <UploadIcon className="w-16 h-16 text-slate-400 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700">Click to upload a PDF</h2>
        <p className="text-slate-500 mt-1">or drag and drop</p>
        <p className="text-xs text-slate-400 mt-4">Max file size: 5MB</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="application/pdf"
        />
      </div>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
