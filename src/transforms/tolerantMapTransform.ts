import { ColorStringUtils } from '../colorStringUtils';
import { PixelUtils, RGBAPixel } from '../pixelUtils';
import { PixelReplacementFunction } from '../transformUtils';


export const getTolerantMapTransform = (replacementMap:object, tolerance: number):PixelReplacementFunction => {
  const colors = Object.keys(replacementMap).map(ColorStringUtils.toRGBAPixel);

  const colorMap: Map<String, RGBAPixel> = new Map(Object.entries(replacementMap).map(([inString, outString]) => {
    return [JSON.stringify(ColorStringUtils.toRGBAPixel(inString)), ColorStringUtils.toRGBAPixel(outString)];
  }));

  const tolerantTransformer = (pixel: RGBAPixel):RGBAPixel => {
    const match = colors.find((basePixelColor) => {
      return PixelUtils.areClose(basePixelColor, pixel, tolerance) ;
    });
    if (match) {
      return colorMap.get(JSON.stringify(match)) || pixel;
    }
    return pixel;
  }

  return tolerantTransformer;

}