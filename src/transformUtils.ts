import { PixelUtils, RGBAPixel } from './pixelUtils';

export type PixelReplacementFunction = (pixel: RGBAPixel, x:number, y:number) => RGBAPixel;

export class TransformUtils {
  
	static mapPixels = (existingPixels: RGBAPixel[], imageWidth: number, replacer: PixelReplacementFunction): RGBAPixel[] => {
		return existingPixels.map((pixel, index) => {
			const x = index % imageWidth;
			const y = Math.floor(index / imageWidth);
			return replacer(pixel, x, y);
		});
	}
 
  static transformImageData = (imageData: ImageData, replacer: PixelReplacementFunction):ImageData => {
		const asPixelArray = PixelUtils.reduceToPixels(imageData.data);
		const newPixels = TransformUtils.mapPixels(asPixelArray, imageData.width, replacer);
		const asRGBAArray = PixelUtils.expandToRGBAArray(newPixels);
		return new ImageData(asRGBAArray, imageData.width, imageData.height);
	}
}