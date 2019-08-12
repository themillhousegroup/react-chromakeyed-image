import { PixelUtils, RGBAPixel } from '../pixelUtils';
import { PixelReplacementFunction } from '../transformUtils';

export const getSimpleTransform = (findColorAsPixel:RGBAPixel, replacementColorAsPixel: RGBAPixel):PixelReplacementFunction => {
  const transformer = (pixel: RGBAPixel):RGBAPixel => {
    return PixelUtils.areEqual(findColorAsPixel, pixel) ? replacementColorAsPixel : pixel;
  }

  return transformer;
}