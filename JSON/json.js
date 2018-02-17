/**
 * Created by iMacbook on 2017/11/24.
 */
"javascript"   //json对象必须使用双引号

var person = {    //js对象字面量
    name: "lee",
    age: 21,
    like: "shopping"
}


//json
{
    "name": "lee",
    "age": 23,
    "like": "swim"
}

/*
* 区别：
* 1，json是一种数据结构，没有变量名，不是语言，没有变量函数和方法，仅定义对象的结构和数据
* 2，对象的属性名要放在双引号党当中，js对象的属性名是字符串
* 右花括号后面没有分号
* */

var  values = ["join",30,false,null];    //js数组字面量

["join",30,false,null]     //json


js对象串行化为json，可以使用JSON的stringify()方法，接受任何值，对象或数组

var persoon = {
    firstName : "join",
    lastName : "lee",
    age : 21
}

var json = JSON.stringify(json);     //==>

["firstName" : "join","lastName" : "lee","age" :21]


//json对象的parse()方法可以解析json，返回得到的对象
var fullName = JSON.parse(json);
//解析json中包含的JSON文本，得到的对象存储在fullName变量中，可以立即使用fullName

var joinLee = fullName.firstName + "" + fullName.lastName;


//需要存储对象时，可以使用json，json是文本

//串行化是把对象和值转化为其字符串表示的过程








