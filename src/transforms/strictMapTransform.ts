import { ColorStringUtils } from '../colorStringUtils';
import { RGBAPixel } from '../pixelUtils';
import { PixelReplacementFunction, TransformUtils } from '../transformUtils';


export const getStrictMapTransform = (replacementMap:Record<string, string>):PixelReplacementFunction => {
  const colorMap: Map<String, RGBAPixel> = new Map(TransformUtils.entries(replacementMap).map(([inString, outString]) => {
    return [JSON.stringify(ColorStringUtils.toRGBAPixel(inString)), ColorStringUtils.toRGBAPixel(outString)];
  }));

  const transformer = (pixel: RGBAPixel):RGBAPixel => {
    return colorMap.get(JSON.stringify(pixel)) || pixel;
  }

  return transformer;
}