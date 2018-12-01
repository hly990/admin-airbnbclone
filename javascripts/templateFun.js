function templateFun(obj){ //封装好的模版函数，基本不用动
	$.ajax({
    	type:obj.type,
    	url:obj.url,
    	async:true,
    	data:obj.data,
    	success: function(data){
    		
//  		-------------------
//			tempalte
    		
    		var objs = JSON.parse(data);

			var dataList;
			if(obj.model == 'edit'){
				dataList = objs[1];
			} else {
				dataList = objs[2];
			}

			var strData = '{"data":'+JSON.stringify(dataList)+'}'

			var parseData = JSON.parse(strData);


//  		判断当前页面是否是下面两个,如果是,就调用下面函数将最大的sort显示出来
//     		var currentUrl = window.location.pathname;
// 				if(currentUrl.indexOf('/admin_dealerlist.html') !=-1 || currentUrl.indexOf('/admin_saleslist.html') != -1  ) {
// 					maxSort(data);
// 				}
//     		console.log(data);

			var currentUrl = window.location.pathname;
			if(currentUrl.indexOf('/admin_arealist.html') !=-1 || currentUrl.indexOf('/admin_area_edit.html') != -1
				|| currentUrl.indexOf('/admin_area_add.html') != -1) {

				if(parseData.data.contentImages != undefined){
					var contentImages = JSON.parse(parseData.data.contentImages)
					parseData.data.contentImages = contentImages
				}

			}

//  		调用函数将返回的数据传入tempalte函数
    		var result= template("tpl-user", parseData);
			
    		$(obj.selector).html(result);

			// var currentUrl = window.location.pathname;
			// if(currentUrl.indexOf('/admin_area_edit.html') !=-1) {
			// 	loadScript();
			// }
    		
//  		-------------------------
//			pages
			if(obj.model == 'edit'){
				if(obj.fn){
					obj.fn();
				}
			} else {
				var pages = objs[1]
				var pageCount = pages[0]
				var pageNumber = pages[1]
				var pageSize = pages[2]
				//console.log("pageCount:"+pageCount+"&pageNumber:"+pageNumber+"&pageSize:"+pageSize);
				//if(data.page){
				if(pageCount/pageSize > parseInt(pageCount/pageSize)){

					var totalPage = parseInt(pageCount/pageSize)+1;

				}else{

					var totalPage = (pageCount/pageSize);

				}
				$('#pageer span.totalPage').html('/'+totalPage);
				$('#pageer .currentCount').html(pageCount);
				$('#pageer .currentCount').val(pageCount);
				$('#pageer .current').html(pageNumber);
				$('#pageer .current').val(pageNumber);

				if(obj.fn){
					obj.fn(totalPage);
				}
			}
    	},error:function(){
    		$(".content-loadError").removeClass('hidden');
			$(".imageUploadMsg").html('The page load failed, please reload');
			$(".close").click(function() {
				$(".content-loadError").addClass('hidden');
			})
    	}
	});
}

function maxSort(data){
	var max = 0;
	for(var i = 0 , len= data.data.length;i<len;i++){
		if(data.data[i].sort>max){
			max = data.data[i].sort;
		}
	}
	data.maxSort = max;
}
