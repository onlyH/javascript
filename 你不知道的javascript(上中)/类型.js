/*内置类型:null,undefined,String,Boolean,number,Symbol(符号),Object(对象)
 * 除了对象，其他的都称为‘基本类型’
 * 关于null的typeof是object的问题，用复合条件来检测 null 值的类型
 */
var a  = null;
(!a && typeof a === 'object') //true

typeof function a(){} === 'function';   //true
//如此看来，function（函数）也是js的一个内置类型，实际上是object的一个子类型。函数是‘可调用对象’，它有一个内部属性[[call]],该属性使其可以被调用--函数不仅是对象，还可以拥有属性：
function a(b,c){
	/* ... */
}
a.length; //2 声明了两个命名参数，b和c，所以其length值为2

typeof [1,2,3] === 'object'  //true
//数组也是对象，object的一个子集，length为元素的个数

var a = 42;
typeof a ;  //number

var a = 42;
typeof  typeof a; //string

//undefined,undeclared
//一个在作用域中声明了还没有赋值的变量，一个是没有在作用域中声明狗的变量。
var a;
a;  //undefined
b;  //undecleard
//所以 undefined和 is not‘s defined 是两回事
var a ;
typeof a;//undefined
typeof b;//undefined
//typeof有一个特殊的防范机制




