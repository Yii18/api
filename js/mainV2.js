"use strict";!function(a,b){"function"==typeof define&&(define.amd||define.cmd)?define(b):a.touch=b()}(this,function(){function a(){var a="mouseup mousedown mousemove mouseout",c="touchstart touchmove touchend touchcancel",d=b.hasTouch?c:a;d.split(" ").forEach(function(a){document.addEventListener(a,A,!1)})}var b={};b.PCevts={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",touchcancel:"mouseout"},b.hasTouch="ontouchstart"in window,b.getType=function(a){return Object.prototype.toString.call(a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},b.getSelector=function(a){if(a.id)return"#"+a.id;if(a.className){var b=a.className.split(/\s+/);return"."+b.join(".")}return a===document?"body":a.tagName.toLowerCase()},b.matchSelector=function(a,b){return a.webkitMatchesSelector(b)},b.getEventListeners=function(a){return a.listeners},b.getPCevts=function(a){return this.PCevts[a]||a},b.forceReflow=function(){var a="reflowDivBlock",b=document.getElementById(a);b||(b=document.createElement("div"),b.id=a,document.body.appendChild(b));var c=b.parentNode,d=b.nextSibling;c.removeChild(b),c.insertBefore(b,d)},b.simpleClone=function(a){return Object.create(a)},b.getPosOfEvent=function(a){if(this.hasTouch){for(var b=[],c=null,d=0,e=a.touches.length;e>d;d++)c=a.touches[d],b.push({x:c.pageX,y:c.pageY});return b}return[{x:a.pageX,y:a.pageY}]},b.getDistance=function(a,b){var c=b.x-a.x,d=b.y-a.y;return Math.sqrt(c*c+d*d)},b.getFingers=function(a){return a.touches?a.touches.length:1},b.calScale=function(a,b){if(a.length>=2&&b.length>=2){var c=this.getDistance(a[1],a[0]),d=this.getDistance(b[1],b[0]);return d/c}return 1},b.getAngle=function(a,b){return 180*Math.atan2(b.y-a.y,b.x-a.x)/Math.PI},b.getAngle180=function(a,b){var c=Math.atan(-1*(b.y-a.y)/(b.x-a.x))*(180/Math.PI);return 0>c?c+180:c},b.getDirectionFromAngle=function(a){var b={up:-45>a&&a>-135,down:a>=45&&135>a,left:a>=135||-135>=a,right:a>=-45&&45>=a};for(var c in b)if(b[c])return c;return null},b.getXYByElement=function(a){for(var b=0,c=0;a.offsetParent;)b+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;return{left:b,top:c}},b.reset=function(){h=i=j=null,q=o=k=l=!1,m=!1,f={},t=!1},b.isTouchMove=function(a){return"touchmove"===a.type||"mousemove"===a.type},b.isTouchEnd=function(a){return"touchend"===a.type||"mouseup"===a.type||"touchcancel"===a.type},b.env=function(){var a={},b=navigator.userAgent,c=b.match(/(Android)[\s\/]+([\d\.]+)/),d=b.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),e=b.match(/(Windows\s+Phone)\s([\d\.]+)/),f=/WebKit\/[\d.]+/i.test(b),g=d?navigator.standalone?f:/Safari/i.test(b)&&!/CriOS/i.test(b)&&!/MQQBrowser/i.test(b):!1;return c&&(a.android=!0,a.version=c[2]),d&&(a.ios=!0,a.version=d[2].replace(/_/g,"."),a.ios7=/^7/.test(a.version),"iPad"===d[1]?a.ipad=!0:"iPhone"===d[1]?(a.iphone=!0,a.iphone5=568==screen.height):"iPod"===d[1]&&(a.ipod=!0)),e&&(a.wp=!0,a.version=e[2],a.wp8=/^8/.test(a.version)),f&&(a.webkit=!0),g&&(a.safari=!0),a}();var c={proxyid:0,proxies:[],trigger:function(a,b,c){c=c||{};var d,e={bubbles:!0,cancelable:!0,detail:c};try{"undefined"!=typeof CustomEvent?(d=new CustomEvent(b,e),a&&a.dispatchEvent(d)):(d=document.createEvent("CustomEvent"),d.initCustomEvent(b,!0,!0,c),a&&a.dispatchEvent(d))}catch(f){console.warn("Touch.js is not supported by environment.")}},bind:function(a,c,d){a.listeners=a.listeners||{},a.listeners[c]?a.listeners[c].push(d):a.listeners[c]=[d];var e=function(a){b.env.ios7&&b.forceReflow(),a.originEvent=a;for(var c in a.detail)"type"!==c&&(a[c]=a.detail[c]);a.startRotate=function(){t=!0};var e=d.call(a.target,a);"undefined"==typeof e||e||(a.stopPropagation(),a.preventDefault())};d.proxy=d.proxy||{},d.proxy[c]?d.proxy[c].push(this.proxyid++):d.proxy[c]=[this.proxyid++],this.proxies.push(e),a.addEventListener&&a.addEventListener(c,e,!1)},unbind:function(a,b,c){if(c){var d=c.proxy[b];d&&d.length&&d.forEach(function(){a.removeEventListener&&a.removeEventListener(b,this.proxies[this.proxyid],!1)})}else{var e=a.listeners[b];e&&e.length&&e.forEach(function(c){a.removeEventListener(b,c,!1)})}},delegate:function(a,c,d,e){var f=function(c){var f,g;c.originEvent=c;for(var h in c.detail)"type"!==h&&(c[h]=c.detail[h]);c.startRotate=function(){t=!0};var i=b.getSelector(a)+" "+d,j=b.matchSelector(c.target,i),k=b.matchSelector(c.target,i+" "+c.target.nodeName);if(!j&&k){for(b.env.ios7&&b.forceReflow(),f=c.target;!b.matchSelector(f,i);)f=f.parentNode;g=e.call(c.target,c),"undefined"==typeof g||g||(c.stopPropagation(),c.preventDefault())}else b.env.ios7&&b.forceReflow(),(j||k)&&(g=e.call(c.target,c),"undefined"==typeof g||g||(c.stopPropagation(),c.preventDefault()))};e.proxy=e.proxy||{},e.proxy[c]?e.proxy[c].push(this.proxyid++):e.proxy[c]=[this.proxyid++],this.proxies.push(f),a.listeners=a.listeners||{},a.listeners[c]?a.listeners[c].push(f):a.listeners[c]=[f],a.addEventListener&&a.addEventListener(c,f,!1)},undelegate:function(a,b,c,d){if(d){var e=d.proxy[b];e.length&&e.forEach(function(){a.removeEventListener&&a.removeEventListener(b,this.proxies[this.proxyid],!1)})}else{var f=a.listeners[b];f.forEach(function(c){a.removeEventListener(b,c,!1)})}}},d={tap:!0,doubleTap:!0,tapMaxDistance:10,hold:!0,tapTime:200,holdTime:650,maxDoubleTapInterval:300,swipe:!0,swipeTime:300,swipeMinDistance:18,swipeFactor:5,drag:!0,pinch:!0,minScaleRate:0,minRotationAngle:0},e={TOUCH_START:"touchstart",TOUCH_MOVE:"touchmove",TOUCH_END:"touchend",TOUCH_CANCEL:"touchcancel",MOUSE_DOWN:"mousedown",MOUSE_MOVE:"mousemove",MOUSE_UP:"mouseup",CLICK:"click",PINCH_START:"pinchstart",PINCH_END:"pinchend",PINCH:"pinch",PINCH_IN:"pinchin",PINCH_OUT:"pinchout",ROTATION_LEFT:"rotateleft",ROTATION_RIGHT:"rotateright",ROTATION:"rotate",SWIPE_START:"swipestart",SWIPING:"swiping",SWIPE_END:"swipeend",SWIPE_LEFT:"swipeleft",SWIPE_RIGHT:"swiperight",SWIPE_UP:"swipeup",SWIPE_DOWN:"swipedown",SWIPE:"swipe",DRAG:"drag",DRAGSTART:"dragstart",DRAGEND:"dragend",HOLD:"hold",TAP:"tap",DOUBLE_TAP:"doubletap"},f={start:null,move:null,end:null},g=0,h=null,i=null,j=null,k=!1,l=!1,m=!1,n={},o=!1,p=null,q=!1,r=null,s=1,t=!1,u=[],v=0,w=0,x=0,y=null,z={getAngleDiff:function(a){for(var c=parseInt(v-b.getAngle180(a[0],a[1]),10),d=0;Math.abs(c-w)>90&&d++<50;)0>w?c-=180:c+=180;return w=parseInt(c,10)},pinch:function(a){var g=a.target;if(d.pinch){if(!o)return;if(b.getFingers(a)<2&&!b.isTouchEnd(a))return;var h=b.calScale(f.start,f.move),i=this.getAngleDiff(f.move),j={type:"",originEvent:a,scale:h,rotation:i,direction:i>0?"right":"left",fingersCount:b.getFingers(a)};if(l?b.isTouchMove(a)?(j.fingerStatus="move",c.trigger(g,e.PINCH,j)):b.isTouchEnd(a)&&(j.fingerStatus="end",c.trigger(g,e.PINCH_END,j),b.reset()):(l=!0,j.fingerStatus="start",c.trigger(g,e.PINCH_START,j)),Math.abs(1-h)>d.minScaleRate){var k=b.simpleClone(j),m=1e-11;h>s?(s=h-m,c.trigger(g,e.PINCH_OUT,k,!1)):s>h&&(s=h+m,c.trigger(g,e.PINCH_IN,k,!1)),b.isTouchEnd(a)&&(s=1)}if(Math.abs(i)>d.minRotationAngle){var n,p=b.simpleClone(j);n=i>0?e.ROTATION_RIGHT:e.ROTATION_LEFT,c.trigger(g,n,p,!1),c.trigger(g,e.ROTATION,j)}}},rotateSingleFinger:function(a){var d=a.target;if(t&&b.getFingers(a)<2){if(!f.move)return;if(u.length<2){var g=b.getXYByElement(d);u=[{x:g.left+d.offsetWidth/2,y:g.top+d.offsetHeight/2},f.move[0]],v=parseInt(b.getAngle180(u[0],u[1]),10)}var h=[u[0],f.move[0]],i=this.getAngleDiff(h),j={type:"",originEvent:a,rotation:i,direction:i>0?"right":"left",fingersCount:b.getFingers(a)};b.isTouchMove(a)?j.fingerStatus="move":(b.isTouchEnd(a)||"mouseout"===a.type)&&(j.fingerStatus="end",c.trigger(d,e.PINCH_END,j),b.reset());var k=i>0?e.ROTATION_RIGHT:e.ROTATION_LEFT;c.trigger(d,k,j),c.trigger(d,e.ROTATION,j)}},swipe:function(a){var h=a.target;if(o&&f.move&&!(b.getFingers(a)>1)){var i=Date.now(),j=i-g,l=b.getDistance(f.start[0],f.move[0]),p={x:f.move[0].x-n.left,y:f.move[0].y-n.top},q=b.getAngle(f.start[0],f.move[0]),r=b.getDirectionFromAngle(q),s=j/1e3,t=10*(10-d.swipeFactor)*s*s,u={type:e.SWIPE,originEvent:a,position:p,direction:r,distance:l,distanceX:f.move[0].x-f.start[0].x,distanceY:f.move[0].y-f.start[0].y,x:f.move[0].x-f.start[0].x,y:f.move[0].y-f.start[0].y,angle:q,duration:j,fingersCount:b.getFingers(a),factor:t};if(d.swipe){var v=function(){var a=e;switch(r){case"up":c.trigger(h,a.SWIPE_UP,u);break;case"down":c.trigger(h,a.SWIPE_DOWN,u);break;case"left":c.trigger(h,a.SWIPE_LEFT,u);break;case"right":c.trigger(h,a.SWIPE_RIGHT,u)}};k?b.isTouchMove(a)?(u.fingerStatus=u.swipe="move",c.trigger(h,e.SWIPING,u),j>d.swipeTime&&j<d.swipeTime+50&&l>d.swipeMinDistance&&(v(),c.trigger(h,e.SWIPE,u,!1))):(b.isTouchEnd(a)||"mouseout"===a.type)&&(u.fingerStatus=u.swipe="end",c.trigger(h,e.SWIPE_END,u),d.swipeTime>j&&l>d.swipeMinDistance&&(v(),c.trigger(h,e.SWIPE,u,!1))):(u.fingerStatus=u.swipe="start",k=!0,c.trigger(h,e.SWIPE_START,u))}d.drag&&(m?b.isTouchMove(a)?(u.fingerStatus=u.swipe="move",c.trigger(h,e.DRAG,u)):b.isTouchEnd(a)&&(u.fingerStatus=u.swipe="end",c.trigger(h,e.DRAGEND,u)):(u.fingerStatus=u.swipe="start",m=!0,c.trigger(h,e.DRAGSTART,u)))}},tap:function(a){var h=a.target;if(d.tap){var i=Date.now(),j=i-g,k=b.getDistance(f.start[0],f.move?f.move[0]:f.start[0]);clearTimeout(p);var l=function(){if(y&&d.doubleTap&&g-x<d.maxDoubleTapInterval){var a=b.getDistance(y,f.start[0]);if(16>a)return!0}return!1}();if(l)return clearTimeout(r),void c.trigger(h,e.DOUBLE_TAP,{type:e.DOUBLE_TAP,originEvent:a,position:f.start[0]});if(d.tapMaxDistance<k)return;d.holdTime>j&&b.getFingers(a)<=1&&(q=!0,x=i,y=f.start[0],r=setTimeout(function(){c.trigger(h,e.TAP,{type:e.TAP,originEvent:a,fingersCount:b.getFingers(a),position:y})},d.tapTime))}},hold:function(a){var e=a.target;d.hold&&(clearTimeout(p),p=setTimeout(function(){if(f.start){var g=b.getDistance(f.start[0],f.move?f.move[0]:f.start[0]);d.tapMaxDistance<g||q||c.trigger(e,"hold",{type:"hold",originEvent:a,fingersCount:b.getFingers(a),position:f.start[0]})}},d.holdTime))}},A=function(a){var c=a.target;switch(a.type){case"touchstart":case"mousedown":u=[],o=!0,(!f.start||f.start.length<2)&&(f.start=b.getPosOfEvent(a)),b.getFingers(a)>=2&&(v=parseInt(b.getAngle180(f.start[0],f.start[1]),10)),g=Date.now(),h=a,n={};var d=c.getBoundingClientRect(),e=document.documentElement;n={top:d.top+(window.pageYOffset||e.scrollTop)-(e.clientTop||0),left:d.left+(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0)},z.hold(a);break;case"touchmove":case"mousemove":if(!o||!f.start)return;f.move=b.getPosOfEvent(a),b.getFingers(a)>=2?z.pinch(a):t?z.rotateSingleFinger(a):z.swipe(a);break;case"touchend":case"touchcancel":case"mouseup":case"mouseout":if(!o)return;j=a,l?z.pinch(a):t?z.rotateSingleFinger(a):k?z.swipe(a):z.tap(a),b.reset(),v=0,w=0,a.touches&&1===a.touches.length&&(o=!0,t=!0)}},B=function(){function a(a){b.hasTouch||(a=b.getPCevts(a)),j.forEach(function(b){c.delegate(b,a,h,g[a])})}function d(a){b.hasTouch||(a=b.getPCevts(a)),j.forEach(function(b){c.bind(b,a,g[a])})}var e,f,g,h,i=arguments;if(i.length<2||i>4)return console.error("unexpected arguments!");var j="string"===b.getType(i[0])?document.querySelectorAll(i[0]):i[0];if(j=j.length?Array.prototype.slice.call(j):[j],3===i.length&&"string"===b.getType(i[1]))return e=i[1].split(" "),f=i[2],void e.forEach(function(a){b.hasTouch||(a=b.getPCevts(a)),j.forEach(function(b){c.bind(b,a,f)})});if(3!==i.length||"object"!==b.getType(i[1]))if(2!==i.length||"object"!==b.getType(i[1])){if(4===i.length&&"object"===b.getType(i[2]))return e=i[1].split(" "),f=i[3],void e.forEach(function(a){b.hasTouch||(a=b.getPCevts(a)),j.forEach(function(b){c.bind(b,a,f)})});if(4===i.length){var k=j[0];return e=i[1].split(" "),h=i[2],f=i[3],void e.forEach(function(a){b.hasTouch||(a=b.getPCevts(a)),c.delegate(k,a,h,f)})}}else{g=i[1];for(var l in g)d(l)}else{g=i[1],h=i[2];for(var m in g)a(m)}},C=function(){var a,d,e=arguments;if(e.length<1||e.length>4)return console.error("unexpected arguments!");var f="string"===b.getType(e[0])?document.querySelectorAll(e[0]):e[0];if(f=f.length?Array.prototype.slice.call(f):[f],1===e.length||2===e.length)return void f.forEach(function(d){a=e[1]?e[1].split(" "):Object.keys(d.listeners),a.length&&a.forEach(function(a){b.hasTouch||(a=b.getPCevts(a)),c.unbind(d,a),c.undelegate(d,a)})});if(3===e.length&&"function"===b.getType(e[2]))return d=e[2],void f.forEach(function(f){a=e[1].split(" "),a.forEach(function(a){b.hasTouch||(a=b.getPCevts(a)),c.unbind(f,a,d)})});if(3===e.length&&"string"===b.getType(e[2])){var g=e[2];return void f.forEach(function(d){a=e[1].split(" "),a.forEach(function(a){b.hasTouch||(a=b.getPCevts(a)),c.undelegate(d,a,g)})})}return 4===e.length?(d=e[3],void f.forEach(function(f){a=e[1].split(" "),a.forEach(function(a){b.hasTouch||(a=b.getPCevts(a)),c.undelegate(f,a,g,d)})})):void 0},D=function(a,d,e){var f=arguments;b.hasTouch||(d=b.getPCevts(d));var g="string"===b.getType(f[0])?document.querySelectorAll(f[0]):f[0];g=g.length?Array.prototype.call(g):[g],g.forEach(function(a){c.trigger(a,d,e)})};a();var E={};return E.on=E.bind=E.live=B,E.off=E.unbind=E.die=C,E.config=d,E.trigger=D,E});

(function(g){var e=$(window).height();var h=function(b){var c=[],d=b.length;for(var a=0;a<d;a++){c.push({top:$(b[a]).offset().top,left:$(b[a]).offset().left})}return c};var f=function(a){this.ele=a.ele;this.callback=a.callback||null;this.statuArry=[];this.eleArry=[];this.init()};f.prototype={init:function(){for(var a=0;a<this.ele.length;a++){this.eleArry.push(this.ele[a])}this.statuArry=h(this.eleArry);this.judge();this.events()},events:function(){var a=this;$(window).on("scroll",function(){setTimeout(function(){if(a.eleArry.length>0){a.judge()}},300)})},judge:function(){var c=this;var a=$(window).scrollTop(),q=$(window).height();var i=[];for(var d=0,b=this.eleArry.length;d<b;d++){var s=this.eleArry[d].clientHeight;if(a+q>=this.statuArry[d].top&&this.statuArry[d].top+s>=a){this.callback(this.eleArry[d]);i.push(0)}else{i.push(1)}}var t=[];for(var r=0,p=i.length;r<p;r++){if(i[r]==1){t.push(this.eleArry[r])}}this.eleArry=t;this.statuArry=h(this.eleArry)}};g.lazyload=f})(window);

var lady = {};

lady.wrap = $("#wrap");

lady.loadImg = function(a) {
    var src = a.getAttribute("_src");
    var img = new Image();
    img.onload = function() {
        a.src = src;
            a.style.opacity=1;
    };
    img.src = src;
};

lady.isArray = function(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == b) return true;
    }
    return false;
};

lady.getcookie = function(a) {
    a = window.document.cookie.match(RegExp("(?:^|;+|\\s+)" + a + "=([^;]*)"));
    return !a ? "" :a[1];
};

lady.setcookie = function(a, b, c, d, f) {
    if (f) {
        var e = new Date();
        e.setTime(new Date().getTime() + 864e5 * f);
    }
    var j = window.location.host;
    window.document.cookie = a + "=" + b + "; " + (f ? "expires=" + e.toGMTString() + "; " :"") + (d ? "path=" + d + "; " :"path=/; ") + (c ? "domain=" + c + ";" :"domain=" + j + ";");
    return !0;
};

lady.isLogin = lady.getcookie("one2one_uid");
lady.state = 0;
lady.preventDefault = function(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
};
lady.disable_scroll = function() {
    if (window.addEventListener) {
        window.addEventListener("DOMMouseScroll", lady.preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = lady.preventDefault;
    document.addEventListener("touchmove", lady.preventDefault, false);
};
lady.enable_scroll = function() {
    if (window.removeEventListener) {
        window.removeEventListener("DOMMouseScroll", lady.preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = null;
    document.removeEventListener("touchmove", lady.preventDefault, false);
};


lady.loadjs = function(file, fn, fail) {
    var js = document.createElement("script");
    js.setAttribute("type", "text/javascript");
    js.setAttribute("src", file);
    document.getElementsByTagName("head")[0].appendChild(js);
    js.onload = function() {
        fn && fn();
    };
    js.onerror  = function() {
        fail && fail();
    };
    return false;
};

lady.checkLoad = function(a, fn) {
    a.push(0);
    var c = a[a.length - 1];
    for (var i = 0; i < a.length - 1; i++) {
        var b = new Image();
        b.src = a[i];
        b.onload = function() {
            c++;
            if (c == a.length - 1) {
                "undefined" != typeof fn && fn();
            }
        };
    }
};

lady.getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};


lady.tipMsg = function(a, fn, b) {
    var speed = 1200;
    "undefined" != typeof b && (speed = b);
    var that = $(".tip-msg");
    if (lady.state == 1) {
        return false;
    }
    lady.state = 1;
    if (!that.length) {
        $("body").append('<div class="tip-msg"><span>' + a + "</span></div>");
        that = $(".tip-msg");
        that.css({
            height:36,
            overflow:"visible",
            opacity:1
        });
    } else {
        that.children("span").html(a);
        that.css({
            height:36,
            overflow:"visible",
            opacity:1
        });
    }
    setTimeout(function() {
        that.css("opacity", 0);
        setTimeout(function() {
            that.css({
                height:0,
                overflow:"hidden"
            });
            fn && fn();
            lady.state = 0;
        }, 300);
    }, speed);
};




lady.mask = function() {
    this.ele = document.createElement("div");
    this.ele.style.width = "100%";
    this.ele.style.background = "#000";
    this.ele.style.opacity = "0.2";
    this.ele.style.position = "absolute";
    this.ele.style.top = "0px";
    this.ele.style.left = "0px";
    this.ele.style.display = "none";
    this.ele.style.zIndex = "101";
    document.getElementById("wrap").appendChild(this.ele);
    this.resizeListener();
};

lady.mask.prototype = {
    resize:function() {
        var a = lady.wrap.height(), b = document.documentElement.clientHeight;
        this.ele.style.height = b >= a ? b + "px" :a + "px";
    },
    show:function() {
        this.resize();
        this.ele.style.display = "block";
    },
    hide:function() {
        this.ele.style.display = "none";
    },
    resizeListener:function() {
        var a = this;
        $(window).on("resize", function() {
            "block" == a.ele.style.display && a.resize();
        });
    }
};
var maskI = new lady.mask();

var indexNew = function() {
    var that = this;
    that.ele = $(".index-new ul");
    that.more = $(".load-more");
    that.pageCur = 0;
    that.pageSize = 6;
    that.pageCount = Math.ceil(list_content_info.length / this.pageSize);
    that.more.click(function() {
        if (that.pageCur == that.pageCount) {
            return false;
        }
        if (that.pageCur == that.pageCount - 1) {
            that.more.addClass("load-end").children("span").html("今天暂时没有了！");
        }
        that.loadData();
        that.pageCur++;
    });
};
indexNew.prototype.loadData = function() {
    var pageEnd = this.pageCur == this.pageCount - 1 ? list_content_info.length :this.pageSize * (this.pageCur + 1);
    for (var i = this.pageSize * this.pageCur; i < pageEnd; i++) {
        var Item = $('<li><div class="sort-name"><a href="' + list_content_info[i].lmurl + '">' + list_content_info[i].lanmu + '  · '+list_content_info[i].alias+'</a><a href="' + list_content_info[i].lmurl + '" class="more">更多</a></div><div class="pic"><a href="' + list_content_info[i].url + '"><img src="http://www.lady8844.com/images/wap_2015/images/f-index.png" _src="' + list_content_info[i].photo1 + '" style="opacity: 1;" /></a></div><div class="date">' + list_content_info[i].time + '</div><div class="tit"><a href="' + list_content_info[i].url + '">' + list_content_info[i].title + "</a></div></li>");
        this.ele.append(Item);
        lady.loadImg(Item.find("img")[0]);
    }
};


lady.good = function(ids) {
    $.ajax({
        type:"GET",
        url:"http://app.lady8844.com/webapp/like/counts",
        cache:true,
        timeout:5e3,
        data:{ids:ids},
        dataType:"jsonp",
        success:function(json) {
            if (json.code == 200) {
                for (var i = 0; i < json.data.length; i++) {
                    $("#" + json.data[i].id).find(".social a").eq(0).html(json.data[i].good);
                }
            }
        }
    });
	$(".social .good").unbind();
    $(".social .good").click(function() {
        var that = $(this);
        if (that.hasClass("gooded")) {
            return false;
        }
        var id = that.parent().parent().attr("id");
        $.ajax({
            type:"GET",
            url:"http://app.lady8844.com/webapp/like",
            cache:true,
            timeout:5e3,
            data:{id:id},
            dataType:"jsonp",
            success:function(json) {
                if (json.code == 200) {
					var count = parseInt(that.html());
                    that.addClass("gooded").html(++count);
                    lady.tipMsg("点赞成功");
                }
            }
        });
    });
};

lady.counts = function(ids) {
    $.ajax({
        type:"GET",
        url:"http://app.lady8844.com/webapp/comment/counts",
        cache:true,
        timeout:5e3,
        data:{ids:ids},
        dataType:"jsonp",
        success:function(json) {
            if (json.code == 200) {
                for (var i = 0; i < json.data.length; i++) {
                    $("#" + json.data[i].id).find(".social a").eq(1).html(json.data[i].counts);
                }
            }
        }
    });
};


var waterflow = function(opt) {
    this.ele = opt.ele;
	this.types = opt.types;
    this.itemL = this.ele.children("ul").eq(0);
    this.itemR = this.ele.children("ul").eq(1);
    this.more = this.ele.children(".load-more");
    this.isloading = false;
    this.pageCur = 1;
	this.init();
    this.events();
};

waterflow.prototype = {
    init:function() {
        var itms = $("li[id]", this.ele), ids = "";
        for (var i = 0; i < itms.length; i++) {
            ids += itms.eq(i).attr("id") + ",";
        }
        lady.good(ids);
		lady.counts(ids);
    },
    events:function() {
        var that = this;
        that.more.click(function() {
            if (pageSet.size + 1 == that.pageCur || that.isloading) {
                return false;
            }
            that.isloading = true, that.more.addClass("loading").children("span").html("加载中...");
            that.loadData();
			that.pageCur++;
        });
    },
    loadData:function() {
        var that = this;
        lady.loadjs(pageSet.url + that.types + "_" + that.pageCur + ".js", function() {
            var ids = "";
            for (var i = 0; i < data.length; i++) {
                var id = data[i].id;
                var Item = $('<li id="' + id + '"><div class="pic"><a href="' + data[i].url + '"><img src="http://www.lady8844.com/images/wap_2015/images/f.png" _src="' + data[i].pic + '" /></a></div><div class="social fn-clear"><a class="good">0</a><a href="' + data[i].url + '#comment-list">0</a></div><div class="tit"><a href="' + data[i].url + '">' + data[i].title + '</a></div><div class="date">' + data[i].time + "</div></li>");
                if (that.itemL.height() < that.itemR.height()) {
                    that.itemL.append(Item);
                } else {
                    that.itemR.append(Item);
                }
                lady.loadImg(Item.find("img")[0]);
                ids += id + ",";
            }
            lady.good(ids);
		    lady.counts(ids);
            that.isloading = false, that.more.removeClass("loading").children("span").html("查看更多");
			if (!data.length) {
				pageSet.size = that.pageCur - 1;
			}
			if (pageSet.size == that.pageCur - 1){
                that.more.addClass("loading").children("span").html("没有更多了");
				return false;
            }
        }, function(){
            that.more.addClass("loading").children("span").html("没有更多了");
            that.isloading = true;
        });
    }
};


$(".newzt .hd span").click(function() {
    var a = $(this), b = $(".newzt .bd .flow-box").eq(a.index());
    a.addClass("active").siblings("span").removeClass("active");
    b.addClass("flow-active").siblings().removeClass("flow-active");
    b.find("img").each(function() {
        lady.loadImg($(this)[0]);
    });
});


var searchflow = function(opt) {
    this.ele = opt.ele;
    this.keyname = opt.keyname;
	this.contentspec = opt.contentspec
    this.itemL = this.ele.children("ul").eq(0);
    this.itemR = this.ele.children("ul").eq(1);
    this.more = this.ele.find(".load-more");
    this.noResult;
    this.pageCur = 1;
    this.pageSize = 5;
    this.events();
	this.itemL.html("");
	this.itemR.html("");
	this.isFirst = true;
	this.isEnd = false;
	this.getData();
};

searchflow.prototype = {
    events:function() {
        var that = this;
        that.more.click(function(e) {
            if (that.isEnd) {
                return false;
            }
            that.more.addClass("loading").children("span").html("加载中...");
            that.getData();
        });
    },
    getData:function() {
        var that = this;
        this.ele.find(".no-result").css("display", "none");
        $.ajax("http://bbs.lady8844.com/v1/search1", {
            data:{
                contentSpec:that.contentspec,
                keyName:that.keyname,
                page:that.pageCur,
                size:that.pageSize
            },
            dataType:"jsonp",
            crossDomain:true,
            success:function(data) {
                if (data.code != 200) {
                    return false;
                }
                var list = data.data;
                if (that.isFirst) {
                    if (list.length == 0) {
                        that.noResult = that.ele.find(".no-result");
                        if (!that.ele.find(".no-result").length) {
                            that.ele.append('<div class="no-result">');
                            that.noResult = that.ele.find(".no-result");
                            that.noResult.html("没有找到相关内容");
                        }
                        that.noResult.css("display", "block");
                        return false;
                    }
                    that.isFirst = false;
                }
                var pageEnd = that.pageSize;
                if (list.length < that.pageSize) {
                    pageEnd = list.length;
                }
                for (var i = 0; i < pageEnd; i++) {
                    var Item = $('<li><div class="pic"><a href="' + list[i].url + '"><img src="http://www.lady8844.com/images/wap_2015/images/f.png" _src="' + list[i].imageUrl + '" /></a></div><div class="tit"><a href="' + list[i].url + '">' + list[i].title + '</a></div><div class="date">' + list[i].time + "</div></li>");
                    if (that.itemL.height() > that.itemR.height()) {
                        that.itemR.append(Item);
                    } else {
                        that.itemL.append(Item);
                    }
                    if (that.ele.hasClass("flow-active")) {
                        lady.loadImg(Item.find("img")[0]);
                    }
                }
                that.more.css("visibility", "visible");
                that.more.removeClass("loading").children("span").html("查看更多");
                if (list.length < 5) {
                    that.more.addClass("loading").children("span").html("没有更多了");
                    that.isEnd = true;
                }
                that.pageCur++;
            }
        });
    }
};


$(".result-hd ul li").click(function() {
    var a = $(this), b = $(".result-bd .flow-box").eq(a.index());
    a.addClass("active").siblings("li").removeClass("active");
    b.addClass("flow-active").siblings().removeClass("flow-active");
    b.find("img").each(function() {
        lady.loadImg($(this)[0]);
    });
});

var searchInp = function() {
    var ele = $(".header-search .s-inp"), inp = ele.children("input"), tip = ele.children(".tip"), btn = $(".header-search .s-btn"), clear = $(".clear-record"), hotSearch = $(".hot-search"), searchRecord = $(".search-record");
	var getcookie = lady.getcookie("search-keywords"), cookieArr = [], temp, curKeyword;
	$(".search").css("min-height", document.documentElement.clientHeight - 200);
	ele.width(lady.wrap.width() - 109);
    if (hotSearch.length > 0) {
        if (getcookie == "") {
            hotSearch.css("display", "block");
        } else {
            cookieArr = getcookie == "" ? [] :getcookie.split(",");
            for (var i = 0; i < cookieArr.length; i++) {
                temp = '<li><a href="#">' + cookieArr[i] + "</a></li>";
                searchRecord.find("ul").append(temp);
            }
            searchRecord.css("display", "block");
        }
    }
	var showResult = function(val){
		searchRecord.css("display", "none");
		hotSearch.css("display", "none");
		$(".result-hd").css("display", "block");
		tip.css("display", "none");
		inp.val(val);
		curKeyword = val;
		$(".load-more").css("visibility", "hidden").unbind( "click" );
        var searchflow1 = new searchflow({ele:$("#flow1"), keyname:val, contentspec:"infomation"});
		var searchflow2 = new searchflow({ele:$("#flow2"), keyname:val, contentspec:"post"});
		var searchflow3 = new searchflow({ele:$("#flow3"), keyname:val, contentspec:"product"});
	}
	searchRecord.find("li").click(function() {
		var val = $(this).children("a").html().replace(/(^\s*)|(\s*$)/g, "");
		showResult(val);
    });
	hotSearch.find("li").click(function() {
		var val = $(this).children("a").html().replace(/(^\s*)|(\s*$)/g, "");
		showResult(val);
    });
    $(window).resize(function() {
        ele.width(lady.wrap.width() - 109);
    });
    ele.click(function() {
        tip.css("display", "none");
        inp.focus();
    });
    inp.blur(function() {
        if (inp[0].value == "") {
            tip.css("display", "block");
        }
    });
    ele.click(function() {
        tip.css("display", "none");
        inp.focus();
    });
    btn.click(function() {
        var val = inp[0].value.replace(/(^\s*)|(\s*$)/g, "");
        if (val == "" || curKeyword == val) {
            return false;
        }
		showResult(val);
        getcookie = lady.getcookie("search-keywords");
        cookieArr = getcookie == "" ? [] :getcookie.split(",");
        if (lady.isArray(cookieArr, val)) {
            return false;
        }
        cookieArr.push(val);
        lady.setcookie("search-keywords", cookieArr);

		
    });
    clear.click(function() {
        lady.setcookie("search-keywords", "");
        searchRecord.css("display", "none");
        hotSearch.css("display", "block");
    });
};


var navbox = function() {
    var ele = $(".navbox"), point = $(".i-navbox"), channelNav = $(".channel-nav");
    point.click(function() {
        if (!ele.hasClass("navbox-active")) {
			$(this).children("i").css("border-top-color", "#ccc");
            ele.addClass("navbox-active").css({
                top:channelNav.height(),
                display:"block"
            });
        } else {
			$(this).children("i").css("border-top-color", "#c33");
            ele.removeClass("navbox-active").css("display", "none");
        }
    });
};



var tag_data = [ {
    href:"http://try.lady8844.com/wap/",
    name:"试用装"
}, {
    href:"http://bbs.lady8844.com/forum.php",
    name:"论坛"
} ];

if (null == typeof category || "undefined" == typeof category) {
    var category = "index";
}
var menu_data = [];
menu_data["index"] = [ {
    href:"http://m.lady8844.com/",
    name:"首页",
    ename:"INDEX"
}, {
    href:"http://m.lady8844.com/hf/",
    name:"美容",
    ename:"BEAUTY"
}, {
    href:"http://m.lady8844.com/fs/",
    name:"时尚",
    ename:"FASHION"
}, {
    href:"http://m.lady8844.com/ss/",
    name:"生活",
    ename:"LIFE"
}, {
    href:"http://m.lady8844.com/buy/",
    name:"优购",
    ename:"GUIDE"
}, {
    href:"http://bbs.lady8844.com/forum.php",
    name:"互动",
    ename:"INTERACTION"
}];
menu_data["beauty"] = [ {
    href:"http://m.lady8844.com/",
    name:"首页",
    ename:"INDEX"
}, {
    href:"http://m.lady8844.com/hf/",
    name:"护肤",
    ename:"SKINCARE"
}, {
    href:"http://m.lady8844.com/cz/",
    name:"彩妆",
    ename:"MARKEUP"
}, {
    href:"http://m.lady8844.com/fx/",
    name:"发型",
    ename:"HAIRSTYLE"
}, {
    href:"http://m.lady8844.com/yx/",
    name:"医美",
    ename:"PLASTIC"
}, {
    href:"http://m.lady8844.com/xs/",
    name:"香水",
    ename:"PERFUME"
}, {
    href:"http://m.lady8844.com/jy/",
    name:"精油",
    ename:"OIL"
}, {
    href:"http://m.lady8844.com/pc/",
    name:"评测",
    ename:"REVIEW"
} ];

menu_data["fashion"] = [ {
    href:"http://m.lady8844.com/",
    name:"首页",
    ename:"INDEX"
}, {
    href:"http://m.lady8844.com/fs/",
    name:"服饰",
    ename:"CLOTHING"
}, {
    href:"http://m.lady8844.com/sh/",
    name:"奢华",
    ename:"FASHION"
}, {
    href:"http://m.lady8844.com/mx/",
    name:"明星",
    ename:"STAR"
}, {
    href:"http://m.lady8844.com/hj/",
    name:"婚嫁",
    ename:"WEDDING"
} ];

menu_data["life"] = [ {
    href:"http://m.lady8844.com/",
    name:"首页",
    ename:"INDEX"
}, {
    href:"http://m.lady8844.com/ss/",
    name:"瘦身",
    ename:"FITNESS"
}, {
    href:"http://m.lady8844.com/qg/",
    name:"情感",
    ename:"EMOTION"
}, {
    href:"http://m.lady8844.com/jk/",
    name:"健康",
    ename:"HEALTH"
}, {
    href:"http://mfood.lady8844.com/",
    name:"美食",
    ename:"FOOD"
}, {
    href:"http://m.lady8844.com/jj/",
    name:"家居",
    ename:"HOME"
}, {
    href:"http://m.lady8844.com/qz/",
    name:"亲子",
    ename:"BABY"
} ];

menu_data["shopping"] = [ {
    href:"http://m.lady8844.com/",
    name:"首页",
    ename:"INDEX"
}, {
    href:"m.lady8844.com/buy/",
    name:"优购",
    ename:"SHOPPING"
} ];

menu_data["bbs"] = [ {
    href:"http://m.lady8844.com/",
    name:"首页",
    ename:"INDEX"
}, {
    href:"http://bbs.lady8844.com/forum.php",
    name:"论坛",
    ename:"BBS"
}, {
    href:"http://try.lady8844.com/wap/",
    name:"试用",
    ename:"TRY"
}, {
    href:"http://m.lady8844.com/bk/",
    name:"百科",
    ename:"FAQ"
}, {
    href:"http://m.lady8844.com/xz/",
    name:"星座",
    ename:"ASTRO"
} ];
var app_data = [ {
    dl_link:"<a href='http://m.lady8844.com/app'>下载客户端</a>",
	dl_pic:"http://www.lady8844.com/images/wap_2015/images/guide.jpg",
	pic:"http://www.lady8844.com/images/wap_2015/images/app-am.png",
    name:"爱美女性网APP",
	desc:"最实用时尚资讯、最贴心网购体验，点击下载！"
}, {
    dl_link:"<span>先保存二维码为本地图片，然后打开微信“扫一扫”，选择右上角菜单“从相册选取二维码”，马上关注！</span>",
	dl_pic:"http://www.lady8844.com/images/wap_2015/images/guide2.png",
	pic:"http://www.lady8844.com/images/wap_2015/images/app-wx.png",
    name:"微信公众号",
	desc:"<p>爱美女性网</p><p>微信号：lady8844com</p>"
} ];


var navbar = function() {
    this.point = $("#i-navbar");
    this.during = false;
    this.init();
	this.checkLogin = !1;
};

navbar.prototype = {
    init:function() {
        this.creatEle();
        this.events();
    },
    events:function() {
        var a = this;
        a.point.click(function() {
            if (a.during) {
                return false;
            }
            if (!a.navbar.hasClass("navbar-active")) {
                a.show();
            } else {
                a.hide();
            }
        });
        $(maskI.ele).click(function() {
            a.hide();
        });
		a.appItem.click(function() {
            a.showGuide($(this));
        });
        a.guideApp.click(function() {
            a.guideApp.css("display", "none");
        });
        a.guideApp.children(".bd").click(function(e) {
            e.stopPropagation();
        });
        a.guideApp.find(".close").click(function() {
            a.guideApp.css("display", "none");
        });
    },
    show:function() {
        var a = this;
        a.navbar.css({
            width:"100%",
            top:$("#header").offset().top + $("#header").height()
        }).addClass("navbar-active");
        maskI.show();
        a.during = true;
        setTimeout(function() {
            a.during = false;
        }, 300);
    },
    hide:function() {
        var a = this;
        a.navbar.removeClass("navbar-active");
        a.during = true;
        setTimeout(function() {
            a.navbar.css("width", 0);
            maskI.hide();
            a.during = false;
        }, 300);
    },
    creatEle:function() {
        this.navbar = $("<div class=navbar>");
        this.barNav = $("<div class=bar-nav>");
        this.barApp = $("<div class=bar-app>");
        this.guideApp = $("<div class=guide-app>");
        lady.wrap.append(this.navbar).append(this.guideApp);
        this.navbar.append(this.barNav).append(this.barApp);
		this.barNav.append('<dl><dt><a href="http://m.lady8844.com"><span class="c-name">首页</span><span class="e-name">HOME</span></a></dt></dl><dl><dt><a href="http://m.lady8844.com/hf/"><span class="c-name">美容</span><span class="e-name">BEAUTY</span></a></dt><dd><a href="http://m.lady8844.com/hf/">护肤</a><a href="http://m.lady8844.com/fx/">发型</a><a href="http://m.lady8844.com/cz/">彩妆</a><a href="http://m.lady8844.com/pc/">评测</a><a href="http://m.lady8844.com/jy/">精油</a><a href="http://m.lady8844.com/yx/">整形</a></dd></dl><dl><dt><a href="http://m.lady8844.com/fs/"><span class="c-name">时尚</span><span class="e-name">FASHION</span></a></dt><dd><a href="http://m.lady8844.com/fs/">服饰</a><a href="http://m.lady8844.com/sh/">奢华</a><a href="http://m.lady8844.com/hj/">婚嫁</a><a href="http://m.lady8844.com/mx/">明星</a><a href="http://m.lady8844.com/xs/">香水</a><a href="http://m.lady8844.com/buy/">导购</a></dd></dl><dl><dt><a href="http://m.lady8844.com/ss/"><span class="c-name">生活</span><span class="e-name">LIFE</span></a></dt><dd><a href="http://m.lady8844.com/ss/">瘦身</a><a href="http://m.lady8844.com/jk/">健康</a><a href="http://m.lady8844.com/qg/">情感</a><a href="http://mfood.lady8844.com/">美食</a><a href="http://m.lady8844.com/qz/">亲子</a><a href="http://m.lady8844.com/jj/">家居</a></dd></dl><dl><dt><a href=""><span class="c-name">精选</span><span class="e-name">CONCENTRATION</span></a></dt><dd><a href="http://m.lady8844.com/cpk/">美妆</a><a href="http://bbs.lady8844.com/forum.php">论坛</a><a href="http://try.lady8844.com/wap/">试用</a><a href="http://m.lady8844.com/bk/">百科</a><a href="http://m.lady8844.com/topic.html">专题</a><a href="http://m.lady8844.com/xz/">星座</a></dd></dl><dl><dt><a href="http://m.lady8844.com/sitemap"><span class="c-name">网站地图</span><span class="e-name" style="margin-left:40px;">sitemap</span></a></dt></dl>');
        this.getApp();
        this.getGuide();
    },
    getApp:function() {
        var str = "";
        for (var i = 0; i < app_data.length; i++) {
            str += '<div class="item app-dl fn-clear" data-link="' + app_data[i].dl_link + '" data-pic="' + app_data[i].dl_pic + '"><div class="pic"><a><img src="' + app_data[i].pic + '"/></a></div><div class="info"><div class="tit"><a>' + app_data[i].name + '</a></div><div class="desc">' + app_data[i].desc + "</div></div></div>";
        }
        this.barApp.append(str);
		this.appItem = this.barApp.find(".item");
    },
    getGuide:function() {
        this.guideApp.append('<div class="bd"><div class="pic"><img src="data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" _src="images/guide.jpg" /></div><div class="link"></div><div class="close"><img src="http://www.lady8844.com/images/wap_2015/images/dl-close.png" /></div></div>');
		this.guidePic = this.guideApp.find(".pic img");
		this.guideLink = this.guideApp.find(".link");
    },
    showGuide:function(a) {
		this.guidePic.css("opacity", 0).attr({"_src":a.attr("data-pic"), "src":"data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="});
		this.guideLink.html(a.attr("data-link"));
        lady.loadImg(this.guideApp.find("img")[0]);
        this.guideApp.css("display", "block");
		var sTop = document.documentElement.scrollTop + document.body.scrollTop;
        var _top = (document.documentElement.clientHeight - this.guideApp.children(".bd").height()) / 2 + sTop;
        this.guideApp.children(".bd").css("top", _top);
    }
};

var shareFun = function(url) {
	if('undefined' == typeof url){
		var shareUrl = window.location.href;
	}else{
		var shareUrl = url;
	}
    var shareTitle = $("title").eq(0).text(), shareDesc = $('meta[name="description"]').eq(0).attr("content");
    $(".share-list .s-qzone")[0].onclick = function() {
        window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(shareUrl) + "&title=" + encodeURIComponent(shareTitle) + "&desc=" + encodeURIComponent(shareDesc) + "&summary=&site=", "_blank");
    };
    $(".share-list .s-tqq")[0].onclick = function() {
        window.open("http://share.v.t.qq.com/index.php?c=share&a=index&appkey=&url=" + encodeURIComponent(shareUrl) + "&title=" + encodeURIComponent(shareTitle) + " " + encodeURIComponent(shareDesc), "_blank");
    };
    $(".share-list .s-tsina")[0].onclick = function() {
        window.open("http://v.t.sina.com.cn/share/share.php?url=" + encodeURIComponent(shareUrl) + "&title=" + encodeURIComponent(shareTitle) + " " + encodeURIComponent(shareDesc) + "&appkey=1343713053&searchPic=true", "_blank");
    };
    var guideCover = $('<div class="guide-cover"><img src="http://www.lady8844.com/images/wap_2015/images/guide.png"></div>');
    if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger") {
        guideCover = $('<div class="guide-cover"><span>点击浏览器分享，分享到微信朋友圈</span></div>');
    }
    $("body").append(guideCover);
    $(".share-list .s-weixin").click(function() {
        guideCover.css("display", "block");
    });
    guideCover.click(function() {
        $(this).css("display", "none");
    });
};


var btmshare = function() {
    this.point = $(".i-share");
    this.creatEle();
    this.events();
    shareFun();
};

btmshare.prototype = {
    events:function() {
        var a = this;
        a.point.click(function() {
            a.show();
        });
        $(a.btmshareWrap).click(function() {
            a.hide();
        });
        $(a.btmshare).click(function(e) {
            e.stopPropagation();
        });
        $(a.cancel).click(function() {
            a.hide();
        });
    },
    show:function() {
        var a = this;
        a.btmshareWrap.css("height", "100%").addClass("btmshare-active");
        lady.disable_scroll();
    },
    hide:function() {
        var a = this;
        a.btmshareWrap.removeClass("btmshare-active");
        lady.enable_scroll();
        setTimeout(function() {
            a.btmshareWrap.css("height", 0);
        }, 300);
    },
    creatEle:function() {
        this.btmshareWrap = $("<div class=btmshare-wrap>");
        this.btmshare = $("<div class=btmshare>");
        this.shareList = $('<div class="share-list">');
        this.qzone = $('<a class="s-qzone" title="分享到QQ空间"><span>QQ空间<span></a>');
        this.tqq = $('<a class="s-tqq" title="分享到腾讯微博"><span>腾讯微博<span></a>');
        this.tsina = $('<a class="s-tsina" title="分享到新浪微博"><span>新浪微博<span></a>');
        this.weixin = $('<a class="s-weixin" title="分享到微信"><span>微信<span></a>');
        this.cancel = $('<div class="cancel">取消</div>');
        lady.wrap.append(this.btmshareWrap);
        this.btmshareWrap.append(this.btmshare);
        this.btmshare.append(this.shareList).append(this.cancel);
        this.shareList.append(this.qzone).append(this.tqq).append(this.tsina).append(this.weixin);
    }
};

var comment = function() {
    var ele = $(".edit-comment"), inp = ele.children(".inp"), inp2 = inp.find("input"), num = ele.children(".num");
    inp.width(lady.wrap.width() - num[0].offsetWidth - 2);
    $(".comment").css("min-height", document.documentElement.clientHeight - 100);
    ele.css({height:50, overflow:"visible"});
    $(window).resize(function() {
        inp.width(lady.wrap.width() - num[0].offsetWidth - 2);
    });
    if (lady.getUrlParam("edit")) {
        inp2.focus();
    }
    inp2.bind({
        keypress:function(e) {
            var keyCode = e.which || e.keyCode;
            if (keyCode == 13) {
                alert("提交成功！");
            }
        }
    });
};

lady.getScrollTop = function() {
    return document.documentElement.scrollTop + document.body.scrollTop;
};

lady.setScrollTop = function(value) {
    if (document.documentElement.scrollTop) {
        document.documentElement.scrollTop = value;
    } else {
        document.body.scrollTop = value;
    }
};

(function() {
    if (document.getElementById("backtotop") != null) {
        var backtotop = document.getElementById("backtotop");
        window.onscroll = function() {
            lady.getScrollTop() > document.documentElement.clientHeight ? backtotop.style.display = "block" :backtotop.style.display = "none";
            if (document.getElementById("apply-btn") != null) {
                var btn = document.getElementById("apply-btn");
                lady.getScrollTop() > document.documentElement.clientHeight ? btn.style.display = "block" :btn.style.display = "none";
            }
        };
        backtotop.onclick = function() {
            var goTop = setInterval(scrollMove, 10);
            function scrollMove() {
                lady.setScrollTop(lady.getScrollTop() / 1.1);
                if (lady.getScrollTop() < 1) clearInterval(goTop);
            }
        };
    }
})();

var fiLoad_data = [ {
    href:"http://www.lady8844.com/",
    name:"试用装"
}, {
    href:"http://www.lady8844.com/",
    name:"论坛"
}, {
    href:"http://www.lady8844.com/",
    name:"时尚"
}, {
    href:"http://www.lady8844.com/",
    name:"美容"
}, {
    href:"http://www.lady8844.com/",
    name:"生活"
}, {
    href:"http://www.lady8844.com/",
    name:"优购"
}, {
    href:"http://www.lady8844.com/",
    name:"论坛"
}, {
    href:"http://www.lady8844.com/",
    name:"时尚"
}, {
    href:"http://www.lady8844.com/",
    name:"美容"
}, {
    href:"http://www.lady8844.com/",
    name:"生活"
}, {
    href:"http://www.lady8844.com/",
    name:"优购"
} ];

var fiLoad = function() {
    var ele = $('<div class="fi-load">'), tagList = "", isFirst = lady.getcookie("is_first_load") == "" ? 1 :0;
    if (!isFirst) {
        return false;
    }
    lady.setcookie("is_first_load", 1, 0, 0, 100);
    $("body").append(ele);
    for (var i = 0; i < fiLoad_data.length; i++) {
        tagList += '<a href="' + fiLoad_data[i].href + '">' + fiLoad_data[i].name + "</a>";
    }
    var temp = '<div class="fi-load-1"><div class="fi-load-2"><div class="fi-load-3"><div class="fi-bg"><img src="http://www.lady8844.com/images/wap_2015/images/fi-bg.jpg"/></div><div class="fi-logo"><img src="http://www.lady8844.com/images/wap_2015/images/fi-logo.png"/></div><div class="tags">' + tagList + '</div></div><div class="links"><a href="http://m.lady8844.com/app">下载客户端</a><a>继续浏览网页&gt;</a></div></div></div>';
    ele.append(temp);
    var imgList = [ "http://www.lady8844.com/images/wap_2015/images/fi-logo.png", "http://www.lady8844.com/images/wap_2015/images/fi-bg.jpg" ];
    lady.checkLoad(imgList, function() {
        setTimeout(function() {
            ele.addClass("fi-loaded").height(1e4);
            $(".fi-load-3").height(ele.find(".fi-bg img").height());
            $(".fi-load-2").height($(window).height());
            $("html").css("overflow", "hidden");
            lady.disable_scroll();
        }, 2e3);
    });
    ele.find(".links a").eq(1).click(function() {
        ele.removeClass("fi-loaded");
        setTimeout(function() {
            ele.height(0);
            $("html").css("overflow", "visible");
            lady.enable_scroll();
        }, 500);
    });
    $(window).resize(function() {
        if (ele.hasClass("fi-loaded")) {
            $(".fi-load-3").height(ele.find(".fi-bg img").height());
            $(".fi-load-2").height($(window).height());
        }
    });
};

var freeDay = function() {
    var a = $('<div style="position:fixed; bottom:-100px; right:5%; z-index:998; -webkit-transition: all 0.35s linear; -moz-transition: all 0.35s linear; transition: all 0.35s linear"><a href="http://app1.lady8844.com/URL/1074"><img style=" -webkit-transition: width 0.35s linear; -moz-transition: width 0.35s linear; transition: width 0.35s linear" src="http://img2.lady8844.com/n000/mzds_20160108_250x417.png" width="90" style="display:block" /></a></div>');
    $(".wrap").append(a);


    if ($(".main").hasClass('index')) {
        a.css({
            right: 'auto',
            left: '50%',
            bottom: -450,
            'margin-left': -65
        });
        a.find("img").css("width", 130);
        setTimeout(function() {
            a.css("bottom", "5%");
        }, 1e3);
        setTimeout(function() {
            a.css({
                'margin-left': -45,
                'bottom': 0
            });
            a.find("img").css("width", 90);
        }, 2e3);
    } else {
        setTimeout(function() {
            a.css("bottom", "4%");
        }, 1e3);
    }
};

var focusSlide = function() {
    var Focus = $("#focus"), Page = $("#pagination"), temp = "", len = Focus.find("li").length;
    Focus.find("li").eq(0).css("display", "block");
    for (var i = 1; i <= len; i++) {
        temp += "<span" + (i == 1 ? " class='active'" :"") + "></span>";
    }
    Page.append(temp);
};












var rightQrcode = function() {
    this.isCreate = 0;
	this.isShow = 0;
	this.init();
	this.t = null;
};
rightQrcode.prototype = {
    init:function() {
        var that = this;
        that.ele = $('<div id="right-qrcode" style="border: 1px solid #e4e4e4; background:#fff; position:fixed; left:50%; margin-left:350px; top:10%; padding:15px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; display:none; opacity:0; -webkit-transition: all 0.2s linear; -moz-transition: all 0.2s linear; transition: all 0.2s linear">');
        if ($(window).width() > 1084) {
            that.show();
            that.isShow = 1;
        }
        $(window).resize(function() {
            if ($(this).width() > 1084 && !that.isShow) {
                that.show();
                that.isShow = 1;
            } else if ($(this).width() < 1084 && that.isShow) {
                that.hide();
                that.isShow = 0;
            }
        });
    },
    createEle:function() {
        var that = this;
        lady.loadjs("http://www.lady8844.com/images/wap_2015/js/qrcode.min.js", function() {
            that.ele.append('<div id="qrcode"></div><div style="font-size:12px; color:#999; line-height:1; text-align:center; margin-top:10px">扫一扫，用手机查看本页</div>');
            $("body").append(that.ele);
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                width:160,
                height:160
            });
            qrcode.makeCode(window.location.href);
        });
    },
    show:function() {
        var that = this;
        if (that.isCreate == 0) {
            that.createEle();
            that.isCreate = 1;
        }
        that.ele.css("display", "block");
        clearInterval(that.t);
        that.t = setTimeout(function() {
            that.ele.css("opacity", 1);
        }, 200);
    },
    hide:function() {
        var that = this;
        that.ele.css("opacity", 0);
        clearInterval(that.t);
        that.t = setTimeout(function() {
            that.ele.css("display", "none");
        }, 200);
    }
};

var setTransform_X = function(ele,x){
	//alert(x);
	//ele.css({transform:"translate3d("+x+"px,0,0)"});
	ele[0].style.webkitTransform  = "translate3d("+x+"px, 0, 0)";
	ele[0].style.transform = "translate3d("+x+"px, 0, 0)";
	ele[0].style.msTransform   = "translate3d("+x+"px, 0, 0)";
	ele[0].style.OTransform   = "translate3d("+x+"px, 0, 0)";
};

var indexMenu = function(ele,cnt){
	this.ele = ele;
	this.cnt = cnt;
	this.init();
};
indexMenu.prototype = {
	init:function(){
		var that = this;
		var _w = $(window).width();
		this.ele.width(len*50);
		this.ele.find("li").eq(this.cnt-1).find("a").css({color:"#c33"});
		this._w = _w;
		var child = this.ele.find("li"),
			len = child.length,
			_cw = 50;
			this.canShowNum = Math.floor((_w-70)/_cw); //一屏显示个数
			this.total	= Math.ceil(len/this.canShowNum); //总屏数
			this.pcnt = Math.floor(this.cnt/this.canShowNum);//当前屏数
			if(this.cnt%this.canShowNum==0){
				this.pcnt--;
			}
		setTransform_X(this.ele,_w);
		this.ele.show();
		var sm = this.setmiddle(this.pcnt,this.cnt);
		setTimeout(function(){
			that.animation(that.pcnt,sm);
		},500);
		this.events();
	},
	animation:function(n,sm){
		var xx = -n*(50*this.canShowNum);
		if(sm){
			xx = xx+sm;
		}
		setTransform_X(this.ele,xx);
	},
	events:function(){
		var that = this;
		touch.on('#target', 'touchmove', function(ev){
			//ev.preventDefault();
		});
		var target = document.getElementById("target");
		touch.on(target, 'swiperight', function(ev){
            ev.preventDefault();
				if(that.pcnt!=0){
					// alert('that.pcnt');
					that.pcnt--;
					that.animation(that.pcnt);
				}else{
					return false;
				}
			// this.style.webkitTransform = "translate3d(" + rt + "px,0,0)";
		});

		touch.on(target, 'swipeleft', function(ev){
            ev.preventDefault();
				if(that.pcnt<that.total-1){
					that.pcnt++;
					that.animation(that.pcnt);
				}else{
					return false;
				}
		});
        that.ele.on("click",'a',function(){
            //location.href = $(this).attr("href");
        });
		$(".mu_btn").click(function(){
			if(that.pcnt<that.total-1){
				that.pcnt++;
				that.animation(that.pcnt);
			}else{
				return false;
			}
		});
	},
	setmiddle:function(pcnt,cnt){
		if(pcnt!=0){
			var incnt = cnt%this.canShowNum;
			incnt = (incnt == 0)?this.canShowNum:incnt;
			var t = Math.ceil(this.canShowNum/2);
			return (t-incnt)*50;
		}else{
			return false;
		}
	}
};

var ztTag = function() {
    var tag = $(".zt-tag"),
        more = tag.find(".more"),
        retract = tag.find(".retract");
    if (tag.find("a").length > 6) {
        more.css("display", "inline-block");
    }
    more.click(function() {
        tag.addClass("tag-open");
        more.css("display", "none");
        retract.css("display", "inline-block");
    })
    retract.click(function() {
        tag.removeClass("tag-open");
        more.css("display", "inline-block");
        retract.css("display", "none");
    })
}


$(function() {
    var lazyloadI = new lazyload({
        ele:$(".lazy-box"),
        callback:lady.loadImg
    });
    if ($("#flow1").length > 0) {
        var waterflow1 = new waterflow({
            ele:$("#flow1"),
            types:"indexV2"
        });
		if ($("#flow2").length > 0) {
			var waterflow2 = new waterflow({
            	ele:$("#flow2"),
            	types:"topicV2"
        	});
		} 
    }
    
    if ($(".i-share").length > 0) {
        new btmshare();
    }
    if ($(".try").length > 0) {
        tryList();
    }
    if ($(".i-navbox").length > 0) {
        new navbox();
        if (typeof pageSet != "undefined" && typeof pageSet.channel != "undefined" && $(".ch-" + pageSet.channel).length) {
            $(".ch-" + pageSet.channel).prependTo(".navbox");
        }
    }
    if ($(".comment").length > 0) {
        new comment();
    }
    if ($(".index-new").length > 0) {
        new indexNew();
    }
    if ($(".search").length > 0) {
        new searchInp();
    }
    if ($("#focus").length > 0) {
        new focusSlide();
    }
    if ($(".zt-tag").length > 0) {
        ztTag();
    }
	if ($(".index-nav").length > 0) {
		var indexNavItem = $(".index-nav li"), indexNavNum, chanelName = "";
		if($(".channel-name a").length){
			var string = $(".channel-name a").html();
			chanelName = string.replace('[','').replace(']','');
		}else{
			chanelName = '首页';
		}
		
        for (var i = 0; i < indexNavItem.length; i++) {
			if(chanelName == indexNavItem.eq(i).children("a").html()){
				indexNavNum = i;
			}
        }
		var hc_w = $(".index-nav ul li").length;
        $(".index-nav ul").width(hc_w*50);
        var n_menu = new indexMenu($(".index-nav ul"),indexNavNum + 1);
    }
    $(".app-dl .close, .fixed-ad .close").click(function() {
        $(this).parent().css({"max-height":0, "overflow":"hidden"});
    });
	if ($("#i-navbar").length > 0) {
        new navbar();
    }
	
	var time_now = new Date("yyyymmdd hh:mm:ss");
	$.ajax({
		type:"get",
		url:"http://bbs.lady8844.com/authorize/async/loginState.php",
		data:{time:time_now},
		dataType:"jsonp",
		jsonp:"isJsonp",
		success:function(data) {
			if (data.uid != "0") {
				var avatar = 'http://bbs.lady8844.com/uc_server/avatar.php?uid='+data.uid+'&size=small';
				var ucenter = 'http://bbs.lady8844.com/home.php?mod=space&uid='+data.uid+'&do=profile&mycenter=1';
				$(".u-default").attr({"href":ucenter});
				$(".u-default").addClass("u-logined").html("<img src='"+avatar+"' />");			
			}
		}
	});
	
});

window.onload = function() {
	//freeDay();
    if ($(".article").length > 0) {
		var article_id = $(".article").attr("id");
        lady.good(article_id);
        $(".social-tool .add").click(function() {
            var that = $(this);
            $.ajax({
                type:"GET",
                url:"http://app.lady8844.com/webapp/favorite",
                cache:true,
                timeout:5e3,
                data:{
                    id:article_id,
					uid:lady.getcookie("one2one_uid")
                },
                dataType:"jsonp",
                success:function(json) {
                    if (json.code == 200) {
                        that.addClass("added");
                        lady.tipMsg("收藏成功");
                    }else{
					    lady.tipMsg("请不要重复收藏");
					}
                }
            });
        });
    }
    //fiLoad();
    var Focus = $("#focus");
    if (Focus.length > 0) {
        setTimeout(function() {
            Focus.find("li").css("display", "block");
            Focus.find("li").each(function() {
                var img = $(this).find("img");
                if (img.attr("_src") != null) {
                    img.attr("src", img.attr("_src"));
                }
            });
            var mySwipe = Focus.Swipe({
                auto:3500,
                continuous:true,
                callback:function(index) {
                    $("#pagination").children("span").removeClass("active").eq(index).addClass("active");
                }
            }).data("Swipe");
        }, 1e3);
    }
    if (!/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
        new rightQrcode();
    }
};