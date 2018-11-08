
//这里是对cookie对增删改查，可以直接使用

function setCookie(c_name,value,expiredays){
	//如果特别设置了cookie对保持事件
	 if (expiredays) {
        var date = new Date();
        date.setTime(date.getTime()+(expiredays*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }else{
        var expires = "";
    }
    document.cookie = c_name+"="+value+expires+"; path=/";
}

//获取cookie
function getCookie(c_name){
	if(document.cookie.length > 0){
		c_start = document.cookie.indexOf(c_name+'=');
		if(c_start !== -1){
			c_start = c_start+c_name.length+1;
			
			c_end = document.cookie.indexOf(';',c_start);
			if(c_end == -1){
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return '';
}
//检查cookie，如果存在cookie返回true
function checkCookie(c_name){
	var result = getCookie(c_name);
	
	if(result !== null && result !==''){
		return true;
	}else{
		return false;
	}
}
//删除cookie
function deleteCookie(c_name){
	setCookie(c_name,';',-1);
	location.href = 'index.html';
}

//删除cookie
function deleteCookie2(c_name){
	if(getCookie('sessionKey_admin')){
		var cookie=getCookie('sessionKey_admin').split('_')[0];
		$.ajax({
        url: "https://www.buycarsmart.com.au/smartcar/admin/user/admin_logout.do",
        type: "get",
        async:false,
        dataType: "json",
        data: {
            adminUserSessionId : cookie
        },
        success: function(data){
        	console.log(data);
        	deleteCookie('sessionKey_admin');
        },
        error:function(error){
        	console.log(error);
        }
    });
  }else{
  	location.href = 'index.html';
  }
}	