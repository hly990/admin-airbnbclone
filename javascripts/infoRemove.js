function infoRemove(fn){ //删除功能
	$(".clickRemove").each(function(index,ele){
		$(this).on('click',function(){
			
//			$(".content-remove>.panel").fadeIn(100);
			
			$(".content-wait").removeClass("hidden"); // wait ajax info
			
			
			var id = $(this).attr("data-id");
			if(fn){
				fn(id);
			}
		});
		
	})
}
function removeTip() {//点击出现是否删除的盒子
	$(".removeTip").each(function(ele, index) {
		$(this).click(function() {

			//show the remove box 
			$(".content-remove").removeClass('hidden');
			$(".content-remove>.panel").fadeIn(500);

			//gave yes btn data-id

			$(".clickRemove").attr('data-id', $(this).attr('data-id'));
		});
	});

	$(".cancelRemove").click(function() {
		$(".content-remove").addClass('hidden');
		$(".content-remove>.panel").fadeOut(50);
	})
}