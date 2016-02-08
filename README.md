# cf-imgSwap

Automatically change image or background-image src based on breakpoints and @2x support.

## Installation

Include dist/cf-imgswap.js on your page.

```
<script src="dist/cf-imgswap.js"></script>
```
or as a CommomJS Module
```
var cf = require(cf-imgswap);
```

## Usage

Just run cf.imgSwap
```
var responsiveImages = cf.imgSwap();
```

## Example

By default cf-imgSwap will take all images and background images on your page that have a class of '.cf-responsive' and change the source for you depending on breakpoints. 

For example:
```
This
<img src="test.jpg" class="cf-responsive">

Will become this @ our medium breakpoint:
<img src="test-med.jpg" class="cf-responsive">

Which will become this @ our large breakpoint:
<img src="test-large.jpg" class="cf-responsive">

Or this @ our large breakpoint WITH retina support:
<img src="test-large@2x.jpg" class="cf-responsive">
```


## Options 

Here are the options you can pass to imgSwap when you initialize it and their defaults.
```
var defaultOpts = {
  responsiveClass: '.cf-responsive',
  mediumSuffix: '-med',
  largeSuffix: '-large',
  retinaSuffix: '@2x',
  addMediumSuffix: true,
  addLargeSuffix: true,
  addRetinaSuffix: true,
  smallBrowserWidth: 600,
  mediumBrowserWidth: 1025,
  largeBrowserWidth: 1280
};
```

if you dont want to add the @2x suffix when on retina displays, just do
```
var responsiveImages = cf.imgSwap({addRetinaSuffix: false});
```

if you want to change the class thats used to detect responsive images do this
```
var responsiveImages = cf.imgSwap({responsiveClass: '.my-resposive-class'});
```

## Dev

* run `npm install`
* run `npm start` to build/watch from the /es6 directory
* run `npm test` to run qUnit tests.
