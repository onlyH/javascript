var a = [1, '2', [3]];
a.length; //3
a[0] === 1; //true
a[2][0] === 3; //true

var a = [];
a.length; //0
a[0] = 1;
a[1] = '2';
a[2] = [3];
a.length; //3

//delete运算符可以将单元从数组中删除，但是length并不会发生变化

var a = [];
a[0] = 1;
a[2] = [3];
a[1]; //undefined
a.length; //3
//数组通过数字进行索引，也是对象，所以也可以包含字符串键值和属性 (但这些并不计算在数组长度内):
var a = [];
a[0] = 1;
a['foobar'] = 2;
a.length; //1
a['foobar']; //2
a.foobar; //2
//注意，如果字符串键值能够被强制类型转换为十进制数字的话，它 就会被当作数字索引来处理。
var a = [];
a['13'] = 42;
a.length; //14
//在数组中加入字符串键值 / 属性并不是一个好主意。建议使用对象来存放键值 / 属性值， 用数组来存放数字索引值。

//slice(..)转换：
function foo() {
	var arr = Array.prototype.slice.call(arguments);
	arr.push('bam');
	console.log(arr)
};
foo('bar', 'baz'); //(3) ["bar", "baz", "bam"]

//es6的内置工具函数Array.form(..)也能实现同样的功能
function foo() {
	var arr = Array.from(arguments);
	console.log(arr)
}
foo('bar', 'baz') //(2) ["bar", "baz"]

var a = 'bar,zzz,sss,fff';
a.split(','); //(4) ["bar", "zzz", "sss", "fff"]

var a = 'foo';
var b = ['f', 'o', 'o'];
a.length; //3
b.length; //3

a.indexOf('o'); //1
b.indexOf('o'); //1

var c = a.concat('bar'); //"foobar"
var d = b.concat(['b', 'a', 'r']); //(6) ["f", "o", "o", "b", "a", "r"]

a === c; //false
b === c; //false
a; //'foo'
b; //(3) ["f", "o", "o"]

a[1] = 'o'; === a.charAt(1)
b[1] = 'o'; === b.charAt(1)
a; //'foo'
b; //['f','o','o'];
//Js中字符串是不可变的，而数组是可变的。

//字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符 串。而数组的成员函数都是在其原始值上进行操作。
c = a.toUpperCase();
a === c; //false
a; //'foo'
c; //'FOO'

b.push('!');
b; //["f","O","o","!"]

//许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但可以通过“借用”数 组的非变更方法来处理字符串:
a.join; //undefined
a.map; //undefined

var c = Array.prototype.join.call(a, '-');
var d = Array.prototype.map.call(a, function(v) {
	return v.toUpperCase() + '.';
}).join('');
c; //"f-o-o"
d; //"F.O.O."

//数组有一个字符串没有的可变更成员函数 reverse():
a.reverse; //undefined
b.reverse(); // ["!","o","O","f"]
b; // ["f","O","o","!"]

//一个变通(破解)的办法是先将字符串转换为数组，待处理完后再将结果转换回字符串:
var c = a.split('').reverse().join('');

//数字
var a = 42;
var b = 42.3;

var a = 0.42;
var b = .42;

var a = 42.0;
var b = 42.;

var a = 42.300;
var b = 42.0;
a; //42.3
b; //42

var a = 5E10;
a; // 50000000000
a.toExponential(); // "5e+10"

var b = a * a;
b; // 2.5e+21
var c = 1 / a;
c; // 2e-11

//由于数字值可以使用 Number 对象进行封装，因此数字值可以调用 Number.prototype 中的方法。例如，tofixed(..) 方法可指定小数部分的显示位数:输出结果实际上是给定数字的字符串形式，如果指定的小数部分的显示 位数多于实际位数就用 0 补齐。
var a = 42.59;
a.toFixed(0); //'43'
a.toFixed(1); // "42.6"
a.toFixed(2); // "42.59"
a.toFixed(3); // "42.590"
a.toFixed(4); // "42.5900"

//toPrecision(..) 方法用来指定有效数位的显示位数: 不仅适用于数字变量，也适用于数字常量。不过对于 . 运算符需要给予特别注 意，因为它是一个有效的数字字符，会被优先识别为数字常量的一部分，然后才是对象属 性访问运算符。
var a = 42.59;
a.toPrecision(1);
a.toPrecision(2); // "43"
a.toPrecision(3); // "42.6"
a.toPrecision(4); // "42.59"
a.toPrecision(5); // "42.590"
a.toPrecision(6); // "42.5900"

42. toFixed(3); // SyntaxError
(42).toFixed(3); //42.000
(42).toFixed(3); // "42.000" 
0.42.toFixed(3); // "0.420" 
42..toFixed(3); // "42.000"
42. toFixed(3); // "42.000"(空格)

var box = 20; //十进制
var box = 070; //八进制，必须前面是0，后面是0到7序列
var box = 0x1F; //十六进制，必须前面是0x，后面是0到9，A-F序列

//ES6 支持以下新格式:
0o363; // 243的八进制
0O363; // 同上 0b11110011; // 243的二进制
0B11110011; // 同上

//机械精度，值2^-52，设置一个误差范围，判断小数
//polyfill:
if(!Number.EPSILON) {
	Number.EPSILON = Math.pow(2, -52)
}

function abc(n1, n2) {
	return Math.abs(n1 - n2) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;

abc(a, b); //true
abc(0.001, 0.002) //false
/*数字的呈现方式决定了“整数”的安全值范围远远小于 Number.MAX_VALUE。
能够被“安全”呈现的最大整数是2^53 - 1，即9007199254740991，在ES6中被定义为 Number.MAX_SAFE_INTEGER。 最 小 整 数 是 -9007199254740991， 在 ES6 中 被 定 义 为 Number. MIN_SAFE_INTEGER。
  // true
 
 有时 JavaScript 程序需要处理一些比较大的数字，如数据库中的 64 位 ID 等。由于 JavaScript 的数字类型无法精确呈现 64 位数值，所以必须将它们保存(转换)为字符串。
  */
//要检测一个值是否是整数，可以使用 ES6 中的 Number.isInteger(..) 方法:
Number.isInteger(42); //true
Number.isInteger(42.000); //true
Number.isInteger(43.33); //false

//为 ES6 之前的版本 polyfill Number.isInteger(..) 方法:
if(!Number.isInteger()) {
	Number.isInteger = function(num) {
		return typeof num == 'number' && num % 1 == 0
	}
}

//要检测一个值是否是安全的整数，可以使用 ES6 中的Number.isSafeInteger(..) 方法:
Number.isSafeInteger(Number.MAX_SAFE_INTEGER); //true
Number.isSafeInteger(Math.pow(2, 53)); // true
Number.isSafeInteger(Math.pow(2, 53) - 1); // false
// polyfill Number.isSafeInteger(..) 方法:
if(!Number.isSafeInteger) {
	Number.isSafeInteger = function(num) {
		return Number.isSafeInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER
	}
}
//a | 0可以将变量a中的数值转换为32位有符号整数，因为数位运算符|只适用于32位 整数(它只关心 32 位以内的值，其他的数位将被忽略)。因此与 0 进行操作即可截取 a 中 的 32 位数位。

//某些特殊的值并不是 32 位安全范围的，如 NaN 和 Infinity，此时会对它们执行虚拟操作(abstract operation)ToInt32,以便转换为符合数位运算符要求的 +0 值。

/*undefined 类型只有一个值，即 undefined。null 类型也只有一个值，即 null。它们的名
称既是类型也是值。
undefined 和 null 常被用来表示“空的”值或“不是值”的值。二者之间有一些细微的差 别。例如:
• null 指空值(empty value)
• undefined 指没有值(missing value)
或者:
• undefined 指从未赋值
• null 指曾赋过值，但是目前没有值
null 是一个特殊关键字，不是标识符，我们不能将其当作变量来使用和赋值。然而
undefined 却是一个标识符，可以被当作变量来使用和赋值。
 */

/*void 运算符
undefined 是一个内置标识符(除非被重新定义)，它的值为 undefined， 通过 void 运算符即可得到该值。
表达式void ___没有返回值，因此返回结果是undefined。void并不改变表达式的结果， 只是让表达式不返回值:
     var a = 42;
     console.log( void a, a ); // undefined 42
按惯例我们用void 0来获得undefined(这主要源自C语言，当然使用void true或其他 void 表达式也是可以的)。void 0、void 1 和 undefined 之间并没有实质上的区别。
void 运算符在其他地方也能派上用场，比如不让表达式返回任何结果(即使其有副作用)。
 */

/*NaN 意指“不是一个数字”(not a number)，这个名字容易引起误会，后面将会提到。将它 理解为“无效数值”“失败数值”或者“坏数值”可能更准确些。
NaN 是一个“警戒值”(sentinel value，有特殊用途的常规值)，用于指出数字类型中的错误 情况，即“执行数学运算没有成功，这是失败后返回的结果”。
NaN是一个特殊值，它和自身不相等，是唯一一个非自反(自反，reflexive，即x === x不 成立)的值。
 */
//使用工具函数 Number.isNaN(..)。ES6 之前的浏览器的 polyfill 如下:
if(!Number.isNaN) {
	Number.isNaN = function(n) {
		return {
			typeof === 'number' && window.isNaN(n)
		}
	}
}
var a = 2 / "foo"; //ture
var b = "foo"; //false

if(!Number.isNaN) {
	number.isNaN = function(n) {
		return n !== n;
	}
}

var a = 1 / 0; // Infinity
var b = -1 / 0; // -Infinity

var a = Number.MAX_VALUE; // 1.7976931348623157e+308
a + a; //infinity
a + Math.pow(2, 970); // Infinity
a + Math.pow(2, 969); // 1.7976931348623157e+308
//Infinity/ Infinity 是一个未定义操作，结果为 NaN。
//有穷正数除以 Infinity 结果是 0
var a = Infinity / Infinity; //NAN 
var a = 2 / Infinity; //0
var a = -2 / Infinity; // -0
var a = 0 / -3; // -0
var b = 0 * -3; // -0
//加法和减法运算不会得到负零

//根据规范，对负零进行字符串化会返回 "0":
var a = 0 / -3;
// 至少在某些浏览器的控制台中显示是正确的 a; // -0
// 但是规范定义的返回结果是这样:
a.toString(); // "0"
a + ""; // "0"
String(a); // "0"
// JSON也如此，很奇怪 JSON.stringify( a ); // "0"
//有意思的是，如果反过来将其从字符串转换为数字，得到的结果是准确的:
+
"-0"; // -0
Number("-0"); // -0
JSON.parse("-0"); // -0

var a = 0;
var b = 0 / -3;
a == b; // true
-
0 == 0; // true
a === b; //true
-
0 === 0; //true
0 > -0; //false
a > b; //false

//区分-0和0:
function abc(n) {
	n = Number(n);
	return(n === 0) && (1 / n === -Infinity)
}
isNegZero(-0); // true
isNegZero(0 / -3); // true
isNegZero(0); //false
/*我们为什么需要负零:
有些应用程序中的数据需要以级数形式来表示(比如动画帧的移动速度)，数字的符号位 (sign)用来代表其他信息(比如移动的方向)。此时如果一个值为 0 的变量失去了它的符
号位，它的方向信息就会丢失。所以保留 0 值的符号位可以防止这类情况发生。
 */

//工具方法 Object.is(..) 来判断两个值是否绝对相等
var a = 2 / 'foo'; //NAN
var b = -3 * 0; //-0
Object.is(a, NaN); //true
Object.is(b, -0); //true
Object.is(b, 0) //false

//polyfill:
if(!Object.is) {
	Object.is = function(v1, v2) {
		//判断是否为-0
		if(v1 === 0 && v2 === 0) {
			return 1 / v1 === 1 / v2;
		}
		//判断是否为NAN
		if(v1 !== v1) {
			return v2 !== v2;
		}
		//其他情侣
		return v1 === v2;
	}
}
//能使用 == 和 ===时就尽量不要使用 Object.is(..)，因为前者效率更高、更为通用。Object.is(..) 主要用来处理那些特殊的相等比较。

//JavaScript 引用指向的是值。如果一个值有 10 个引用，这些引用指向的都是同一个值，它 们相互之间没有引用 / 指向关系。JavaScript 对值和引用的赋值 / 传递在语法上没有区别，完全根据值的类型来决定。

var a = 2;
var b = a; // b是a的值的一个副本
b++; //2
a; //2
b; //3

var c = [1, 2, 3, 4];
var d = c;
d.push(5)
c; //[1,2,3,4,5]
d; //[1,2,3,4,5]

//简单值(即标量基本类型值，scalar primitive)总是通过值复制的方式来赋值 / 传递，包括 null、undefined、字符串、数字、布尔和 ES6 中的 symbol。
//复合值(compound value)——对象(包括数组和封装对象)和函数，则总 是通过引用复制的方式来赋值 / 传递。
/*上例中 2 是一个标量基本类型值，所以变量 a 持有该值的一个复本，b 持有它的另一个复 本。b 更改时，a 的值保持不变。
c 和 d 则分别指向同一个复合值 [1,2,3] 的两个不同引用。请注意，c 和 d 仅仅是指向值 [1,2,3]，并非持有。所以它们更改的是同一个值(如调用 .push(4))，随后它们都指向更 改后的新值 [1,2,3,4]。

 */
//由于引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向。
var a = [1, 2, 3];
var b = a;
a; // [1,2,3]
b; // [1,2,3]
// 然后
b = [4, 5, 6];
a; // [1,2,3]
b; // [4,5,6]

function foo(x) {
	x.push(4);
	x; //1234

	x = [4, 5, 6];
	x.push(7);
	x; //4567
}
var a = [1, 2, 3];
foo(a);
a; //1234
/*我们向函数传递 a 的时候，实际是将引用 a 的一个复本赋值给 x，而 a 仍然指向 [1,2,3]。 在函数中我们可以通过引用x来更改数组的值(push(4)之后变为[1,2,3,4])。但x = [4,5,6] 并不影响 a 的指向，所以 a 仍然指向 [1,2,3,4]。
我们不能通过引用 x 来更改引用 a 的指向，只能更改 a 和 x 共同指向的值。
 */
//如果要将 a 的值变为 [4,5,6,7]，必须更改 x 指向的数组，而不是为 x 赋值一个新的数组。

function foo(x) {
	x.push(4);
	x; //1,2,3,4

	x.length = 0; //清空数组
	x.push(4, 5, 6, 7);
	x; //4,5,6,7
}
var a = [1, 2, 3];
foo(a);
a; //4,5,6,7

//无法自行决定使用值复制还是引用复制，一切由值的类型来决定。
/*如果通过值复制的方式来传递复合值(如数组)，就需要为其创建一个复本，这样传递的 就不再是原始值。例如:
foo( a.slice() );
slice(..) 不带参数会返回当前数组的一个浅复本(shallow copy)。由于传递给函数的是指
向该复本的引用，所以 foo(..) 中的操作不会影响 a 指向的数组。 相反，如果要将标量基本类型值传递到函数内并进行更改，就需要将该值封装到一个复合
值(对象、数组等)中，然后通过引用复制的方式传递。

 */
function foo(wrapper) {
	wrapper.a = 42;
}
var obj = {
	a: 2
}
foo(obj);
obj.a; //42
//这里 obj 是一个封装了标量基本类型值 a 的封装对象。obj 引用的一个复本作为参数 wrapper 被传递到 foo(..) 中。这样我们就可以通过 wrapper 来访问该对象并更改它的属 性。函数执行结束后 obj.a 将变成 42。

//虽然传递的是指向数字对象的引用复本，但我们并不能通过它来更改其 中的基本类型值:
function foo(x) {
	x = x + 1;
	x; //3
}
var a = 2;
var b = new Number(a); // === Object(a)

foo(b);
console.log(b) //2
/*原因是标量基本类型值是不可更改的(字符串和布尔也是如此)。如果一个数字对象的标 量基本类型值是 2，那么该值就不能更改，除非创建一个包含新值的数字对象。
x = x + 1中，x中的标量基本类型值2从数字对象中拆封(或者提取)出来后，x就神不 知鬼不觉地从引用变成了数字对象，它的值为2 + 1等于3。然而函数外的b仍然指向原 来那个值为 2 的数字对象。
我们还可以为数字对象添加属性(只要不更改其内部的基本类型值即可)，通过它们间接 地进行数据交换。

 */