QUnit.test('cubicflow is extended with imgswap', function(assert){
  
  var cf = cubicflow.init();
  
  assert.equal(typeof cf.imgswap, 'function', 'cf.imgswap is a function');
  
  window.images = cf.imgswap();
});