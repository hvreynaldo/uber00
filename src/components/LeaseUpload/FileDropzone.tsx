import React from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import clsx from 'clsx';

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export function FileDropzone({ onFileSelect, disabled }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'border-2 border-dashed rounded-lg p-8',
        'flex flex-col items-center justify-center',
        'transition-colors duration-200',
        disabled && 'opacity-50 cursor-not-allowed',
        isDragActive
          ? 'border-blue-400 bg-blue-400/10'
          : 'border-[#1E4976] hover:border-blue-400'
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="w-12 h-12 text-blue-400 mb-4" />
      <p className="text-lg font-medium text-white">
        Choose a file or drag it here
      </p>
      <p className="text-sm text-blue-200 mt-2">
        PDF only. Up to 10MB
      </p>
    </div>
  );
}