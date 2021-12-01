/**
 * 方法调用
 */

var c = {
  name:'hello',
  sayName: function() {
    console.log(this.name);
  }
}
c.sayName(); //hello,这里的this指向对象是o，因为调用了这个sayName()函数是通过o.sayName()执行的

var o = {
  name:'hello',
  b: {
    name:'world',
    fn: function () {
      console.log(this.name);// world
      console.log(this); //b这个对象
    }
  }
}
o.b.fn() //因为是o.b调用的这个函数,所以指向b这个对象

var a = {
  name:'hello',
  b: {
    fn:function() {
      console.log(this.name);//undefined
      console.log(this);//a这个对象
    }
  }
}
a.b.fn(); //因为o.b调用的这个函数,所以指向b这个对象

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
var t = o.b.fn;
t() //全局变量,在全局环境下执行,this指向window