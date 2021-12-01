/**
 * 函数调用模式
 */
function a() {
  var a = 'hello';
  console.log(this.hello);
  console.log(this);
}
a();