import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { handleFileUpload } from '../utils/uploadHandler';
import { FileDropzone } from './LeaseUpload/FileDropzone';
import { SelectedFile } from './LeaseUpload/SelectedFile';

interface LeaseUploadProps {
  onFileSelect: (file: File) => void;
}

export function LeaseUpload({ onFileSelect }: LeaseUploadProps) {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!user || !selectedFile) return;

    setUploading(true);
    setError(null);
    
    try {
      const response = await handleFileUpload(selectedFile, user.id);
      onFileSelect(selectedFile);
      setSelectedFile(null);
      console.log('Upload successful:', response);
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass-effect rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="bg-blue-500 w-1 h-8 rounded mr-3"></span>
        Upload Lease Document
      </h2>
      
      {error && (
        <div className="p-4 mb-4 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-300">
          {error}
        </div>
      )}
      
      <FileDropzone
        onFileSelect={setSelectedFile}
        disabled={uploading || !user}
      />

      {selectedFile && (
        <div className="space-y-4 mt-4">
          <SelectedFile
            file={selectedFile}
            onRemove={() => setSelectedFile(null)}
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}