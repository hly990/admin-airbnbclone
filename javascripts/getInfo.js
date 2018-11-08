function getInfo(href) {  //封装好的跳转到详情页面的函数，可以直接使用
	
	//点击带有getInfo类的按钮，就可以实现跳转到详情页面的功能
	$(".getInfo").each(function(index,ele){
		$(this).on("click",function(){
			$(".content-wait").removeClass("hidden"); // wait ajax info
			
    		var id = $(this).attr("data-id");
    		location.href = href+id;
		})
	})

}