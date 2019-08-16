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
      <h1>Original</h1>
      <img src="/static/240px-face.png" />

      <h1>Chromakeyed</h1>
      <ReactChromakeyedImage 
        src="/static/240px-face.png" 
        findColor="#fede58" 
        replaceColor="#FF0000" />
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
      <h1>Original</h1>
      <img src="/static/240px-face.png" />

      <h1>Chromakeyed [Tolerant]</h1>
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
      <h1>Original</h1>
      <img src="/static/240px-face.png" />

      <h1>Chromakeyed [Tolerant]</h1>
      <ReactChromakeyedImage 
        src="/static/240px-face.png" 
        colorReplacementMap={{ "#fede58": "#00FF00", "#871945": "#00f"}}
      />
...
```
![Mapped](https://raw.githubusercontent.com/themillhousegroup/react-chromakeyed-image/master/docs/images/mapped.png)





