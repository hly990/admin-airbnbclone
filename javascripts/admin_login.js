/**
 * Created by helingyun on 2017/7/20.
 */
API_URI_PRE="https://kfer.cn/airbnbclone/";

$(document).ready(function(){
	checkLog();
});

function checkLog(){
	
//	如果有cookue,说明依旧登陆了
	if(checkCookie('sessionKey_admin')){
		
		$("#form1").addClass('hidden');
		location.href = "admin_arealist.html";
//		$("#log-out").removeClass('hidden');
		
	}else{
		
		$("#form1").removeClass('hidden');
		$("#log-out").addClass('hidden');
		
	}
}
//提交登陆函数
function go() {
    $.ajax({
        url: API_URI_PRE+"/admin/user/admin_login.do",
        type: "get",
        dataType: "json",
        data: {
            username: $("#username").val(),
            password: $("#password").val()
        },
        success: function(data){
            var user = data[1]
            if(data[1]!=null){
                location.href = "admin_arealist.html";
                setCookie('sessionKey_admin',user.areaId+"_"+new Date());
               	setCookie('admin_userinfo',$("#username").val());
            }else{
                alert("wrong user name or password");
            }
        }
    });

}
function out() {
	var cookie=getCookie('sessionKey_admin').split('_')[0];
    $.ajax({
        url: "https://kfer.cn/admin/user/admin_logout.do",
        type: "get",
        dataType: "json",
        data: {
            adminUserSessionId : cookie
        },
        success: function(data){
        	console.log(data);
        	deleteCookie('sessionKey_admin');
        	console.log(checkCookie('sessionKey_admin'));
        },
        error:function(error){
        	console.log(error);
        }
    });

}
