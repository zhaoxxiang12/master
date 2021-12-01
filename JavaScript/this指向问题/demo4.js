/**
 * apply和call调用模式
 * 
 * JS中，函数也是对象，所有函数对象都有两个方法：apply和call，这两个方法可以让我们构建一个参数数组传递给调用函数，也允许我们改变this的值
 */

var name = 'window';
var o = {
  name:'obj'
}

function sayName () {
  console.log(this.name);
}
sayName();// window
sayName.apply(o);//obj
sayName.call(o);//obj
sayName.apply()//window
sayName.call()//window
//在全局范围内，this指向全局对象（浏览器下指window对象）

//对象函数调用时，this指向当前对象

//全局函数调用时，应该是指向调用全局函数的对象。

//使用new关键字实例化对象时，this指向新创建的对象