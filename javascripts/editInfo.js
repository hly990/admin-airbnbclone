function editInfo(href) {  //封装好的编辑功能，可以直接使用
	
	//点击带有editInfo类对按钮，就可以实现跳转到编辑页面对功能
	$(".editInfo").each(function(index,ele){
		$(this).on("click",function(){
			$(".content-wait").removeClass("hidden"); // wait ajax info  加载特效
			
			//获取点击item的id
    		var id = $(this).attr("data-id");
    		//跳转到指定页面
    		location.href = href+id;
		})
	})

}