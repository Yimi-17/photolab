import React from 'react';

interface AdjustmentSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function AdjustmentSlider({
  label,
  value,
  min,
  max,
  unit = '%',
  onChange,
}: AdjustmentSliderProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center text-sm">
        <label className="font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <span className="text-gray-500 dark:text-gray-400 tabular-nums text-xs font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      />
    </div>
  );
}
