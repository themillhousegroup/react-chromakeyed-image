import { RGBAPixel, PixelUtils } from './pixelUtils';

describe('PixelUtils', () => {
	describe('#areEqual', () => {
		it('returns false on bad objects', () => {
			expect(PixelUtils.areEqual({ r: 1, g: -1, b: 0, a: 99}, {r: 1, g: 1, b: 3, a: 99})).toBe(false);	
		});
		it('returns false on unequal objects', () => {
			expect(PixelUtils.areEqual({ r: 1, g: 3, b: 2, a: 9 }, { r: 1, g: 3, b: 3, a: 9})).toBe(false);	
		});
		it('returns true on equal objects', () => {
			expect(PixelUtils.areEqual({ r: 1, g: 3, b: 2, a: 9 }, { r: 1, g: 3, b: 2, a: 9})).toBe(true);	
		});

	});
	describe('#reduceToPixels', () => {
		it('returns empty on non-multiple-of-four array', () => {
			const array = new Uint8ClampedArray(3);
			expect(PixelUtils.reduceToPixels(array).length).toBe(0);	
		});
		it('reduces a valid array into packed pixels (single pixel)', () => {
			const array = Uint8ClampedArray.from([0x01, 0x02, 0x03, 0x04]);
			const result = PixelUtils.reduceToPixels(array);
			expect(result.length).toBe(1);
			expect(result[0]).toStrictEqual({ r: 1, g: 2, b: 3, a: 4});
		});
		it('reduces a valid array into packed pixels (multiple pixels)', () => {
			const array = Uint8ClampedArray.from([
				1, 2, 3, 4, 
				2, 3, 4, 5, 
				3, 4, 5, 6
			]);
			const result = PixelUtils.reduceToPixels(array);
			expect(result.length).toBe(3);
			expect(result[0]).toStrictEqual({ r: 1, g: 2, b: 3, a: 4});
			expect(result[1]).toStrictEqual({ r: 2, g: 3, b: 4, a: 5});
			expect(result[2]).toStrictEqual({ r: 3, g: 4, b: 5, a: 6});
		});
	});
	describe('#expandToRGBAArray', () => {
		it('can convert an empty array', () => {
			expect(PixelUtils.expandToRGBAArray([]).length).toBe(0);	
		});
		it('can convert a single pixel array', () => {
			const array = [{ r: 1, g: 2, b: 3, a: 4 }]; 
			const result = PixelUtils.expandToRGBAArray(array);
			expect(result.length).toBe(4);	
			expect(result[0]).toBe(0x01);	
			expect(result[1]).toBe(0x02);	
			expect(result[2]).toBe(0x03);	
			expect(result[3]).toBe(0x04);	
		});
		it('can convert a multiple pixel array', () => {
			const array = [
				{ r: 1, g: 2, b: 3, a: 4 },
				{ r: 2, g: 3, b: 4, a: 5 },
				{ r: 3, g: 4, b: 5, a: 6 },
			]; 
			const result = PixelUtils.expandToRGBAArray(array);
			expect(result.length).toBe(12);	
			expect(result).toStrictEqual(Uint8ClampedArray.from([ 1,2,3,4, 2,3,4,5, 3,4,5,6 ]));
		});
	});
});
