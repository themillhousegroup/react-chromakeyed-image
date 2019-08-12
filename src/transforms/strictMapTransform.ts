import { ColorStringUtils } from '../colorStringUtils';
import { RGBAPixel } from '../pixelUtils';

export const getStrictMapTransform = (replacementMap:object) => {
  const colorMap: Map<String, RGBAPixel> = new Map(Object.entries(replacementMap).map(([inString, outString]) => {
    return [JSON.stringify(ColorStringUtils.toRGBAPixel(inString)), ColorStringUtils.toRGBAPixel(outString)];
  }));

  const transformer = (pixel: RGBAPixel):RGBAPixel => {
    return colorMap.get(JSON.stringify(pixel)) || pixel;
  }

  return transformer;
}