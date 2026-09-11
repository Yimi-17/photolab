import React, { useCallback } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

interface UploaderProps {
  onImageUpload: (imageUrl: string, fileName: string) => void;
}

export function Uploader({ onImageUpload }: UploaderProps) {
  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
    >
      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-full shadow-sm group-hover:scale-105 transition-transform mb-4">
            <UploadCloud className="w-8 h-8 text-indigo-500" />
          </div>
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Haz clic para subir</span> o arrastra y suelta
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <ImageIcon className="w-3 h-3" /> PNG, JPG, WEBP, GIF
          </p>
        </div>
        <input type="file" className="hidden" accept="image/*" onChange={onChange} />
      </label>
    </div>
  );
}
