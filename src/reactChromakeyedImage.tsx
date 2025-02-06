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

type ImageDetails = {
	ctx: CanvasRenderingContext2D;
	imageData: ImageData;
}

const ReactChromakeyedImage: React.SFC<Props> = (props:Props) => {
	const {src, findColor, replaceColor, tolerance, colorReplacementMap, replacementFunction, blendMode, ...otherProps } = props;
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);
	
	useEffect(() => {
		console.log(`Loading image ${src}`);
		const img = new Image();
		img.src = src;
		img.decode().then(() => {
			if (canvasRef.current) {
				console.log(`Image ${src} loaded - updating canvas`);
				canvasRef.current.width = img.width;
				canvasRef.current.height = img.height;
				const ctx = canvasRef.current.getContext('2d');
				ctx.drawImage(img, 0, 0);
				const imageData = ctx.getImageData(0,0, img.width, img.height);
				setImageDetails({ ctx, imageData }); // will trigger a re-render
			} else {
				console.error('Canvas not initialized');
			}
		});
	}, [src])


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

	if (imageDetails) {
		// Write it back to the canvas
		imageDetails.ctx.putImageData(
			TransformUtils.transformImageData(
				imageDetails.imageData, 
				pickStrategy(), 
				blendMode || BlendMode.OPAQUE_FOREGROUND), 
			0, 0);
	}

	return (
		<React.Fragment>
			<canvas ref={canvasRef} {...otherProps} />
		</React.Fragment>
	);
};

export default ReactChromakeyedImage;
