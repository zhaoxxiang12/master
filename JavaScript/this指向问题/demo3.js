var name = '我是最外面的name';
var d = {
  name:'hello',
  b: {
    name:'world',
    fn:function () {
      console.log(this.name); //我是最外面的name
      console.log(this);//windows对象
    }
  }
}
var t = d.b.fn;
// t()//全局变量,在全局环境下执行,this指向window

/**
 * 构造函数调用模式
 */

function fn () {
  console.log(this); //fn{}  在构造函数，new出一个对象时，this指向这个构造函数，new关键字会改变this的指向
}
var a = new fn();

function thisFn () {
  this.name = 'hello'
}

var f = new thisFn ();
console.log(f.name); //hello  


// 当用new关键字，返回的是一个对象，this指向的就是那个返回的对象；
// 如果返回的不是对象，this还是指向函数的实例，虽然null属于对象，但是返回null依然指向函数实例

function newFn () {
  this.name = 'hello'
  return{}
}
var newName = new newFn()
console.log(newName.name); //undefined


function testFn () {
  this.name = 'hello';
  return function () {

  };
}

var dd = new testFn();
console.log(dd.name); //undefined

function testValue () {
  this.name = 'hello';
  return 1;
}

var cc = new testValue();
console.log(cc.name); //name

function testValue2 () {
  this.name = 'hello';
  return undefined;
}

var cc2 = new testValue2();
console.log(cc2.name);

function testThis () {
  this.name = 'hello';
  return [];
}

var rr = new testThis();
console.log(rr.name);// undefined