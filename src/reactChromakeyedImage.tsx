import React, { useEffect, useState, useRef } from 'react';
import { ColorStringUtils } from './colorStringUtils';
import { TransformUtils, PixelReplacementFunction } from './transformUtils';
import { getSimpleTransform } from './transforms/simpleTransform';
import { getStrictMapTransform } from './transforms/strictMapTransform';
import { getTolerantMapTransform } from './transforms/tolerantMapTransform';
import { getTolerantTransform } from './transforms/tolerantTransform';

// https://en.wikipedia.org/wiki/Alpha_compositing#Alpha_blending
export enum BlendMode {
	OPAQUE_FOREGROUND,
	ALPHA_BLENDING,
	ALPHA_RETAIN_BG_TRANSPARENCY
};

type Props = {
	src: string;
	findColor?: string;
	replaceColor?: string;
	tolerance?: number; 
	colorReplacementMap?: Record<string, string>;
	replacementFunction?: PixelReplacementFunction; 
	blendMode?: BlendMode;
};

const ReactChromakeyedImage: React.SFC<Props> = (props:Props) => {
	const {src, findColor, replaceColor, tolerance, colorReplacementMap, replacementFunction, blendMode, ...otherProps } = props;
	const imgRef = useRef<HTMLImageElement>(null);
	const canvasRef = useState<HTMLCanvasElement>(null);

	const pickStrategy = ():PixelReplacementFunction => {
		if (replacementFunction) {
			return replacementFunction;
		}

		if (colorReplacementMap) {
			if (tolerance && tolerance > 0) {
				return getTolerantMapTransform(colorReplacementMap, tolerance);
			}
			return getStrictMapTransform(colorReplacementMap);
		}

		if (findColor && replaceColor) {
			const findColorAsPixel = ColorStringUtils.toRGBAPixel(findColor);
			const replacementColorAsPixel = ColorStringUtils.toRGBAPixel(replaceColor);

			if (tolerance && tolerance > 0) {
				return getTolerantTransform(findColorAsPixel, replacementColorAsPixel, tolerance);
			}

			return getSimpleTransform(findColorAsPixel, replacementColorAsPixel); 
		}

		console.warn('No valid props defining how to transform pixels. Using a no-op');
		return (p) => p;		

	}

	const pixelConversionStrategy = pickStrategy();

	if (imgRef.current && canvasRef.current && imgRef.current.complete) {
		canvasRef.current.width = imgRef.current.width;
		canvasRef.current.height = imgRef.current.height;
		const ctx = canvasRef.current.getContext('2d');
		if (ctx) {
			ctx.drawImage(imgRef.current, 0, 0);
			const originalImageData = ctx.getImageData(0,0, imgRef.current.width, imgRef.current.height);
			ctx.putImageData(TransformUtils.transformImageData(originalImageData, pixelConversionStrategy, blendMode || BlendMode.OPAQUE_FOREGROUND), 0, 0);
		}
	}

	return (
		<React.Fragment>
			<div style={{display: 'none'}}>
	  		<img ref={imgRef} src={src} />
			</div>
			<canvas ref={canvasRef} {...otherProps} />
		</React.Fragment>
	);
};

export default ReactChromakeyedImage;
