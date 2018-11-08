/**
 * Created by helingyun on 2017/6/22.
 */
/*
 * 项目基础类

 */

function goBack() {
    history.go(-1);
}

//采用正则表达式获取地址栏参数1
function getQueryString()
{
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            //this[name]=value;
            return value ;
        }
    }
}

function timeFormat(a, b) {
		if (a == undefined || a == null)
		{
			return;
		}
		Date.prototype.pattern=function(fmt) {
			var o = {
			"M+" : this.getMonth()+1, //月份
			"d+" : this.getDate(), //日
			"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
			"H+" : this.getHours(), //小时
			"m+" : this.getMinutes(), //分
			"s+" : this.getSeconds(), //秒
			"q+" : Math.floor((this.getMonth()+3)/3), //季度
			"S" : this.getMilliseconds() //毫秒
			};
			var week = {
			"0" : "/u65e5",
			"1" : "/u4e00",
			"2" : "/u4e8c",
			"3" : "/u4e09",
			"4" : "/u56db",
			"5" : "/u4e94",
			"6" : "/u516d"
			};
			if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
			}
			if(/(E+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
			}
			for(var k in o){
				if(new RegExp("("+ k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				}
			}
			return fmt;
		};

		var c = a.substring(0, 10).split('-'), dot = '-',  d = a.substring(10, 19);
		if (getBrowser().isFirefox || getBrowser().isMozilla) dot = '/';
		if (d == '') d = '00:00:00';

		var bb = new Date(c[1] + dot + c[2] + dot + c[0] + ' ' + d);
		return bb.pattern(b);

	}

function getBrowser(){
		return {
			isMozilla		:	(typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument != 'undefined'),
			isIE			:	window.ActiveXObject ? true : false,
			isFirefox		:	(navigator.userAgent.toLowerCase().indexOf("firefox") != - 1),
			isSafari		:	(navigator.userAgent.toLowerCase().indexOf("safari") != - 1),
			isOpera			:	(navigator.userAgent.toLowerCase().indexOf("opera") != - 1)
		};
}
function timedmyFormat(a, b) {
	var dd = a.split("/")[0],mm=a.split("/")[1],yyyy=a.split("/")[2];	
	return yyyy+"-"+mm+"-"+dd;
}