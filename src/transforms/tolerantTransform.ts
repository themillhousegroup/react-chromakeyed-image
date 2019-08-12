import { PixelUtils, RGBAPixel } from '../pixelUtils';

export const getTolerantTransform = (findColorAsPixel:RGBAPixel, replacementColorAsPixel: RGBAPixel, tolerance: number) => {
  const transformTolerantly = (pixel: RGBAPixel):RGBAPixel => {
    return PixelUtils.areClose(findColorAsPixel, pixel, tolerance) ? replacementColorAsPixel : pixel;
  }
  return transformTolerantly;	
}