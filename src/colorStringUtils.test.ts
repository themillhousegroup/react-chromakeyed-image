import { ColorStringUtils } from './colorStringUtils';
import { RGBAPixel } from './pixelUtils';

describe('ColorStringUtils', () => {

	const makeTriple = (r:number, g:number, b:number):RGBAPixel => {
		return makeQuad(r, g, b, 0xFF);
	}
	const makeQuad = (r:number, g:number, b:number, a:number):RGBAPixel => {
		return {r, g, b, a };
	}

	describe('#toRGBAPixel', () => {
		test('#rgb', () => {
			expect(ColorStringUtils.toRGBAPixel('#fed')).toStrictEqual(makeTriple(0xf0, 0xe0, 0xd0));
		});
		test('#RGB', () => {
			expect(ColorStringUtils.toRGBAPixel('#ABC')).toStrictEqual(makeTriple(0xa0, 0xb0, 0xc0));
		});
		test('#rgba', () => {
			expect(ColorStringUtils.toRGBAPixel('#bead')).toStrictEqual(makeQuad(0xb0, 0xe0, 0xa0, 0xd0));		
		});
		test('#RGBA', () => {
			expect(ColorStringUtils.toRGBAPixel('#DCBA')).toStrictEqual(makeQuad(0xd0, 0xc0, 0xb0, 0xa0));		
		});
		test('#rrggbb', () => {
			expect(ColorStringUtils.toRGBAPixel('#66bb99')).toStrictEqual(makeTriple(0x66, 0xbb, 0x99));		
		});
		test('#RRGGBB', () => {
			expect(ColorStringUtils.toRGBAPixel('#77BEEF')).toStrictEqual(makeTriple(0x77, 0xbe, 0xef));		
		});
		test('#rrggbbaa', () => {
			expect(ColorStringUtils.toRGBAPixel('#123456d8')).toStrictEqual(makeQuad(0x12, 0x34, 0x56, 0xd8));		
		});
		test('#RRGGBBAA', () => {
			expect(ColorStringUtils.toRGBAPixel('#AA5588EE')).toStrictEqual(makeQuad(0xaa, 0x55, 0x88, 0xee));		
		});
	});
});
