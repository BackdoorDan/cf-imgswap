# cf-base

Cubicflow base helper functions for detecting browser size & resolution

## Installation

```
var cubicflow = require(cf-base);
```

or include dist/cf-base.js on your page which will expose the cubicflow global

```
<script src="dist/cf-base.js"></script>
```

## Usage

Initialize cf with defaults
```
var cf = cubicflow.init();
```

Or with options
```
var options = {
   smallBrowserWidth: 700,
   mediumBrowserWidth: 1200,
   largeBrowserWidth: 1920
};

var cf = cubicflow.init(options);
```

Then you have access to all the helper methods

```
cf.isRetina() // will return true if retina display

cf.isMobile // will return true if on a mobile device (Ipads counted)

cf.isSmallBrowser // will return true if the viewport is within our small breakpoint (default 0px-600px)

cf.isMediumBrowser // will return true if the viewport is within our medium breakpoint (default 600-1025px)

cf.isLargeBrowser // will return true if the viewport is within our large breakpoint (default 1025+px)
```

## Dev

* run `npm install`
* run `npm start` to build/watch from the /src directory
* run `npm test` to run qUnit tests.