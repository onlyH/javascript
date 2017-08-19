# javascript
关于js的那些小细节总结

js程序是用unicode字符集编写的

js的数据类型分为：原始和对象

除了数字，字符串，布尔值，null和undefined之外都是对象

对象是属性的集合，每个属性都由“名／直对”构成

如果函数用来初始化（使用new运算符）一个新建的对象，称之为构造函数

每个构造函数定义了一类对象，由构造函数初始化的对象组成的集合，类可以看作是对象类型的子类型

类：function ，array，date，regexp，error

null和undefined是无法拥有方法的值

对象和数组属于可变类型

数字 ，布尔值，null，undefined属于不可变类型

－0=＝0

布尔值包含tostring（）方法

全局属性：undefined，infinity，NaN

全局函数：如isNaN(),parseInt(),eval()

构造函数：如Date(),RegExp(),String(),Object(),Array()

全局对象：如Math(),JSON

存取字符串，数字，布尔值的属性时创建的临时对象称为包装对象

一个值转换为另一个值并不意味着两个值相等

除了null，undefined之外的任何值都有tostring（）方法

toFixed()根据小数点后的指定位数将数字转换为字符串，不用指数计数法

toExponential()使用指数计数法将数字转换为指数形式的字符串

toPrecision()根据指定的有效数字位数将数字转换成字符串

数组到数字的转换则调用tostring（）方法，空数组转换成为空字符串，空字符串转化为数字0

含有一个元素的数组转化为字符串的结果和这个元素转换字符串的结果一样，如果数组只包含一个数字元素，这个数字转换为字符串，再转回数字

局部变量的优先级高于同名的全局变量

js中没有块级作用域

js的函数作用域是指在函数内声明的所有变量在函数体内始终是可见的

使用var声明一个变量时，无法通过delete运算符删除

全局变量是全局对象的属性，局部变量当作跟函数调用相关的某个对象的属性

this关键字是来引用全局对象

全局变量在程序中始终都是有定义的，局部变量在声明它的函数体内以及其所嵌套的函数内始终是有定义的

数组初始化表达式每次计算的值有可能是不同的

对象直接量中的属性名称可以是字符串而不是标识符

函数定义表达式可称为“函数直接量”

函数定义表达式包括关键字function，其后是一对圆括号

属性访问表达式运算得到一个对象属性或一个数组元素的值

任何一个调用表达式都包含一对圆括号和左圆括号之前的表达式，如果这个表达式是一个属性表达式，那么这个调用称为“方法调用”

在方法调用中，执行函数体的时候，作为属性访问主题的对象和数组便是其调用方法内this的指向

对象创建表达式创建一个对象并调用一个构造函数初始化新对象的属性

函数调用表达式和对象创建表达式是有副作用的

一元操作符，赋值，三元条件运算符都具有从右至左的结合性

求余运算也叫模运算，模就是余数

异或是指第一个操作符为true或第二个为true，但两者不能同时为true

按位非～对一个值使用～运算符相当于改变他的符号并减一

将一个值左移1位相当于它乘以2，两位乘以4，7<<2=28

右移相反 7>>1=3

关系运算符用于测试两个值之间的关系，返回一个布尔值，通常在if，while，for语句中使用，以控制程序的执行流程

js对象的比较是引用的比较，不是值的比较

in运算符希望他的左操作数是一个字符串或可以转换为字符串，右操作符是一个对象，如果右侧的对象拥有一个名为左操作数值的属性名，那么表达式返回turn

instanceof与之相反


纯属个人积累若有错误的地方欢迎指出，共同学习！

``` bash
//放在html里的哪一部分js会在页面加载的时候执行--body部分
var color = 'green';
var test = {
  color:'blue',
  getColor:function(){
    var color = 'red';//闭包
    alert(this.color);
  }
}
var getColor = test.getColor;
getColor(); //green
test.getColor(); //blue
//1，普通函数调用，this指向的是window对象。2，全局变量，this指向的是test


var name = 'world';
(function(){
  if(typeof name === 'undefined'){
    var name = 'jack';
    console.log('good' + name);
  }else {
    console.log('hello' + name);
  }
})(); //good jack 作用域与变量提升

void();  //syntaxerror
//void作为运算符后边跟的是表达式，viod（）更像是函数形式，没有定义

typeof Symbol(); //'Symbol'
typeof Number(); //'Number'
typeof String(); //'String'
typeof Function(); //'Function'
typeof Object(); //'Object'
typeof Boolean(); //'Boolean'
typeof null //'object'
typeof undefined //'undefined'

//angularjs1中关于服务的说法：避免全局对象污染，能注入到其他组件，避免代码分散到各处

//make高亮显示文本

<ul>
  <li>click me</li>
  <li>click me</li>
  <li>click me</li>
  <li>click me</li>
</ul>
var elements = document.getElementsByTagName('li');
var length = elements.length;
for (var i = 0; i < length; i++) {
  elements[i].onclick = function(){  //闭包函数
    alert(i);
  }
} //4 匿名函数 闭包允许内层函数引用父函数中的变量，但是改变量是最终值，闭包所保存的是整个变量的对象，不是某个特殊的值

/*
indexdDB是html5的本地存储，把一些数据存储到浏览器（客户端）中，当与网络断开时，可以从浏览器中读取数据，用来做一些离线应用
cookie通过在客户端（浏览器）记录信息确定用户身份，最大为4kb。
url参数用的是get方法，从服务器上获取数据，大小不能大于2kb。
session是服务器端使用的一种记录客户端状态的机制，
post是向服务器传送数据，数据量比较大。
local storage也是h5的本地存储，将数据保存到客户端中，一般为永久的。
*/

/*
iframe使用场景：
1，典型系统结构，左侧是功能树，右侧是一些常见的table或者表单之类的，为了每一个功能，单独分离出来。
2，ajax上传文件。
3，加载别的网站内容。
4，在上传图片时，不用flash实现无刷新。
5，跨域访问的时候可以用，请求不同域名下的资源。
*/

var obj ={a:1,b:function () {
  alert(this.a)}
};
var fun =obj.b;
fun(); //undefined   this指向window

(function() {
var x=foo();
var foo=function foo() {
return “foobar”
};
return x;
})(); //类型错误 变量提升，但是函数表达式不会提升。
/*x在foo之前定义，此时foo是undefined。运行到x = foo（）；时，当然会报错。
如果把x定义放在foo的后面，就不会报错。*/
/*
1.Ajax的优势：1.可搜索性 2.开放性 3.费用 4.易用性 5.易于开发。
2.Flash的优势：1.多媒体处理 2.兼容性 3.矢量图形 4.客户端资源调度
3.Ajax的劣势：1.它可能破坏浏览器的后退功能   2.使用动态页面更新使得用户难于将某个特定的状态保存到收藏夹中 ，不过这些都有相关方法解决。
4.Flash的劣势：1.二进制格式 2.格式私有 3.flash 文件经常会很大，用户第一次使用的时候需要忍耐较长的等待时间  4.性能问题
*/
var a = [1,4,5,2,9];
Math.max.apply(null,a) //9
/*
call和apply的第一个参数都是this指向，而call从第二个参数开始，代表了第一个要计算的实参，
以此类推，第三个参数就是第二个实参。。。第n个代表n-1个实参。
和aplly的区别仅在于，apply把除了第一个参数之后的所有参数，都纳入一个数组里。
*/


//angularjs1中的$apply()的作用是使方法生效

//下面方式能改变作用域链？with  try-catch  eval都会.

//删除给定数组中的第二项和第三项，并且在得到的新的数组中第一项后面添加一个新的值
var arr1 = ['a','b','c','d','e'];
var arr2 = arr1. splice( 1 , 2 ,'newvalue')

代码支持a.name = “name1”; b.name = “name2”;
function obj(name){
    if(name){ this.name = name;}return this;
}
obj.prototype.name = "name2";
var a = obj("name1");
var b = new obj;


```
