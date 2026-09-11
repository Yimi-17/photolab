import React, { useState, useRef, useEffect } from 'react';
import { Adjustments, defaultAdjustments, filterPresets, FilterPreset } from '../types';
import { AdjustmentSlider } from './AdjustmentSlider';
import { getFilterString } from '../lib/utils';
import { Download, RefreshCw, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import * as motion from 'motion/react-client';

interface ImageEditorProps {
  imageUrl: string;
  fileName: string;
  onClose: () => void;
}

export function ImageEditor({ imageUrl, fileName, onClose }: ImageEditorProps) {
  const [adjustments, setAdjustments] = useState<Adjustments>(defaultAdjustments);
  const [activeTab, setActiveTab] = useState<'ajustes' | 'filtros'>('ajustes');
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAdjustmentChange = (key: keyof Adjustments, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: FilterPreset) => {
    setAdjustments(preset.adjustments);
  };

  const resetAdjustments = () => {
    setAdjustments(defaultAdjustments);
  };

  const handleDownload = () => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    
    // Set canvas dimensions to match original image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Apply filters
    ctx.filter = getFilterString(adjustments);
    
    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Create download link
    const link = document.createElement('a');
    link.download = `editado-${fileName}`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const filterStyle = {
    filter: getFilterString(adjustments),
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto min-h-[calc(100vh-8rem)]">
      {/* Editor Main View */}
      <div className="flex-1 flex flex-col bg-gray-50/50 dark:bg-gray-900/20 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
           <button
            onClick={resetAdjustments}
            className="p-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all border border-gray-200/50 dark:border-gray-700/50 group"
            title="Restablecer"
          >
            <RefreshCw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all border border-gray-200/50 dark:border-gray-700/50"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10 relative overflow-hidden bg-[url('/pattern.png')] bg-repeat bg-center opacity-90">
           {/* Checkerboard background for transparent images */}
           <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
           <div className="relative max-w-full max-h-full flex items-center justify-center shadow-2xl rounded-lg overflow-hidden">
             <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                ref={imageRef}
                src={imageUrl}
                alt="Original"
                className="max-w-full max-h-[70vh] object-contain transition-all duration-300"
                style={filterStyle}
              />
           </div>
           {/* Hidden canvas for exporting */}
           <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col h-full">
          
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('ajustes')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ajustes'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Ajustes
            </button>
            <button
              onClick={() => setActiveTab('filtros')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'filtros'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Filtros
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
            {activeTab === 'ajustes' ? (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="flex flex-col gap-6"
              >
                <AdjustmentSlider
                  label="Brillo"
                  value={adjustments.brightness}
                  min={0}
                  max={200}
                  onChange={(v) => handleAdjustmentChange('brightness', v)}
                />
                <AdjustmentSlider
                  label="Contraste"
                  value={adjustments.contrast}
                  min={0}
                  max={200}
                  onChange={(v) => handleAdjustmentChange('contrast', v)}
                />
                <AdjustmentSlider
                  label="Saturación"
                  value={adjustments.saturation}
                  min={0}
                  max={200}
                  onChange={(v) => handleAdjustmentChange('saturation', v)}
                />
                <AdjustmentSlider
                  label="Tonalidad (Hue)"
                  value={adjustments.hueRotate}
                  min={-180}
                  max={180}
                  unit="°"
                  onChange={(v) => handleAdjustmentChange('hueRotate', v)}
                />
                <AdjustmentSlider
                  label="Desenfocar"
                  value={adjustments.blur}
                  min={0}
                  max={20}
                  unit="px"
                  onChange={(v) => handleAdjustmentChange('blur', v)}
                />
                <AdjustmentSlider
                  label="Escala de grises"
                  value={adjustments.grayscale}
                  min={0}
                  max={100}
                  onChange={(v) => handleAdjustmentChange('grayscale', v)}
                />
                <AdjustmentSlider
                  label="Sepia"
                  value={adjustments.sepia}
                  min={0}
                  max={100}
                  onChange={(v) => handleAdjustmentChange('sepia', v)}
                />
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="grid grid-cols-2 gap-3"
              >
                {filterPresets.map((preset) => {
                   // A quick way to check if this preset is "active" based on values
                   const isActive = Object.keys(preset.adjustments).every(
                     (key) => preset.adjustments[key as keyof Adjustments] === adjustments[key as keyof Adjustments]
                   );
                   
                   return (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium ${
                        isActive
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300'
                          : 'border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700/50 text-gray-700 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800'
                      }`}
                    >
                      {/* Mini preview logic could go here, for now just names */}
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-800 mb-1 flex items-center justify-center">
                         <Sparkles className={`w-4 h-4 ${isActive ? 'text-indigo-500' : 'text-gray-400'}`} />
                      </span>
                      {preset.name}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-4 rounded-xl transition-colors shadow-sm shadow-indigo-600/20 active:scale-[0.98]"
            >
              <Download className="w-5 h-5" />
              Descargar Imagen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
