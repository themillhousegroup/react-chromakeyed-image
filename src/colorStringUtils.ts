import { RGBAPixel } from './pixelUtils';

export class ColorStringUtils {

	private static expectedGeneralForm:RegExp = /^#[a-fA-F0-9]{3,8}$/ // e.g. #fff up to #deadbeef
	private static shortForm:RegExp = /^#[a-fA-F0-9]{3,4}$/ // e.g. #fff or #abcd
	private static longForm:RegExp = /^#[a-fA-F0-9]{6,8}$/ // e.g. #ff99cc or #ab44cd44

	static parseShortForm = (colorString: string):RGBAPixel => {
		return {
			r: parseInt(colorString[1] + '0', 16),
			g: parseInt(colorString[2] + '0', 16),
			b: parseInt(colorString[3] + '0', 16),
		  a: ((colorString.length > 4) ? parseInt(colorString[4] + '0', 16) : 0xFF)
		};
	}
	static parseLongForm = (colorString: string):RGBAPixel => {
		return {
			r: parseInt(colorString.substring(1,3), 16),
			g: parseInt(colorString.substring(3,5), 16),
			b: parseInt(colorString.substring(5,7), 16),
		  a: ((colorString.length > 7) ? parseInt(colorString.substring(7,9), 16) : 0xFF)
		};
	}

	static toRGBAPixel = (colorString: string):RGBAPixel => {
		if (ColorStringUtils.expectedGeneralForm.test(colorString)) {
			if (ColorStringUtils.shortForm.test(colorString)) {
				return ColorStringUtils.parseShortForm(colorString);
			}		
			if (ColorStringUtils.longForm.test(colorString)) {
				return ColorStringUtils.parseLongForm(colorString);
			}		
		}
		throw new Error(`Color '${colorString}' could not be converted to an RGB or RGBA triple`)
	}
}

