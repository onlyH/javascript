function foo(a){
	var b = 2;
	//...
	function bar(){
		//..
	}
	var c = 3;
}
//由于标识符 a、b、c 和 bar 都附属于 foo(..) 的作用域气泡，因此无法从 foo(..) 的外部 对它们进行访问。也就是说，这些标识符全都无法从全局作用域中进行访问，因此下面的 代码会导致 ReferenceError 错误:
bar(); // 失败
console.log( a, b, c ); // 三个全都失败
//函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用(事实上在嵌套的作用域中也可以使用)。 
function abc(a){
	b = a + c(a * 2);
	console.log(b * 3);
}
function c(a){
	return a - 1;
}
var b;
abc(2);
//变量 b 和函数 c(..) 应该是 abc(..) 内部具体 实现的“私有”内容。给予外部作用域对 b 和 c(..) 的“访问权限”不仅 没有必要，而且可能是“危险”的，因为它们可能被有意或无意地以非预期的方式使用， 从而导致超出了 abc(..) 的适用条件。更“合理”的设计会将这些私有的具体内 容隐藏在 abc(..) 内部，例如:
function abc(a){
	function c(a){
		return a - 1;
	}
var b;
b = a +c(a * 2);
console.log(b * 3);
}
abc(2);//15

//“隐藏”作用域中的变量和函数所带来的另一个好处，是可以避免同名标识符之间的冲突， 两个标识符可能具有相同的名字但用途却不一样，无意间可能造成命名冲突。冲突会导致 变量的值被意外覆盖。
function foo(){
	function bar(a){
		i = 3;// 修改for循环所属作用域中的i
		console.log(a+i);
	}
	for (var i = 0; i<10; i++) {
		bar(i * 2);// 糟糕，无限循环了!
	}
}
foo();
//bar(..) 内部的赋值表达式 i = 3 意外地覆盖了声明在 foo(..) 内部 for 循环中的 i。在这个例子中将会导致无限循环，因为 i 被固定设置为 3，永远满足小于 10 这个条件。bar(..) 内部的赋值操作需要声明一个本地变量来使用，采用任何名字都可以，var i = 3; 就可以满足这个需求(同时会为 i 声明一个前面提到过的“遮蔽变量”)。
function foo(){
	function bar(a){
		var i = 3;
		console.log(a + i);
	}
	for(var i = 0; i<10; i++){
		bar(i * 2);
	}
}
foo()
//1. 全局命名空间 变量冲突的一个典型例子存在于全局作用域中。当程序中加载了多个第三方库时，如果它 们没有妥善地将内部私有的函数或变量隐藏起来，就会很容易引发冲突。这些库通常会在全局作用域中声明一个名字足够独特的变量，通常是一个对象。这个对象 被用作库的命名空间，所有需要暴露给外界的功能都会成为这个对象(命名空间)的属 性，而不是将自己的标识符暴漏在顶级的词法作用域中。
var MyReallyCoolLibrary= {
	b:'lee',
	c:function(){
		//...
	},
	d:function(){
		//...
	}
}
//另外一种避免冲突的办法和现代的模块机制很接近，就是从众多模块管理器中挑选一个来 使用。使用这些工具，任何库都无需将标识符加入到全局作用域中，而是通过依赖管理器 的机制将库的标识符显式地导入到另外一个特定的作用域中。
var a = 2;
function foo(){
	var a = 3;
	console.log(a);//3
}
foo();
console.log(a);//2
//虽然这种技术可以解决一些问题，但会导致一些额外的问题。首先， 必须声明一个具名函数 foo()，意味着 foo 这个名称本身“污染”了所在作用域(在这个例子中是全局作用域)。其次，必须显式地通过函数名(foo())调用这个函数才能运行其中的代码。如果函数不需要函数名(或者至少函数名可以不污染所在作用域)，并且能够自动运行， 这将会更加理想。
var a = 2;
(function foo(){
	var a = 3;
	console.log(a); //3
})()
console.log(a)//2
//函数会被当作函数表达式而不是一 个标准的函数声明来处理。
//区分函数声明和表达式最简单的方法是看 function 关键字出现在声明中的位置(不仅仅是一行代码，而是整个声明中的位置)。如果 function 是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式。
//(function foo(){ .. })作为函数表达式意味着foo只能在..所代表的位置中 被访问，外部作用域则不行。foo 变量名被隐藏在自身中意味着不会非必要地污染外部作 用域。
//回调参数
setTimeout(function(){
	console.log('i waited second');
},1000);//匿名函数表达式，因为function（）。。没有名称标识符，函数表达式可以匿名，函数声明不可以。
//匿名函数的缺点：
/*
 1. 匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难。
 2. 如果没有函数名，当函数需要引用自身时只能使用已经过期的arguments.callee引用， 比如在递归中。另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑 自身。
3. 匿名函数省略了对于代码可读性/可理解性很重要的函数名。一个描述性的名称可以让 代码不言自明。
 */
//行内函数表达式非常强大且有用——匿名和具名之间的区别并不会对这点有任何影响。给函 数表达式指定一个函数名可以有效解决以上问题。始终给函数表达式命名是一个最佳实践
setTimeout(function abc(){
	console.log(' i waited 1 second');
},1000);
//立即执行函数表达式
var a = 2;
(function foo(){
	var a = 3;
	console.log(a)//3
})();
console.log(a);//2
//几年前社区给它规定了一个术语:IIFE，代表立即执行函数表达式,函数名对 IIFE 当然不是必须的，IIFE 最常见的用法是使用一个匿名函数表达式。虽然使 用具名函数的 IIFE 并不常见，但它具有上述匿名函数表达式的所有优势，因此也是一个值 得推广的实践。
var a = 2;
(function IIFE(){
	var a = 3;
	console.log(a)//3
})();
console.log(a);//2
//IIFE 的另一个非常普遍的进阶用法是把它们当作函数调用并传递参数进去。
var a = 2;
(function IIFE(global){
	var a = 3;
	console.log(a); //3
	console.log(global.a);//2
})(window);
console.log(a);//2
//这个模式的另外一个应用场景是解决 undefined 标识符的默认值被错误覆盖导致的异常(虽 然不常见)。将一个参数命名为 undefined，但是在对应的位置不传入任何值，这样就可以 保证在代码块中 undefined 标识符的值真的是 undefined:
undefined = true; // 给其他代码挖了一个大坑!绝对不要这样做!
(function IIFE(undefined){
	var a ;
	if(a === undefined){
		console.log('undefined is safe here')
	}
})();
//IIFE 还有一种变化的用途是倒置代码的运行顺序，将需要运行的函数放在第二位，在 IIFE 执行之后当作参数传递进去。这种模式在 UMD(Universal Module Definition)项目中被广 泛使用。尽管这种模式略显冗长，但有些人认为它更易理解。
var a = 2;
(function IIFE(def){
	def(window);
})(function def(global){
	var a = 3;
	console.log(a);//3
	console.log(global.a);//2
})
//3.4块作用域