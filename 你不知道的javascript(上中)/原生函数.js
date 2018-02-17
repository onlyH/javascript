//内建对象 === 原生对象
/*
String()
Number()
Boolean()
Array()
Object()
Function()
RegExp()
Date()
Error()
Symbol()
*/

var a = new String('hello world');
console.log(s.toString()); //hello world

var a = new String('abc'); //构造函数创建出来的是封装了基本类型（abc）的封装对象
typeof a; //object，对象类型的子类型
a instanceof String; //true
Object.prototype.toString.call(); //[object string]
//所有 typeof 返回值为 "object" 的对象(如数组)都包含一个内部属性 [[Class]]
Object.prototype.toString.call([1, 2, 3]); //[object array]
Object.prototype.toString.call(/regex-literal/i) //"[object RegExp]"
Object.prototype.toString.call(unll); //"[object Null]"
Object.prototype.toString.call(undefined); //"[object undefined]"

Object.prototype.toString.call("abc"); // "[object String]"
Object.prototype.toString.call(42); // "[object Number]"
Object.prototype.toString.call(true); // "[object Boolean]"

//封装对象(object wrapper)扮演着十分重要的角色。由于基本类型值没有 .length 和 .toString() 这样的属性和方法，需要通过封装对象才能访问，此时 JavaScript 会自动为 基本类型值包装(box 或者 wrap)一个封装对象:
var a = 'abc';
a.length; //3
a.toUpperCase(); //'ABC'
//如果想要自行封装基本类型值，可以使用 Object(..) 函数(不带 new 关键字):
var a = "abc";
var b = new String(a);
var c = Object(a);
typeof a; // "string"
typeof b; // "object"
typeof c; // "object"
b instanceof String; // true
c instanceof String; // true
Object.prototype.toString.call(b); // "[object String]"
Object.prototype.toString.call(c); // "[object String]"

//拆封 如果想要得到封装对象中的基本类型值，可以使用 valueOf() 函数:
var a = new Number(33);
var b = new String('lalala');
var c = new Boolean(true);

a.valueOf(); //33
b.valueOf(); //'lalala'
c.valueOf(); //true

var a = new String('abc');
//var b = a;//string
var b = a + ''; //abc
typeof a; //object
typeof b; //string

//尽量使用常量避免使用构造函数
var a = new Array(1, 2, 3);
a; //123
var a = [1, 2, 3];
a; //1,2,3

Array(1, 2, 3) === new Array(1, 2, 3)(写法)

//Array 构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度(length)，而 非只充当数组中的一个元素。
var a = new Array(5) //5
var a = new Array(2, 3) //2,3

var a = new Array(3);
a.length; //3
a; //[undefined*3]

var a = Array.apply(null, {
	length: 3
});
a; // [ undefined, undefined, undefined ]

//apply(..) 是一个工具函数，适用于所有函数对象，它会以一种特殊的方式来调用传递给 它的函数。
//永远不要创建和使用空单元数组。
//同样，除非万不得已，否则尽量不要使用 Object(..)/Function(..)/RegExp(..):
var c = new Object();
c.foo = 'bar';
c; //

var d = new Function('a', 'return a*2');
var f = function(a) {
	return a * 2
};

function g(a) {
	return a * 2
}
var h = new RegExp('^a*b+', 'g');
var i = /^a*b+/g;
//在实际情况中没有必要使用new Object()来创建对象，因为这样就无法像常量形式那样一 次设定多个属性，而必须逐一设定。
var a = new Date.now();

//polyfill:
if(!Data.now) {
	Date.now = function() {
		return(new Date()).getTime()
	}
}

//如果调用 Date() 时不带 new 关键字，则会得到当前日期的字符串值;
//构造函数 Error(..)带不带 new 关键字都可。
//创建错误对象(error object)主要是为了获得当前运行栈的上下文(大部分 JavaScript 引擎 通过只读属性 .stack 来访问)。栈上下文信息包括函数调用栈信息和产生错误的代码行号， 以便于调试(debug)。

//错误对象通常与 throw 一起使用:
function foo() {
	if(!x) {
		throw new Error('x wasn'
			t provided);
	}
	//...
}
//通常错误对象至少包含一个 message 属性，有时也不乏其他属性(必须作为只读属性访 问)，如 type。除了访问 stack 属性以外，最好的办法是调用(显式调用或者通过强制类 型转换隐式调用，)toString() 来获得经过格式化的便于阅读的错误信息。
//使用 Symbol(..) 原生构造函数来自定义符号。但它比较特殊，不能带 new 关键字，否则会出错:
var a = Symbol('hello world');
a; //Symbol(hello world)
a.toString(); //"Symbol(hello world)"
typeof a; //symbol

var b = {};
b[a] = 'foobar';
Object.getOwnPropertySymbols(a); // [ Symbol(my own symbol) ]
//虽然符号实际上并非私有属性(通过 Object.getOwnPropertySymbols(..) 便可以公开获得 对象中的所有符号)，但它却主要用于私有或特殊属性。
//符号并非对象，而是一种简单标量基本类型。

//原生原型：根 据 文 档 约 定， 我 们 将 String.prototype.XYZ 简 写 为 String#XYZ， 对 其 他 .prototypes 也同样如此。

var a = 'abc';
a.indexOf('c') //3
a.toUpperCase() //ABC
a.trim() //abc

typeof Function.prototype; //function
Function.prototype(); //undefined
RegExp.prototype.toString(); //"/(?:)/"
"abc".match(RegExp.prototype); //[""]

Array.isArray(Array.prototype); //true
Array.prototype.push(1, 2, 3); //3
Array.prototype; //[1,2,3]
//Function.prototype 是一个函数，RegExp.prototype 是一个正则表达式，而 Array. prototype 是一个数组。

//将原型作为默认值
function abc(vals, fn, rx) {
	vals = vals || Array.prototype;
	fn = fn || Function.prototype;
	rx = rx || RegExp.prototype;
	return rx.test(vals.map(fn).join(""));
}
abc(); //true
abc(
	["a", "b", "c"],
	function(v) {
		return v.toUpperCase()
	},
	/D/
);
//false

//JavaScript 为基本数据类型值提供了封装对象，称为原生函数(如 String、Number、Boolean 等)。它们为基本数据类型值提供了该子类型所特有的方法和属性(如:String#trim() 和 Array#concat(..))。