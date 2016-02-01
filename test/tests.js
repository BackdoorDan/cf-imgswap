var loc = window.location.href.slice(0, -9);

var testImgName = 'cs-halo';
var testImgExtension = 'jpg';
var testImg = 'img/cs-halo.jpg';

var mockWindow = function(width, height){
  
  var width = width || 600;
  var height = height || 600;
  
  window.innerWidth = width;
  window.innerHeight = height;
}


QUnit.test( 'cubicflow.extend', function(assert){
  
  var cf = cubicflow.init();
 
  ok(typeof cf.imgSwap === 'function', 'cf.imgswap is a function');

});

QUnit.test( 'ImgList class', function(assert){
  

  var cf = cubicflow.init();

  var imgList = cf.imgSwap();
  ok(imgList.opts, 'imageList.Options are created');
  ok(imgList.responsiveImages, 'imageList.responsiveImages array is created');
  ok(typeof imgList.swapImgs == 'function', 'imageList.swapImgs is a function');
  ok(typeof imgList.reflow == 'function', 'imageList.reflow is a function');
  ok(typeof imgList.imageIsAlreadyInArray == 'function', 'imageList.imageIsAlreadyInArray is a function');
  
  
  var responsiveImage = imgList.responsiveImages[0];
  ok(typeof responsiveImage.swapSrc == 'function', 'ResponsiveImage.swapSrc is a function');
  ok(typeof responsiveImage.getNewSrc == 'function', 'ResponsiveImage.getNewSrc is a function');
  
});


QUnit.test( 'ResponsiveImage class', function(assert){
  

  var cf = cubicflow.init();
  var imgList = cf.imgSwap();  
  var responsiveImage = imgList.responsiveImages[0];
  var responsiveBgImage = imgList.responsiveImages[1];
  
  ok(typeof responsiveImage.swapSrc == 'function', 'ResponsiveImage.swapSrc is a function');
  ok(typeof responsiveImage.getNewSrc == 'function', 'ResponsiveImage.getNewSrc is a function');
  
  equal(typeof responsiveImage.elem, 'object', 'responsiveImg.elem is an object');
  equal(responsiveImage.type, 'img', 'responsiveImg.type is set correctly for img element');
  equal(responsiveImage.src, loc + testImg, 'responsiveImg.src is set correctly for img element');
  equal(responsiveImage.filename, testImgName, 'responsiveImg.filename is set correctly for img element');
  equal(responsiveImage.extension, testImgExtension, 'responsiveImg.extension is set correctly for img element');
  
  equal(responsiveBgImage.type, 'div', 'responsiveImg.type is set correctly for div element');
  equal(responsiveBgImage.src, loc + testImg, 'responsiveImg.src is set correctly for div element');
  equal(responsiveBgImage.filename, testImgName, 'responsiveImg.filename is set correctly for div element');
  equal(responsiveBgImage.extension, testImgExtension, 'responsiveImg.extension is set correctly for div element');
  
});



QUnit.test( 'Small breakpoint w/ no options', function(assert){
  

  var cf = cubicflow.init();
  cf.isRetina = function(){return false};
  mockWindow(500, 500);
  var images = document.querySelectorAll('.cf-responsive');
  
  equal(images[0].src, loc + 'img/cs-halo.jpg', 'image src is correct on init');
  
  cf.imgSwap();
  
  equal(images[0].src, loc + 'img/cs-halo.jpg', 'img src is same');
  
});


QUnit.test( 'medium breakpoint w/ no options', function(assert){
  
  var cf = cubicflow.init();
  var images = document.querySelectorAll('.cf-responsive');
  cf.isRetina = function(){ return false; };
  mockWindow(700);
  
  equal(images[0].src, loc + 'img/cs-halo.jpg', 'image src is correct on init');
  
  cf.imgSwap();
  
  equal(images[0].src, loc + 'img/cs-halo-med.jpg', 'image src is correct on init');
  
});


QUnit.test( 'large breakpoint w/ no options', function(assert){
  
  var cf = cubicflow.init();
  var images = document.querySelectorAll('.cf-responsive');
  cf.isRetina = function(){ return false; };
  mockWindow(1200);
  
  equal(images[0].src, loc + 'img/cs-halo.jpg', 'image src is correct on init');
  
  cf.imgSwap();
  
  equal(images[0].src, loc + 'img/cs-halo-large.jpg', 'image src is correct on init');
  
});


QUnit.test( 'Call cf.imgswap twice', function(assert){
  
  var cf = cubicflow.init();
  var images = document.querySelectorAll('.cf-responsive');
  cf.isRetina = function(){return false};
  mockWindow(700, 700);
  
  equal(images[0].src, loc + 'img/cs-halo.jpg', 'image src is correct on init');
  
  cf.imgSwap();
  cf.imgSwap({responsiveClass: '.cf2-responsive'});
  
  equal(images[0].src, loc + 'img/cs-halo-med.jpg', 'img src is same');
  
});


QUnit.test( 'test reflow', function(assert){
  var cf = cubicflow.init();
  var images = document.querySelectorAll('.cf-responsive');
  cf.isRetina = function(){return false};
  mockWindow(700, 700);
  
  var testImages = cf.imgSwap();
  
  equal(images[0].src, loc + 'img/cs-halo-med.jpg', 'img src is correct on med w/ no retina');
  
  testImages.reflow();
  
  equal(images[0].src, loc + 'img/cs-halo-med.jpg', 'existing imgs stay the same after reflow');
  
  var fixture = document.querySelector('#qunit-fixture');
  var newImgHTML = '<img src="img/cs-halo.jpg" class="cf-responsive">';
  fixture.insertAdjacentHTML('beforeend', newImgHTML);
  
  ok(testImages.reflow().responsiveImages.length == 3, 'New image was added to array');
  images = document.querySelectorAll('.cf-responsive');
  equal(images[0].src, loc + 'img/cs-halo-med.jpg', 'existing imgs stay the same after reflow');

});
