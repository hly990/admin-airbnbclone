/**
 * Created by helingyun on 2017/6/18.
 */
var API_URI_PRE="https://www.buycarsmart.com.au/smartcar/";
//    API_URI_PRE="http://localhost:8081/smartcar/";
$(document).ready(function() {
	$("#header").load("header.html");
	$("#nav").load("include.html", function() {
		$("#car").addClass("has-child-item open-item active-item");
		$("#admin_addnewcar").addClass("active-item");
		$.getScript("javascripts/template-script.min.js");
		$.getScript("javascripts/template-init.min.js");
	});
	var type = getQueryString("type");

	//get bandlist info
	bandList();

	//get bodytypelist info
	bodyTypeList();

	//upload
	UploadFun();

	//formVaild
	formValidator("#carForm");
	
	addInfo();

});

function bandList() {
	$.ajax({
		type: "get",
		url: API_URI_PRE+"admin/model/admin_listBrandBy.do",
		dataType: 'json',
		success: function(data) {

			//merge template brandlist
			var htmlstr = '<option value="-1">Please Selected</option>';
			for(var i = 0, len = data.data.length; i < len; i++) {
				htmlstr += '<option value="' + data.data[i].brandId + '">' + data.data[i].name + '</option>';
			}
			$("#brandlist").html(htmlstr);

			//vaild brandlist
			brandListVaild();

		},
		error: function(error) {
			console.log(error);
		}
	});

	function brandListVaild() {
		$("#brandlist").change(function() {
			//revert
			$(this).parent().parent().removeClass('has-error has-success');

			//valid
			if($(this).val() == -1) {

				$(this).parent().parent().addClass('has-error');
				$(".saveInfo").addClass('disabled');
			} else {
				$(this).parent().parent().addClass('has-success');
				$(".saveInfo").removeClass('disabled');
			}
		})
	}
}

function bodyTypeList() {
	$.ajax({
		type: "get",
		url:  API_URI_PRE+"admin/model/admin_listBodyTypeBy.do",
		dataType: 'json',
		success: function(data) {

			//merge template  bodyTypeList
			var htmlstr = '<option value="-1">Please Selected</option>';;
			for(var i = 0, len = data.data.length; i < len; i++) {
				htmlstr += '<option value="' + data.data[i].bodyTypeId + '">' + data.data[i].name + '</option>';
			}
			$("#body_typelist").html(htmlstr);

			//bodyTypeList valid;
			bodyTypeListVaild();

		},
		error: function(error) {
			console.log(error);
		}
	});

	function bodyTypeListVaild() {
		$("#body_typelist").change(function() {
			//revert
			$(this).parent().parent().removeClass('has-error has-success');

			//valid
			if($(this).val() == -1) {

				$(this).parent().parent().addClass('has-error');
				$(".saveInfo").addClass('disabled');
			} else {
				$(this).parent().parent().addClass('has-success');
				$(".saveInfo").removeClass('disabled');
			}
		})
	}
}

function UploadFun() {

	var faceuploadURL = '',
		outfaceuploadURL = '',
		frontuploadURL = '',
		enduploadURL = '',
		engineuploadURL = '',
		boxuploadURL = ''; //图片地址

	var count = 0;
	$('#faceupload').diyUpload({

		url: 'https://www.buycarsmart.com.au/smartcar/admin/file/file_upload_260_158.do',
		success: function(data) {
			if(data.code == 1) {
					$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html(data.msg);
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})
					return false;
				}

			if(faceuploadURL.length === 0) {
				faceuploadURL += data.url;
			} else {
				faceuploadURL = faceuploadURL + ',' + data.url;
			}
			$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			saveUpload();
            return true;
		},

		error: function(err) {

			$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html('Upload picture failed, please upload again');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})


		},

		buttonText: 'Upload',

		chunked: true,

		// 分片大小

		chunkSize: 512 * 1024,

		//最大上传的文件数量, 总文件大小,单个文件大小(单位字节);

		fileNumLimit: 1,

		fileSizeLimit: 500000 * 1024,

		fileSingleSizeLimit: 50000 * 1024,

		accept: {}

	});

	$('#outfaceupload').diyUpload({

		url: 'https://www.buycarsmart.com.au/smartcar/admin/file/file_upload_1920_955.do',

		success: function(data) {

			if(data.code == 1) {
					$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html(data.msg);
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})
					return false;
				}

			if(outfaceuploadURL.length === 0) {
				outfaceuploadURL += data.url;
			} else {
				outfaceuploadURL = outfaceuploadURL + ',' + data.url;
			}
			$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			saveUpload();
return true;
		},

		error: function(err) {

			$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html('Upload picture failed, please upload again');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})


		},

		buttonText: 'Upload',

		chunked: true,

		// 分片大小

		chunkSize: 512 * 1024,

		//最大上传的文件数量, 总文件大小,单个文件大小(单位字节);

		fileNumLimit: 50,

		fileSizeLimit: 500000 * 1024,

		fileSingleSizeLimit: 50000 * 1024,

		accept: {}

	});

	$('#frontupload').diyUpload({

		url: 'https://www.buycarsmart.com.au/smartcar/admin/file/file_upload_1920_955.do',

		success: function(data) {
			
			if(data.code == 1) {
					$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html(data.msg);
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})
					return false;
				}
		

			if(frontuploadURL.length === 0) {
				frontuploadURL += data.url;
			} else {
				frontuploadURL = frontuploadURL + ',' + data.url;
			}
$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			saveUpload();
return true;
		},

		error: function(err) {

			$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html('Upload picture failed, please upload again');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})


		},

		buttonText: 'Upload',

		chunked: true,

		// 分片大小

		chunkSize: 512 * 1024,

		//最大上传的文件数量, 总文件大小,单个文件大小(单位字节);

		fileNumLimit: 50,

		fileSizeLimit: 500000 * 1024,

		fileSingleSizeLimit: 50000 * 1024,

		accept: {}

	});

	$('#endupload').diyUpload({

		url: 'https://www.buycarsmart.com.au/smartcar/admin/file/file_upload_1920_955.do',

		success: function(data) {

			if(data.code == 1) {
					$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html(data.msg);
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})
					return false;
				}

			if(enduploadURL.length === 0) {
				enduploadURL += data.url;
			} else {
				enduploadURL = enduploadURL + ',' + data.url;
			}
$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			saveUpload();
return true;
		},

		error: function(err) {

			$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html('Upload picture failed, please upload again');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})


		},

		buttonText: 'Upload',

		chunked: true,

		// 分片大小

		chunkSize: 512 * 1024,

		//最大上传的文件数量, 总文件大小,单个文件大小(单位字节);

		fileNumLimit: 50,

		fileSizeLimit: 500000 * 1024,

		fileSingleSizeLimit: 50000 * 1024,

		accept: {}

	});

	$('#engineupload').diyUpload({

		url: 'https://www.buycarsmart.com.au/smartcar/admin/file/file_upload_1920_955.do',

		success: function(data) {
			
			if(data.code == 1) {
					$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html(data.msg);
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})
					return false;
				}


			if(engineuploadURL.length === 0) {
				engineuploadURL += data.url;
			} else {
				engineuploadURL = engineuploadURL + ',' + data.url;
			}
$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			saveUpload();
return true;
		},

		error: function(err) {

			$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html('Upload picture failed, please upload again');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})


		},

		buttonText: 'Upload',

		chunked: true,

		// 分片大小

		chunkSize: 512 * 1024,

		//最大上传的文件数量, 总文件大小,单个文件大小(单位字节);

		fileNumLimit: 50,

		fileSizeLimit: 500000 * 1024,

		fileSingleSizeLimit: 50000 * 1024,

		accept: {}

	});

	$('#boxupload').diyUpload({

		url: 'https://www.buycarsmart.com.au/smartcar/admin/file/file_upload_1920_955.do',

		success: function(data) {
			
			if(data.code == 1) {
					$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html(data.msg);
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})
					return false;
				}
			
			if(boxuploadURL.length === 0) {
				boxuploadURL += data.url;
			} else {
				boxuploadURL = boxuploadURL + ',' + data.url;
			}
$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			saveUpload();
			return true;
		},

		error: function(err) {

			$(".content-imageError").removeClass('hidden');
					$(".imageUploadMsg").html('Upload picture failed, please upload again');
					$(".close").click(function() {
						$(".content-imageError").addClass('hidden');
					})


		},

		buttonText: 'Upload',

		chunked: true,

		// 分片大小

		chunkSize: 512 * 1024,

		//最大上传的文件数量, 总文件大小,单个文件大小(单位字节);

		fileNumLimit: 50,

		fileSizeLimit: 500000 * 1024,

		fileSingleSizeLimit: 50000 * 1024,

		accept: {}

	});

	function saveUpload() {

		var imageURLObj = {
			faceuploadURL: faceuploadURL,
			outfaceuploadURL: outfaceuploadURL,
			frontuploadURL: frontuploadURL,
			enduploadURL: enduploadURL,
			engineuploadURL: engineuploadURL,
			boxuploadURL: boxuploadURL
		}

		for(key in imageURLObj) {
			console.log(key + ':' + imageURLObj[key]);
			if(imageURLObj[key].length === 0) {
				return;
			}
		}

		$("a.saveInfo").removeClass("disabled");

	}

}

function addInfo() { //添加
	$(".saveInfo")[0].onclick = function() {
		if($("#brandlist").val() == -1) {
			$("#brandlist").parent().parent().addClass('has-error');
			$(this).addClass('disabled');
			return;
		} else if($("#body_typelist").val() == -1) {
			$("#body_typelist").parent().parent().addClass('has-error');
			$(this).addClass('disabled');
			return;
		} else {
			var faceuploadURL="";
			for(var i=0;i<$('#face .diyFileName').length;i++){
				if(i == 0) {
				    faceuploadURL = $('#face .diyFileName:eq('+i+')').attr('data-url');
				} else {
					faceuploadURL = faceuploadURL + ',' + $('#face .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var outfaceuploadURL="";
			for(var i=0;i<$('#outface .diyFileName').length;i++){
				if(i == 0) {
				    outfaceuploadURL = $('#outface .diyFileName:eq('+i+')').attr('data-url');
				} else {
					outfaceuploadURL = outfaceuploadURL + ',' + $('#outface .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var frontuploadURL="";
			for(var i=0;i<$('#front .diyFileName').length;i++){
				if(i == 0) {
				    frontuploadURL = $('#front .diyFileName:eq('+i+')').attr('data-url');
				} else {
					frontuploadURL = frontuploadURL + ',' + $('#front .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var enduploadURL="";
			for(var i=0;i<$('#end .diyFileName').length;i++){
				if(i == 0) {
				    enduploadURL = $('#end .diyFileName:eq('+i+')').attr('data-url');
				} else {
					enduploadURL = enduploadURL + ',' + $('#end .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var engineuploadURL="";
			for(var i=0;i<$('#engine .diyFileName').length;i++){
				if(i == 0) {
				    engineuploadURL = $('#engine .diyFileName:eq('+i+')').attr('data-url');
				} else {
					engineuploadURL = engineuploadURL + ',' + $('#engine .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var boxuploadURL="";
			for(var i=0;i<$('#box .diyFileName').length;i++){
				if(i == 0) {
				    boxuploadURL = $('#box .diyFileName:eq('+i+')').attr('data-url');
				} else {
					boxuploadURL = boxuploadURL + ',' + $('#box .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			$(".content-wait").removeClass("hidden"); // wait ajax info
			$.ajax({
				type: "post",
				url:  API_URI_PRE+"admin/model/admin_addModelBy.do",
				data: {
					brandId: $("#brandlist").val(),
					bodyTypeId: $("#body_typelist").val(),					
					name: $("input[name='model']").val(),
					des: $('#description').val(),
					price: $("input[name='price']").val()?$("input[name='price']").val().replace(/\,/g,''):null,
					sort:$('#model_add_sort').val(),
					faceuploadURL: faceuploadURL,
					outfaceuploadURL: outfaceuploadURL,
					frontuploadURL: frontuploadURL,
					enduploadURL: enduploadURL,
					engineuploadURL: engineuploadURL,
					boxuploadURL: boxuploadURL
				},
				dataType: "json",
				success: function(data) {
					if(data.result.code === 0) {
						location.href = "admin_carlist.html";
					}
				},error:function(){
					$(".content-loadError").removeClass('hidden');
			$(".imageUploadMsg").html('The page load failed, please reload');
			$(".close").click(function() {
				$(".content-imageError").addClass('hidden');
			})
				}
			});

		}

	}
}

function dealPrice(obj){
	obj.value=obj.value.replace(/[^0-9\-\+\.]/g,'');
	if(obj.value.indexOf(".")>-1)obj.value=obj.value.substring(0,obj.value.indexOf(".")+3);
	if(obj.value.split(".").length>2)obj.value=obj.value.substring(0,obj.value.lastIndexOf("."));
	obj.value=toThousands(obj.value);
}
function toThousands(num) {
	var oldnum=num,num=num.split(".")[0],domnum='';
	if(oldnum.indexOf(".")>-1){
		domnum=oldnum.split(".")[1]?"."+oldnum.split(".")[1]:".";
	}
    var result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result+domnum;
   
}