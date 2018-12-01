function infoDetail(query,href,selector,f){ //封装好的进入详细页面功能不用改动
	
	//获取当前浏览器地址栏的参数
	var id = getQueryString(query);
	
	//merge  template 发送ajax获取对应信息
    templateFun({
    	type : "get",
    	url : href+id,
		model:"edit",
    	selector : selector,
    	fn : function(){
    		
    		$(".content-wait").addClass("hidden"); // wait ajax info


    		if(f){
    			f();
    		}
    	}
    })
}