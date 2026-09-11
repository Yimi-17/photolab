export interface Adjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  sepia: number;
  blur: number;
  hueRotate: number;
}

export const defaultAdjustments: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  sepia: 0,
  blur: 0,
  hueRotate: 0,
};

export interface FilterPreset {
  name: string;
  adjustments: Adjustments;
}

export const filterPresets: FilterPreset[] = [
  {
    name: 'Normal',
    adjustments: { ...defaultAdjustments },
  },
  {
    name: 'Clásico',
    adjustments: { ...defaultAdjustments, sepia: 50, contrast: 120 },
  },
  {
    name: 'Blanco y Negro',
    adjustments: { ...defaultAdjustments, grayscale: 100, contrast: 120 },
  },
  {
    name: 'Vibrante',
    adjustments: { ...defaultAdjustments, saturation: 150, contrast: 110 },
  },
  {
    name: 'Cálido',
    adjustments: { ...defaultAdjustments, sepia: 30, saturation: 120, hueRotate: -10 },
  },
  {
    name: 'Frío',
    adjustments: { ...defaultAdjustments, saturation: 110, hueRotate: 180 },
  },
  {
    name: 'Descolorido',
    adjustments: { ...defaultAdjustments, contrast: 80, brightness: 120, saturation: 80 },
  }
];
