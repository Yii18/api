/*判断手机类型点击下载*/
$(function(){
    var j={versions:function(){
    var e=navigator.userAgent,
    t=navigator.appVersion;
    return{trident:e.indexOf("Trident")>-1,
            presto:e.indexOf("Presto")>-1,
            webKit:e.indexOf("AppleWebKit")>-1,
            gecko:e.indexOf("Gecko")>-1&&e.indexOf("KHTML")==-1,
            mobile:!!e.match(/AppleWebKit.*Mobile.*/)||!!e.match(/AppleWebKit/),
            ios:!!e.match(/(i[^;]+;(U;)? CPU.+Mac OS X)/),
            android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,
            iPhone:e.indexOf("iPhone")>-1||e.indexOf("Mac")>-1,
            iPad:e.indexOf("iPad")>-1,
            webApp:e.indexOf("Safari")==-1
        }
    }(),
    language:(navigator.browserLanguage||navigator.language).toLowerCase()
};
if(j.versions.iPhone==true){
    $(".download a").attr("href","https://itunes.apple.com/cn/app/ai-mei-wang/id571963009?mt=8")
}else if(j.versions.android==true){
    $(".download a").attr("href","http://m.lady8844.com/android_download.html")
}else{
    $(".download a").attr("href","https://itunes.apple.com/cn/app/ai-mei-wang/id571963009?mt=8")
}
});

$('.ad-top').html("<div style='max-width:640px; margin:0 auto'><iframe id='index_top_if' name='index_top_if' class='autoHeight' style='display:block' height='0' width='100%' frameborder=0 scrolling=no src='http://m.lady8844.com/IMAGE/content_top_hufu.html' ></iframe></div>");
$('.ad-top').show();

$('#CONTENT_AD_3').append("<iframe id='CONTENT_AD_3_IF' name='CONTENT_AD_3_IF' height='50' width='100%' frameborder=0 scrolling=no src='http://www.lady8844.com/IMAGE/CATEGORY/wap/wap_2014/google.html?ParentID="+P_ParentID+"' style='padding-top: 15px;'></iframe>");
//$('#CONTENT_AD_3').append("<div style='overflow: hidden; margin-top: 5px; text-align:center;'><iframe id='content_top_shishang' name='content_top_shishang' height='365' width='100%' frameborder=0 scrolling=no src='http://m.lady8844.com/IMAGE/weixin.html' ></iframe></div>");

$('#CONTENT_AD_4').append("<div style='overflow: hidden; margin-top: 3px; text-align:center;'><iframe id='page_down_02' name='page_down_02' height='100' width='100%' frameborder=0 scrolling=no src='http://www.lady8844.com/IMAGE/CATEGORY/wap/wap_2014/page_down_02.html' ></iframe></div>");

$('#CONTENT_AD_4').append("<div style='overflow: hidden; margin-top: 5px; text-align:center;'><iframe id='CONTENT_AD_3_nav' name='CONTENT_AD_3_nav' height='44' width='100%' frameborder=0 scrolling=no src='http://www.lady8844.com/IMAGE/CATEGORY/wap/wap_2014/bottom.html' ></iframe></div>");

//$('.rel-zt').after("<div style='overflow: hidden; text-align:center;'><iframe id='content_top_shishang' name='content_top_shishang' height='48' width='100%' frameborder=0 scrolling=no src='http://www.lady8844.com/IMAGE/CATEGORY/wap/wap_2014/nav_ad.html' style='padding-top: 15px;'></iframe></div>");

$('#CONTENT_AD_4').show();