import { PixelUtils, RGBAPixel } from './pixelUtils';
import { BlendMode } from './ChromakeyedImage';

export type PixelReplacementFunction = (pixel: RGBAPixel, x:number, y:number) => RGBAPixel;

export class TransformUtils {

	// https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending
	static alphaBlend = (backgroundPixel: RGBAPixel, foregroundPixel:RGBAPixel, retainBGTransparency: boolean):RGBAPixel => {
		if (retainBGTransparency && backgroundPixel.a === 0) { return backgroundPixel};
		const bgAMultiplier = backgroundPixel.a + (0xFF - foregroundPixel.a);
		const outAlpha = foregroundPixel.a + bgAMultiplier;
		// console.log(`Alpha: ${outAlpha}`)
		const r = ((foregroundPixel.r * foregroundPixel.a) + (backgroundPixel.r * bgAMultiplier)) / outAlpha;
		const g = ((foregroundPixel.g * foregroundPixel.a) + (backgroundPixel.g * bgAMultiplier)) / outAlpha;
		const b = ((foregroundPixel.b * foregroundPixel.a) + (backgroundPixel.b * bgAMultiplier)) / outAlpha;
		return {
			r, g, b, a: outAlpha	
		};
	}

	static mapPixels = (existingPixels: RGBAPixel[], imageWidth: number, replacer: PixelReplacementFunction, blendMode: BlendMode): RGBAPixel[] => {
		switch (blendMode) {
			case BlendMode.ALPHA_BLENDING: {
				return existingPixels.map((pixel, index) => {
					const x = index % imageWidth;
					const y = Math.floor(index / imageWidth);
					return TransformUtils.alphaBlend(pixel, replacer(pixel, x, y), false);
				});
			} 
			case BlendMode.ALPHA_RETAIN_BG_TRANSPARENCY: {
				return existingPixels.map((pixel, index) => {
					const x = index % imageWidth;
					const y = Math.floor(index / imageWidth);
					return TransformUtils.alphaBlend(pixel, replacer(pixel, x, y), true);
				});
			} 
			default: {
				return existingPixels.map((pixel, index) => {
					const x = index % imageWidth;
					const y = Math.floor(index / imageWidth);
					return replacer(pixel, x, y);
				});
			}
		}
	}
 
  static transformImageData = (imageData: ImageData, replacer: PixelReplacementFunction, blendMode: BlendMode):ImageData => {
		const asPixelArray = PixelUtils.reduceToPixels(imageData.data);
		const newPixels = TransformUtils.mapPixels(asPixelArray, imageData.width, replacer, blendMode);
		const asRGBAArray = PixelUtils.expandToRGBAArray(newPixels);
		return new ImageData(asRGBAArray, imageData.width, imageData.height);
	}

	// A Polyfill for the ES2017 Object.entries() method
	static entries = (obj:Record<string, string>) => Object.keys(obj).map(key => [key, obj[key]]);
}