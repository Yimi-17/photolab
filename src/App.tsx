import React, { useState } from 'react';
import { Uploader } from './components/Uploader';
import { ImageEditor } from './components/ImageEditor';
import { Aperture } from 'lucide-react';
import * as motion from 'motion/react-client';

export default function App() {
  const [currentImage, setCurrentImage] = useState<{ url: string; name: string } | null>(null);

  const handleImageUpload = (url: string, name: string) => {
    setCurrentImage({ url, name });
  };

  const handleClose = () => {
    setCurrentImage(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-500/30">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Aperture className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">PhotoLab</span>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Editor en el Navegador
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {!currentImage ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="mb-8 space-y-4 max-w-2xl">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                Edita tus fotos <span className="text-indigo-600 dark:text-indigo-400">al instante</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Sube tu imagen, aplica filtros personalizados, ajusta el brillo, contraste y más sin salir de tu navegador. 100% privado y rápido.
              </p>
            </div>
            <Uploader onImageUpload={handleImageUpload} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ImageEditor
              imageUrl={currentImage.url}
              fileName={currentImage.name}
              onClose={handleClose}
            />
          </motion.div>
        )}
      </main>
    </div>
  );
}

