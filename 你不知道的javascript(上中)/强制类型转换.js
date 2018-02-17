//JavaScript 中的强制类型转换总是返回标量基本类型值，如字 符串、数字和布尔值，不会返回对象和函数。
var a = 42;
var b = a + ""; //隐性
var c = String(a); //显型

var a = 2;
a.toString(); //'2'
//抽象操作 ToString，它负责处理非字符串到字符串的强制类型转换。
//基本类型值的字符串化规则为:null 转换为 "null"，undefined 转换为 "undefined"，true 转换为 "true"。
//对普通对象来说，除非自行定义，否则 toString()(Object.prototype.toString())返回 内部属性 [[Class]] 的值,eg:"[object Object]"
//如果对象有自己的 toString() 方法，字符串化时就会调用该方法并 使用其返回值。
var a = 'lee';
a.toString(); //'lee'
//数组的默认 toString() 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起 来:
var a = [1, 2, 3]
a.toString(); //'1,2,3'
//toString() 可以被显式调用，或者在需要字符串化时自动调用。

//JSON
JSON.stringify(42); //'42'
JSON.stringify("42"); // ""42""(含有双引号的字符串) 
JSON.stringify(null); // "null"
JSON.stringify(true); // "true"
//所有安全的 JSON 值(JSON-safe)都可以使用 JSON.stringify(..) 字符串化。安全的 JSON 值是指能够呈现为有效 JSON 格式的值。
//undefined、function、symbol (ES6+)和包含循环引用(对象之间相互引用，形成一个无限循环)的对象都不符合 JSON结构标准，支持 JSON 的语言无法处理它们。JSON.stringify(..) 在对象中遇到 undefined、function 和 symbol 时会自动将其忽略，在数组中则会返回 null(以保证单元位置不变)。
JSON.stringify(undefined); //undefined
JSON.stringify(function() {}); //undefined
JSON.stringify([1, undefined, function() {}, 4]); //"[1,null,null,4]"
JSON.stringify({
	a: 2,
	b: function() {}
}) //"{"a":2}"
//对包含循环引用的对象执行 JSON.stringify(..) 会出错。
var o = {};
var a = {
	b: 42,
	c: o,
	d: function() {}
}
// 在a中创建一个循环引用
o.e = a;

var o = {};
var a = {
	b: 42,
	c: o,
	d: function() {}
}
// 在a中创建一个循环引用
o.e = a;
// 循环引用在这里会产生错误 
// JSON.stringify( a );
// 自定义的JSON序列化 
a.toJSON = function() {
	// 序列化仅包含b
	return {
		b: this.b
	};
};
JSON.stringify(a); // "{"b":42}"

//toJSON() 返回的应该是一个适当的值，可以是任何 类型，然后再由 JSON.stringify(..) 对其进行字符串化。也就是说，toJSON() 应该“返回一个能够被字符串化的安全的 JSON 值”，而不是“返回 一个 JSON 字符串”。

 var a = {
         val: [1,2,3],
// 可能是我们想要的结果! 
toJSON: function(){
             return this.val.slice( 1 );
         }
};
     var b = {
         val: [1,2,3],
// 可能不是我们想要的结果!这里第二个函数是对 toJSON 返回的字符串做字符串化，而非数组本身。
toJSON: function(){
             return "[" +
                 this.val.slice( 1 ).join() +
"]"; }
     };
     JSON.stringify( a ); // "[2,3]"
     JSON.stringify( b ); // ""[2,3]""

/*我们可以向 JSON.stringify(..) 传递一个可选参数 replacer，它可以是数组或者函数，用 来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除，和 toJSON() 很像。
如果 replacer 是一个数组，那么它必须是一个字符串数组，其中包含序列化要处理的对象 的属性名称，除此之外其他的属性则被忽略。
如果 replacer 是一个函数，它会对对象本身调用一次，然后对对象中的每个属性各调用 一次，每次传递两个参数，键和值。如果要忽略某个键就返回 undefined，否则返回指定 的值。
 */
var a = {
	b:32,
	c:'lee',
	d:[1,2,3]
}
JSON.stringify(a,['b','c'])//"{"b":32,"c":"lee"}"
JSON.stringify(a,function(k,v){
	if(k !== 'c') return v;
})
//"{"b":32,"d":[1,2,3]}"
//如果 replacer 是函数，它的参数 k 在第一次调用时为 undefined(就是对对象 本身调用的那次)。if 语句将属性 "c" 排除掉。由于字符串化是递归的，因 此数组 [1,2,3] 中的每个元素都会通过参数 v 传递给 replacer，即 1、2 和 3， 参数 k 是它们的索引值，即 0、1 和 2。
//JSON.string 还有一个可选参数 space，用来指定输出的缩进格式。space 为正整数时是指定 每一级缩进的字符数，它还可以是字符串，此时最前面的十个字符被用于每一级的缩进:
var a = {
	b:42,
	c:'42',
	d:[1,2,3]
}
JSON.stringify(a,null,3);
/*
 "{
   "b": 42,
   "c": "42",
   "d": [
      1,
      2,
      3
   ]
}"
  */
  JSON.stringify( a, null, "-----" );
  /*
   "{
-----"b": 42,
-----"c": "42",
-----"d": [
----------1,
----------2,
----------3
-----]
}"
   */
  //JSON.stringify(..) 并不是强制类型转换。
  //(1) 字符串、数字、布尔值和 null 的 JSON.stringify(..) 规则与 ToString 基本相同。
//(2) 如果传递给 JSON.stringify(..) 的对象中定义了 toJSON() 方法，那么该方法会在字符串化前调用，以便将对象转换为安全的 JSON 值。\n

//ToNumber
/*对象(包括数组)会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型 值，则再遵循以上规则将其强制转换为数字。
为了将值转换为相应的基本类型值，抽象操作 ToPrimitive会首先 (通过内部操作 DefaultValue)检查该值是否有 valueOf() 方法。 如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString()的返回值(如果存在)来进行强制类型转换。
如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。
使用 Object.create(null) 创建的对象 [[Prototype]] 属性为 null，并且没 有 valueOf() 和 toString() 方法，因此无法进行强制类型转换。
 */
var a = {
	valueOf:function(){
		return '42'
	}
};
var b = {
	valueOf :function(){
		return '42'
	}
};
var c = [4,2];
c.toString = function(){
	return this.join("");//"42"
}
Number(a);//42
Number( b );//42
Number( c );//42
Number( "" );//0
Number( [] );//NAN

//Toboolean
//JavaScript 中的值可以分为以下两类: (1) 可以被强制类型转换为 false 的值(2) 其他(被强制类型转换为 true 的值)
/*
  undefined
• null
• false
• +0、-0 和 NaN
• ""
假值对象看起来和普通对象并无二致(都有属性，等等),假值的布尔强制类型转换结果为 false。
 */
//假值对象
var a = new Boolean(false);//true
var b = new Number(0);//true
var c = new String("")//true
d = a&&b&&c;//string
var d = Boolean(a&&b&&c)//true
//虽然 JavaScript 代码中会出现假值对象，但它实际上并不属于 JavaScript 语 言的范畴。浏览器在某些特定情况下，在常规 JavaScript 语法基础上自己创建了一些外来(exotic) 值，这些就是“假值对象”。


