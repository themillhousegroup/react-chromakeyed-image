import { PixelUtils, RGBAPixel } from '../pixelUtils';

export const getSimpleTransform = (findColorAsPixel:RGBAPixel, replacementColorAsPixel: RGBAPixel) => {
  const transformer = (pixel: RGBAPixel):RGBAPixel => {
    return PixelUtils.areEqual(findColorAsPixel, pixel) ? replacementColorAsPixel : pixel;
  }

  return transformer;
}