var g = function(id) {
    if(id.substr(0,1)== '.') {
        return document.getElementsByClassName(id.substr(1))
    }
    return document.getElementById(id)
}
//清除头尾空白符
g.replace(/^\s*/,'')
g.replace(/\s*$/,'')
//使用for循环不使用for in 循环，现在的变量不是一个真正的数组
[].sort  //返回的是一个函数
//清除样式,replace可以连续使用
for(var i = 0 ; i< variable.length;i++) {
    variable[i].className = variable[i].className.replace('main_active','')
}

