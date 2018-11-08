/**
 * Created by helingyun on 2017/7/20.
 */
$(document).ready(function(){


});

function go() {
    $.ajax({
        url: "http://localhost:8080/smartcar/admin/user/admin_login.do",
        type: "get",
        dataType: "json",
        data: {
            username: $("#username").val(),
            password: md5($("#password").val())
        },
        success: function(data){
            if(data.result.code==0){
                location.href = "admin_userlist.html";
            }else{
                alert(data.result.msg);
            }
        }
    });

}
