//去重
function test(arr) {
    var num = {};
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (!num[arr[i]]) {
            num[arr[i]] = true;
            result.push(arr[i])
        }
    }
    return result
}
alert(test([1, 1, 1, 2, 3, 4, 3]))

arr.filter(function (e, index, arr) {
    return index === arr.indexOf(e);
})
//排序
function test(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var num = Math.floor(arr.length / 2);
    var numValue = arr.splice(num, 1);
    var left = [],
        right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < numValue) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return test(left).concat([numValue], test(right));
}
alert(test([2, 1, 3, 5, 23]))

function test(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
alert(test([11, 2, 4]))

var promise = new Promise(resolve, reject)
{
    if () {
        resole(result)
    } else {
        rejiect(Error(message))
    }
}

var a = [];
for (var i = 0; i < 10; i++) {
    var num = parseInt(Math.random() * 30 + 20);
    a.push(num);
}
a.sort(function (a, b) {
    return 0.5 - Math.random()
})

var timer = true;
document.querySelector('le').onScroll = function () {
    if (!timer) {
        return
    }
    timer = false;
    setTimeout(function () {
        console.log('666');
        timer = true;
    })
}

var timer = false;
document.querySelector('li').onScroll = function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
        console.log('666')
    })
}

function test(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr.charCodeAt(i) > 255) len++
    }
    return len
}
alert(test('你好,ll'))

Object.prototype.clone = function () {
    var o = this.constructor === Array ? [] : {};
    for (var i in this) {
        o[i] = typeof this[i] === 'object' ? this[i].clone : this[i]
    }
    return o;
}

function test() {
    var a = {};
    for (var i in that) {
        a[i] = that[i];
        a.uber = that;
        return a;
    }
}

function test(url) {
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.url = url;
    document.getElementsByTagName('head')[0].appendChild(oScript)
}
test('ll.js');

box({
    'name': 'll'
})
function box(j) {
    alert(j.name)
}

var ul = document.querySelector('ul');
var lis = document.querySelectorAll('lis');
ul.addEventListener('click', function (ev) {
    var ev = ev || window.event;
    var targe = ev.target || ev.srcElement;
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = (function (e) {
            return function () {
                console.log('666')
            }
        })(i)
    }
})

var a = function (name) {
    this.name = name;
}
a.prototype.run = function () {
    alert(1)
}
var b = function (name, age) {
    a.call(this, name);
    this.age = age;
}
b.prototype = new a()
//继承
var a = function (name) {
    this.name = name;
}
a.prototype.run = function () {
    alert(1)
}
var b = function (name, age) {
    a.call(this, name);
    this.age = age;
}
b.prototype = new a();

document.querySelector('ul');
document.querySelector('li');
ul.addEventListener('click', function (ev) {
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    for (var i = 0; i < li.length; i++) {
        if (target === li[i]) {
            alert(
        ..)
        }
    }
})

ul.onclick = (function (e) {
    return function () {
        alert(e);
    }
})(i);
//去重
arr.filter(function (tepm, index, array) {
    return index === array.indexOf(tepm);
})
Array.from(new set(arr));

function test(arr) {
    var num = {};
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (!num[arr[i]]) {
            num[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result
}
alert(test([1, 1, 2, 2, 3, 3]))
//排序两种
function test(arr) {
    if (arr.length <= 1) {
        return 1;
    }
    var num = Math.floor(arr.length / 2);
    var numValue = arr.splice(num, 1);
    var left = [],
        right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < numValue) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return test(left).concat([numValue], test(right));

}
alert(test([2, 3, 1]))

function test(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var num = Math.floor(arr.length / 2);
    var numValue = arr.splice(num, 1);
    var left = [],
        right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < numValue) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return test(left).concat([numValue], test(right));
}
alert(test([2, 1, 3, 5, 23]))

function test(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
alert(test([3, 5, 4]))
//节流，抖动
var timer = true;
document.querySelector('li').onScroll = function () {
    if (!timer) {
        return
    } else {
        timer = false;
        setTimeout(function () {
            alert(1)
        }, 300)
        timer = true;
    }
}

var timer = false;
document.querySelector('li').onScroll = function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
        alert(1)
    }, 300)
}
//script
function test(url) {
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.url = url;
    document.getElementsByTagName('head')[0].appendChild(oScript)
}
test('ll.js');
box({
    'name': 'll'
})
function box(jso) {
    console.log(jso.name)
}
//20-50
var arr = [];
for (var i = 0; i < 10; i++) {
    var num = parseInt(Math.random() * 30 + 20);
    arr.push(num);
}
arr.sort(function (a, b) {
    return 0.5 - Math.random();
})
//字符串长度
function test(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr.charCodeAt(i) > 255) len++
    }
    return len;
}
alert(test("你好,ll"))
//浅赋值，深复制
Object.prototype.clone = function () {
    var o = this.constructor === Array ? [] : {};
    for (var i in this) {
        o[i] = typeof this[i] === 'object' ? this[i].clone : this[i]
    }
    return o;
}

function test() {
    var a = {};
    for(var i in dex) {
        a[i] = dex[i];
        a.uber = dex;
        return a;
    }
}



























































