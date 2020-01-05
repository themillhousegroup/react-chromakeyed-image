# react-chromakeyed-image
React Component allowing color substitutions to be defined on an image, similar to how [Chroma Key](https://en.wikipedia.org/wiki/Chroma_key) (or "Green Screen") works on video.

### Installing
`npm i react-chromakeyed-image`

### Using

#### Basic usage
In your React app:

```JSX
import ReactChromakeyedImage from 'react-chromakeyed-image';

...
    <h3>Original</h3>
    <img src="/static/240px-face.png" />

    <h3>Chromakeyed</h3>
    <ReactChromakeyedImage 
      src="/static/240px-face.png" 
      findColor="#fede58" 
      replaceColor="#FF0000" 
    />
...
```
![Basic usage](https://raw.githubusercontent.com/themillhousegroup/react-chromakeyed-image/master/docs/images/basic.png)

Notes:
- All instances of color `findColor` will be replaced with `replaceColor`.
- Note that you can use `#rrggbb`, `#rrggbbaa`, `#rgb` or `#rgba` forms of specifying a color.
- If you omit the Alpha channel, it will be assumed to be `0xFF`.

#### Adding Tolerance
You've probably observed some "fringes" or artifacts in the above transformed image. Unless you have very tight control over your source images (e.g. they are machine-generated), you'll need to add the `tolerance` prop, which specifies a plus-or-minus range to be applied to each `r`, `g`, `b`, and `a` value in the `findColor`.


```JSX
import ReactChromakeyedImage from 'react-chromakeyed-image';

...
    <h3>Original</h3>
    <img src="/static/240px-face.png" />

    <h3>Chromakeyed [Tolerant]</h3>
    <ReactChromakeyedImage 
      src="/static/240px-face.png" 
      findColor="#fede58" 
      replaceColor="#FF0000" 
      tolerance={10}
    />
...
```
![With tolerance](https://raw.githubusercontent.com/themillhousegroup/react-chromakeyed-image/master/docs/images/tolerant.png)

#### Using a color replacement map 
If you need to transform more than one color, supply a `colorReplacementMap` prop, using `#rrggbb[aa]`-style colors as before:

```JSX
import ReactChromakeyedImage from 'react-chromakeyed-image';

...
    <h3>Original</h3>
    <img src="/static/240px-face.png" />

    <h3>Chromakeyed [Mapped]</h3>
    <ReactChromakeyedImage 
      src="/static/240px-face.png" 
      colorReplacementMap={{ "#fede58": "#00FF00", "#871945": "#00f"}}
    />
...
```
![Mapped](https://raw.githubusercontent.com/themillhousegroup/react-chromakeyed-image/master/docs/images/mapped.png)


#### Color replacement map with tolerance
To avoid the fringing effects visible in the above image, you can add the `tolerance` prop when using a `colorReplacementMap` too:

```JSX
import ReactChromakeyedImage from 'react-chromakeyed-image';

...
    <h3>Original</h3>
    <img src="/static/240px-face.png" />

    <h3>Chromakeyed [Mapped, Tolerant]</h3>
    <ReactChromakeyedImage 
      src="/static/240px-face.png" 
      colorReplacementMap={{ "#fede58": "#00FF00", "#871945": "#00f"}}
      tolerance={20} 
    />
...
```
![Mapped-Tolerant](https://raw.githubusercontent.com/themillhousegroup/react-chromakeyed-image/master/docs/images/mapped-tolerant.png)

#### Custom replacement function
Sometimes, what you need to do can't be expressed with a static map. For those times, you can supply a function as the `replacementFunction` prop. The function takes 3 arguments, as per the following TypeScript declarations:

```TypeScript
export type RGBAPixel = {
  r: number; 
  b: number; 
  g: number;
  a: number;
}

export type PixelReplacementFunction = (pixel: RGBAPixel, x:number, y:number) => RGBAPixel;
```
The first argument is the original `{r, g, b, a}` value of the pixel. Then come the `x` and `y` co-ordinates of that pixel. The function should always return a pixel in the form `{r, g, b, a}`, even if no change was made to it.

This allows you to apply different replacements depending on the co-ordinates within the image, as in the following example, which only makes changes to a small horizontal band of pixels, leaving all others unchanged:

```JSX
import ReactChromakeyedImage from 'react-chromakeyed-image';

...
    <h3>Original</h3>
    <img src="/static/240px-face.png" />

    <h3>Chromakeyed [Custom function]</h3>
    <ReactChromakeyedImage 
      src="/static/240px-face.png"    
      replacementFunction={ ( { r,g,b,a }, x, y ) => { 
        if ( y > 50 && y < 120) {
          return { r: 0x30, g: 0x30, b: 0x30, a};
        }
        return { r, g, b, a };
      }}
    />
...
```
![Custom](https://raw.githubusercontent.com/themillhousegroup/react-chromakeyed-image/master/docs/images/custom.png)

### Other features
#### Props are spread
Any props you give to `ReactChromakeyedImage` will be spread onto the underlying HTML `canvas`, so you can control the overall appearance of the image however you like; e.g.:

```JSX
  <h3>Original</h3>
  <img src="/static/240px-face.png" />

  <h3>Chromakeyed (and styled)</h3>
  <ReactChromakeyedImage
    style={{width: '100px', 
            height: '100px',
            border: '3px solid black', 
            borderRadius: '8px' }} 
    src="/static/240px-face.png"
    findColor="#fede58"
    replaceColor="#FF0000" 
  />
```

![Styled](https://raw.githubusercontent.com/themillhousegroup/react-chromakeyed-image/master/docs/images/styled.png)

#### Utility functions for working with `RGBAPixel`s and color strings
Check out `PixelUtils` and `ColorStringUtils` for functions that might be useful when writing your own custom pixel replacement functions.






