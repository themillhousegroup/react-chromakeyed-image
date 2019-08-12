import { PixelUtils, RGBAPixel } from '../pixelUtils';
import { PixelReplacementFunction } from '../transformUtils';

export const getTolerantTransform = (findColorAsPixel:RGBAPixel, replacementColorAsPixel: RGBAPixel, tolerance: number):PixelReplacementFunction => {
  const transformTolerantly = (pixel: RGBAPixel):RGBAPixel => {
    return PixelUtils.areClose(findColorAsPixel, pixel, tolerance) ? replacementColorAsPixel : pixel;
  }
  return transformTolerantly;	
}