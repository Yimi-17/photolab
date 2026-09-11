export function getFilterString(adjustments: {
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  sepia: number;
  blur: number;
  hueRotate: number;
}) {
  return `
    brightness(${adjustments.brightness}%) 
    contrast(${adjustments.contrast}%) 
    saturate(${adjustments.saturation}%) 
    grayscale(${adjustments.grayscale}%) 
    sepia(${adjustments.sepia}%) 
    blur(${adjustments.blur}px) 
    hue-rotate(${adjustments.hueRotate}deg)
  `.trim();
}
