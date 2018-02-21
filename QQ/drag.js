//封装获取元素
function getClass(classNam, parents) {
    //如果传父元素，那么就把父元素的id拿来，否则的话就取整个页面
    var oParents = parents ? document.getElementById(parents) : document;
    //顶定一个空数组
    var arr = [];
    //获取全部class
    var elements = oParents.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].className == classNam) {
            arr.push(elements[i]);
        }
    }
    return arr;
}

//在标题区域按下--页面移动--释放鼠标时停止移动
//clientx鼠标指针
//鼠标按下onmousedown，onmousemove鼠标移动指针,offsetWidth盒子的宽度，onmouseup释放鼠标

window.onload = drag;

function drag() {
    var oTitle = getClass('login_logo_webqq', 'loginPanel')[0];
    //拖拽
    oTitle.onmousedown = fndown;
    //关闭
    document.getElementById('ui_boxyClose').onclick = function () {
        document.getElementById('loginPanel').style.display = 'none';
    };
    //切换状态
    var loginState = document.getElementById('loginState');
    var stateList = document.getElementById('loginStatePanel');
    var lis = stateList.getElementsByTagName('li');
    var stateTxt = document.getElementById('login2qq_state_txt');
    var loginStateShow = document.getElementById('loginStateShow');

    loginState.onclick = function (e) {
        e = e || window.event;
        if(e.stopPropagation) {
            e.stopPropagation()
        }else{
            e.cancelBubble = true;
        }
        stateList.style.display='block';
    };
    for(var i = 0; i<lis.length;i++) {
        lis[i].onmouseover = function() {
             this.style.background = '#567'
        };
        lis[i].onmouseout = function () {
            this.style.background = "#fff"
        };
        lis[i].onclick = function(e) {
            e = e || window.event;
            if(e.stopPropagation) {
                e.stopPropagation()
            }else{
                e.cancelBubble = true;
            }
            var id = this.id;
            stateList.style.display='none';
            stateTxt.innerHTML = getClass('stateSelect_text',id)[0].innerHTML;
            loginStateShow.className = '';
            loginStateShow.className = 'login-state-show ' +id;
        }
    }
    document.onclick = function() {
        stateList.style.display = 'none';
    }


}

function fndown(event) {
    event = event || window.event;
    //光标按下时光标和盒子 之间的距离
    var oDiv = document.getElementById('loginPanel');
    disX = event.clientX - oDiv.offsetLeft;
    disY = event.clientY - oDiv.offsetTop;
//移动
    document.onmousemove = function (event) {
        event = event || window.event;
        moveDown(event, disX, disY);
    };
    //释放

    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    }

}


function moveDown(e, posX, posY) {
    var oDiv = document.getElementById('loginPanel');
    var l = e.clientX - posX;
    var t = e.clientY - posY;
    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    //滚动的最大宽度
    var maxW = winW - oDiv.offsetWidth;
    var maxH = winW = oDiv.offsetHeight;
    var oDiv = document.getElementById('loginPanel');
    if (l < 0) {
        l = 0;
    } else if (l > maxW) {
        l = maxW;
    }
    if (t < 0) {
        t = 0;
    } else if (t > maxH) {
        t = maxH
    }
    oDiv.style.left = l + 'px';
    oDiv.style.top = t + 'px';
}
