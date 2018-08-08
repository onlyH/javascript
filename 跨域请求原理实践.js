//同源策略（端口，协议，域名），防范跨站脚本的攻击，禁止客户端脚本对不同域的服务进行跨站调用
//js
$(function () {
    $('#submit').click(function () {
        var data = {
            name: $('#name').val(),
            id: $('#id').val()
        };
        $ajax({
            type: 'POST',
            data: data,
            url: 'http://localhost:3000/ajax/deal',
            dataType: 'json',
            cache: false,
            timeout: 5000,
            success: function () {
                console.log(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('error' + textStatus + '' + errorThrown)
            }
        })
    })
})()
//服务器3000 对应的处理函数
variable.post('/ajax/deal',function(req,res) {
    var data = {
        name : req.body.name + '-server 3000 process',
        id : req.body.id + '-server 3000 process'
    }
    res.send(data)
    res.end()
})

// 将请求页面中的 ajax 请求路径改为：
$.ajax({
    url:'http://localhost:3031/ajax/deal'
})

//服务器3001 对应的处理函数与 服务器3000 类似：
app.post('/ajax/deal',function(req,res) {
    console.log('server accept',req.body.name,req.body.id)
    var data ={
        name:req.body.name + '-server 3001 process',
        id:req.id + '-server 3001 process'
    }
    res.send(data)
    res.end()
})
//error error 端口号不同，发生了跨域请求的调用。
//这说明跨域请求并非是浏览器限制了发起跨站请求，而是请求可以正常发起，到达服务器端，但是服务器返回的结果会被浏览器拦截。
//利用 JSONP 实现跨域调用
/* 
jsonp是json的一种使用模式，解决跨域数据访问，原理：xmlHttpReauest对象受同源策略
的影响，而script却不受影响，可以加载跨域服务器上的脚本，网页可以从其他源动态产生json资料，
json获取的不是json数据，而是可以直接运行的js语句。
*/
//使用 jQuery 集成的 $.ajax 实现 JSONP 跨域调用
function jsonpCallback(data) {
    console.log('jsonpCallback' + data.name)
}
$('#submit').click(function() {
    var data = {
        name : $('#name').val(),
        id : $('#id').val()
    };
    $ajax({
        url:'http://localhost:3001/ajax/deal',
        data:data,
        dataType:'jsonp',
        cache:false,
        timeout:5000,
     // jsonp 字段含义为服务器通过什么字段获取回调函数的名称
        jsonp:'callback',
        // 声明本地回调函数的名称，jquery 默认随机生成一个函数名称
        jsonpCallback:'jsonpCallback',
        success(data) {
            console.log('ajax success callback'+ data.name)
        }
        error(jqXHR,textStatus,errorThrown) {
            console.log(textStatus + '' + errorThrown)
        }
    })
})
//服务器 3001 上对应的处理函数为
app.post('/ajax/deal',function(req,res) {
    console.log('server accept :',req.query.name,req.query.id)
    var data = "{"+ "name'" + req.query.name + "=server 3001 process',"+
    "id:'"+req.query.id + "-server 3001 process'" + "}"
    var callback = req.query.callback
    var jsonp = callback + '('+data + ')'
    console.log(jsonp)
    res.send(jsonp)
    res.end()
})

// data 中字符串拼接，不能直接将 JSON 格式的 data 直接传给回调函数，否则会发生编译错误： parsererror Error: jsonpCallback was not called。

//jsonp只支持get请求
//假设传输数据data
data = {
    name:'shaun',
    id:'3001'
}
// http请求头的第一行如下
//GET /ajax/deal?callback=jsonpCallback&name=shaun&id=3001&_1473164876032 HTTP/1.1
// 由于是通过script标签进行请求，所以，传输过程如下显示
//<script src='http://localhost:3001/ajax/deal?callback=jsonpCallback&name=chiaki&id=3001&_+1473164876032></script>

//服务器 3000请求页面的 JavaScript 代码中，只有回调函数 jsonpCallback：
function jsonpCallback(data) {
    console.log('jsonpCallback:'+ data.name)
}
/* 
服务器 3000请求页面还包含一个 script 标签：
<script src = 'http://localhost:3001/jsonServerResponse?jsonp=jsonpCallback'></script>
*/
app.get('/jsonServerResponse', function(req, res) {
    var cb = req.query.jsonp
    console.log(cb)
    var data = 'var data = {' + 'name: $("#name").val() + " - server 3001 jsonp process",' + 'id: $("#id").val() + " - server 3001 jsonp process"' + '};'
    var debug = 'console.log(data);'
    var callback = '$("#submit").click(function() {' + data + cb + '(data);' + debug + '});'
    res.send(callback)
    res.end()
})
//jsonp 不足的地方
/* 
只能使用 GET 方法发起请求，这是由于 script 标签自身的限制决定的。
不能很好的发现错误，并进行处理。与 Ajax 对比，由于不是通过 XmlHttpRequest 进行传输，所以不能注册 success、 error 等事件监听函数。
*/ 
$(function () {
    $('#submit').click(function() {
        var data = {
            name : $('#name').val(),
            id:$('#id').val()
        };
        $.ajax({
            type:'POST',
            data:data,
            url:'http://localhost:3001/cors',
            dataType:'json',
            cache:false,
            timeout:5000,
            success:function() {
                console.log(data)
            },
            error:function(jqXHR,textStatus,errorThrown) {
                consonle.log('error' + textStatus +''+errorThrown)
            }
        })
    })
})
//服务器 3001上对应的处理函数：在服务器中对返回信息的请求头进行了设置。
app.post('/cors', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    var data = {
        name: req.body.name + ' - server 3001 cors process',
        id: req.body.id + ' - server 3001 cors process'
    }
    console.log(data)
    res.send(data)
    res.end()
})
/* 
CORS 除了 GET 方法外，也支持其它的 HTTP 请求方法如 POST、 PUT 等。
CORS 可以使用 XmlHttpRequest 进行传输，所以它的错误处理方式比 JSONP 好。
JSONP 可以在不支持 CORS 的老旧浏览器上运作。
*/
//一些其它的跨域调用方式
/* 

4.1 window.name
window对象有个name属性，该属性有个特征：即在一个窗口 (window) 的生命周期内，窗口载入的所有的页面都是共享一个 window.name 的，每个页面对 window.name 都有读写的权限，window.name 是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。
4.2 window.postMessage()
这个方法是 HTML5 的一个新特性，可以用来向其他所有的 window 对象发送消息。需要注意的是我们必须要保证所有的脚本执行完才发送 MessageEvent，如果在函数执行的过程中调用了他，就会让后面的函数超时无法执行。
*/




