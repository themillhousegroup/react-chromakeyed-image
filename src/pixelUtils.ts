export type RGBAPixel = {
	r: number; 
	b: number; 
	g: number;
 	a: number;
}

export class PixelUtils {
	
	static areEqual = (p1: RGBAPixel, p2: RGBAPixel):boolean => {
		return ((p1.r === p2.r) && 
			(p1.g === p2.g) &&
			(p1.b === p2.b) &&
			(p1.a === p2.a));
	};

	static areClose = (reference: RGBAPixel, p: RGBAPixel, tolerance: number):boolean => {
		return (((reference.r - tolerance) <= p.r) && ((reference.r + tolerance) >= p.r)) && 
			(((reference.g - tolerance) <= p.g) && ((reference.g + tolerance) >= p.g)) && 
			(((reference.b - tolerance) <= p.b) && ((reference.b + tolerance) >= p.b)) && 
			(((reference.a - tolerance) <= p.a) && ((reference.a + tolerance) >= p.a)); 
	};

	static reduceToPixels = (array:Uint8ClampedArray):RGBAPixel[] => {
		if ((array.length % 4) !== 0) {
			console.warn(`Wrong number of pixel RGBA bytes: ${array.length}`);
			return [];
		}
		const pixelArray = new Array<RGBAPixel>(array.length / 4);
		let j = 0;
		for (let i = 0; i < array.length; i += 4) {
			pixelArray[j++] = { r: (array[i]), g: (array[i+1]), b: (array[i+2]), a: (array[i+3])};
		}
		return pixelArray;
	}

	static expandToRGBAArray = (pixels: RGBAPixel[]):Uint8ClampedArray => {
		const newArray = new Uint8ClampedArray(pixels.length * 4);
		let j = 0;
		for (let i = 0; i < pixels.length; i += 1) {
			newArray[j++] = pixels[i].r & 0xFF;
			newArray[j++] = pixels[i].g & 0xFF;
			newArray[j++] = pixels[i].b & 0xFF;
			newArray[j++] = pixels[i].a & 0xFF;
		}
		return newArray;
	} 
}
