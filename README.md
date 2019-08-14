# react-chromakeyed-image
React Component allowing color substitutions to be defined on an image, similar to how [Chroma Key](https://en.wikipedia.org/wiki/Chroma_key) (or "Green Screen") works on video.

### Installing
`npm i react-chromakeyed-image`

### Using

#### Basic usage
In your React app:

```
import ReactChromakeyedImage from 'react-chromakeyed-image';

...
export default () => {
	return (
		<div style={{backgroundColor: "#cccccc"}}>
			<h1>Original</h1>
			<img src="/static/240px-face.png" />
			<h1>Chromakeyed</h1>
			<ReactChromakeyedImage src="/static/240px-face.png" findColor="#fede58" replaceColor="#FF0000" />
    </div>
  );
}

```

All instance of color `findColor` will be replaced with `replaceColor`.
Note that you can use `#rrggbb`, `#rrggbbaa`, `#rgb` or `#rgba` forms of specifying a color.
If you omit the Alpha channel, it will be assumed to be `0xFF`.



