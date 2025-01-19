import React from 'react';
import { File, X } from 'lucide-react';

interface SelectedFileProps {
  file: File;
  onRemove: () => void;
}

export function SelectedFile({ file, onRemove }: SelectedFileProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#173A5E] rounded-lg">
      <div className="flex items-center space-x-3">
        <File className="w-5 h-5 text-blue-400" />
        <div>
          <p className="text-sm font-medium text-white">{file.name}</p>
          <p className="text-xs text-blue-200">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-[#1E4976] rounded-full transition-colors"
        aria-label="Remove file"
      >
        <X className="w-4 h-4 text-blue-200" />
      </button>
    </div>
  );
}