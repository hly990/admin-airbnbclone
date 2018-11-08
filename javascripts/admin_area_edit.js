/**
 * Created by helingyun on 2017/6/18.
 */
var API_URI_PRE="https://www.buycarsmart.com.au/smartcar/";
//    API_URI_PRE="http://localhost:8081/smartcar/";
$(document).ready(function() {
	$("#header").load("header.html");
	$("#nav").load("include.html", function() {
		$("#car").addClass("has-child-item open-item active-item");
		$("#admin_carlist").addClass("active-item");
		$.getScript("javascripts/template-script.min.js");
		$.getScript("javascripts/template-init.min.js");
	});
	var type = getQueryString("type");

	//  merge template
	infoDetail("pk", API_URI_PRE+"admin/model/admin_getModelBy.do?pk=", "#carInfo", function() {
		$('#price').val(toThousands($('#price').val()));
		//get bandlist info
		bandList();

		//get bodytypelist info
		bodyTypeList();

		var imageObj = {
			faceuploadURL: '',
			outfaceuploadURL: '',
			frontuploadURL: '',
			enduploadURL: '',
			engineuploadURL: '',
			boxuploadURL: ''
		}

		//upload
		UploadFun(imageObj);

		addInfo(imageObj);

		//formVaild
		formVaild();

		//see More photos
		$(".seeMore>button").each(function() {
			$(this).on('click', function() {
				$(this).siblings('.more').fadeIn(1000);
				$(this).fadeOut(50);
			});
		});

		//deletePics
		//appearance
		deletePics('.appearance .img-box>i', 'https://www.buycarsmart.com.au/smartcar/admin/model/admin_deleteConfigAppearanceByPK.do');

		//front-row
		deletePics('.front-row .img-box>i', 'https://www.buycarsmart.com.au/smartcar/admin/model/admin_deleteConfigFrontRowByPK.do');

		//back-row
		deletePics('.back-row .img-box>i', 'https://www.buycarsmart.com.au/smartcar/admin/model/admin_deleteConfigBackRowByPK.do');

		//engine
		deletePics('.engine .img-box>i', 'https://www.buycarsmart.com.au/smartcar/admin/model/admin_deleteConfigEngineByPK.do');

		//trunk
		deletePics('.trunk .img-box>i', 'https://www.buycarsmart.com.au/smartcar/admin/model/admin_deleteConfigTrunkByPK.do');

		//see Big picture
		seeBigPics();
	})

});

function bandList() {
	$.ajax({
		type: "get",
		url: API_URI_PRE+"admin/model/admin_listBrandBy.do",
		dataType: 'json',
		success: function(data) {

			//template option
			var htmlstr = '';
			for(var i = 0, len = data.data.length; i < len; i++) {
				htmlstr += '<option value="' + data.data[i].brandId + '">' + data.data[i].name + '</option>';
			}
			$("#brandlist").html(htmlstr);

			//set the value
			var brandListValue = $("#brandlist").attr('data-value');

			$("#brandlist option").each(function() {
				console.log($(this).val() === brandListValue);
				if($(this).val() === brandListValue) {
					$(this).attr('selected', true);
				}
			});
		},
		error: function(error) {
			$(".content-loadError").removeClass('hidden');
			$(".imageUploadMsg").html('The page load failed, please reload');
			$(".close").click(function() {
				$(".content-imageError").addClass('hidden');
			})
		}
	});
}

function bodyTypeList() {
	$.ajax({
		type: "get",
		url: API_URI_PRE+"admin/model/admin_listBodyTypeBy.do",
		dataType: 'json',
		success: function(data) {

			//template option
			var htmlstr = '';
			for(var i = 0, len = data.data.length; i < len; i++) {
				htmlstr += '<option value="' + data.data[i].bodyTypeId + '">' + data.data[i].name + '</option>';
			}
			$("#body_typelist").html(htmlstr);

			//set the value
			var brandListValue = $("#body_typelist").attr('data-value');

			$("#body_typelist option").each(function() {
				console.log($(this).val() === brandListValue);
				if($(this).val() === brandListValue) {
					$(this).attr('selected', true);
				}
			});
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function UploadFun(imageObj) {

	var URLs = {

	}

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

			if(imageObj.faceuploadURL.length === 0) {
				imageObj.faceuploadURL += data.url;
			} else {
				imageObj.faceuploadURL = imageObj.faceuploadURL + ',' + data.url;
			}
            $(data.fileId).find('.diyFileName').attr('data-url',data.url);
			//			saveUpload();
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

			if(imageObj.outfaceuploadURL.length === 0) {
				imageObj.outfaceuploadURL += data.url;
			} else {
				imageObj.outfaceuploadURL = imageObj.outfaceuploadURL + ',' + data.url;
			}
			//			saveUpload();
			$(data.fileId).find('.diyFileName').attr('data-url',data.url);
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

			if(imageObj.frontuploadURL.length === 0) {
				imageObj.frontuploadURL += data.url;
			} else {
				imageObj.frontuploadURL = imageObj.frontuploadURL + ',' + data.url;
			}
$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			//			saveUpload();
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

			if(imageObj.enduploadURL.length) {
				imageObj.enduploadURL += data.url;
			} else {
				imageObj.enduploadURL = imageObj.enduploadURL + ',' + data.url;
			}
$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			//			saveUpload();
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

			if(imageObj.engineuploadURL.length === 0) {
				imageObj.engineuploadURL += data.url;
			} else {
				imageObj.engineuploadURL = imageObj.engineuploadURL + ',' + data.url;
			}
$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			//			saveUpload();
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

			if(imageObj.boxuploadURL.length === 0) {
				imageObj.boxuploadURL += data.url;
			} else {
				imageObj.boxuploadURL = imageObj.boxuploadURL + ',' + data.url;
			}
$(data.fileId).find('.diyFileName').attr('data-url',data.url);
			//			saveUpload();
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

	//	function saveUpload() {
	//
	//		var dataObj = {
	//			name: $("input[name='model']").val(),
	//			des: $("input[name='description']").val(),
	//			price: $("input[name='price']").val(),
	//			brandId: $("#brandlist").val(),
	//			bodyTypeId: $("#body_typelist").val(),
	//			pk: getQueryString('pk')
	//		}
	//
	//		for(key in URLs) {
	//			if(URLs[key].length) {
	//				dataObj[key] = URLs[key];
	//			}
	//		}
	//		//		$("a.saveInfo").removeClass("disabled");
	//		//
	//		addInfo(dataObj);
	//	}
}

function addInfo(imageObj) { //添加
	$(".saveInfo")[0].onclick = function() {
		$(".content-wait").removeClass("hidden"); // wait ajax info
		
		var URLs = {}
		for(var key in imageObj){
			if(imageObj[key] !== ''){
				URLs[key] = imageObj[key];
			}
		}
		
		var faceuploadURL=$('#curr_logoUrl').attr('data-value');
			for(var i=0;i<$('#face .diyFileName').length;i++){
				if(i == 0) {
				    faceuploadURL = $('#face .diyFileName:eq('+i+')').attr('data-url');
				} else {
					faceuploadURL = faceuploadURL + ',' + $('#face .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var outfaceuploadURL="";
			for(var i=0;i<$('.curr_outface').length;i++){
				if(i == 0) {
				    outfaceuploadURL = $('.curr_outface:eq('+i+')').attr('data-value');
				} else {
					outfaceuploadURL = outfaceuploadURL + ',' + $('.curr_outface:eq('+i+')').attr('data-value');
				}
			}
			
			for(var i=0;i<$('#outface .diyFileName').length;i++){
				if(i == 0) {
				    outfaceuploadURL = $('#outface .diyFileName:eq('+i+')').attr('data-url');
				} else {
					outfaceuploadURL = outfaceuploadURL + ',' + $('#outface .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var frontuploadURL="";
			for(var i=0;i<$('.curr_front').length;i++){
				if(i == 0) {
				    frontuploadURL = $('.curr_front:eq('+i+')').attr('data-value');
				} else {
					frontuploadURL = frontuploadURL + ',' + $('.curr_front:eq('+i+')').attr('data-value');
				}
			}
			for(var i=0;i<$('#front .diyFileName').length;i++){
				if(i == 0) {
				    frontuploadURL = $('#front .diyFileName:eq('+i+')').attr('data-url');
				} else {
					frontuploadURL = frontuploadURL + ',' + $('#front .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var enduploadURL="";
			for(var i=0;i<$('.curr_end').length;i++){
				if(i == 0) {
				    enduploadURL = $('.curr_end:eq('+i+')').attr('data-value');
				} else {
					enduploadURL = enduploadURL + ',' + $('.curr_end:eq('+i+')').attr('data-value');
				}
			}
			for(var i=0;i<$('#end .diyFileName').length;i++){
				if(i == 0) {
				    enduploadURL = $('#end .diyFileName:eq('+i+')').attr('data-url');
				} else {
					enduploadURL = enduploadURL + ',' + $('#end .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var engineuploadURL="";
			for(var i=0;i<$('.curr_engine').length;i++){
				if(i == 0) {
				    engineuploadURL = $('.curr_engine:eq('+i+')').attr('data-value');
				} else {
					engineuploadURL = engineuploadURL + ',' + $('.curr_engine:eq('+i+')').attr('data-value');
				}
			}
			for(var i=0;i<$('#engine .diyFileName').length;i++){
				if(i == 0) {
				    engineuploadURL = $('#engine .diyFileName:eq('+i+')').attr('data-url');
				} else {
					engineuploadURL = engineuploadURL + ',' + $('#engine .diyFileName:eq('+i+')').attr('data-url');
				}
			}
			var boxuploadURL="";
			for(var i=0;i<$('.curr_box').length;i++){
				if(i == 0) {
				    boxuploadURL = $('.curr_box:eq('+i+')').attr('data-value');
				} else {
					boxuploadURL = boxuploadURL + ',' + $('.curr_box:eq('+i+')').attr('data-value');
				}
			}
			for(var i=0;i<$('#box .diyFileName').length;i++){
				if(i == 0) {
				    boxuploadURL = $('#box .diyFileName:eq('+i+')').attr('data-url');
				} else {
					boxuploadURL = boxuploadURL + ',' + $('#box .diyFileName:eq('+i+')').attr('data-url');
				}
			}
		
		$.ajax({
			type: "post",
			url: API_URI_PRE+"admin/model/admin_editModelByPK.do",
			data: {
				name: $("input[name='model']").val(),
				des: $("#description").val(),
				price: $("input[name='price']").val()?$("input[name='price']").val().replace(/\,/g,''):null,
				brandId: $("#brandlist").val(),
				bodyTypeId: $("#body_typelist").val(),
				pk: getQueryString('pk'),
				sort:$('#model_edit_sort').val(),
				logoUrl: faceuploadURL,
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
			}
		});
	}
}

function formVaild() {
	//model vaild
	vaild("input[name='model']", "#modelTip", /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/, 'Can not be empty', 'Can only be numbers or letters，And must be greater than four');

	//description vaild
	vaild("input[name='description']", "#descriptionTip", /\*/, 'Can not be empty', '');

	//price vaild
	//vaild("input[name='price']", "#priceTip", /^\+?[1-9][0-9]*$/, 'Can not be empty', 'Can only be numbers');

}

function vaild(selector, tip, reg, contain1, contain2) {
	$(selector).on('blur', function() {

		$(tip).addClass('hidden').parent().parent().removeClass('has-error has-success');

		if($(this).val() == '') {
			$(tip).html(contain1).removeClass('hidden').parent().parent().addClass('has-error');
		} else if(!reg.test($(this).val())) {
			$(tip).html(contain2).removeClass('hidden').parent().parent().addClass('has-error');
		} else {
			$(tip).addClass('hidden').parent().parent().addClass('has-success');
		}
	});
}

function deletePics(selector, url) {
	$(selector).on('click', function() {
		$(this).parent().addClass('hidden'); // remove img-box

		$(".content-wait").removeClass("hidden"); // show ajax wait 

		$.ajax({ //ajax
			type: "get",
			url: url,
			data: {
				pk: $(this).attr('data-id') //data
			},
			success: function(data) {
				console.log(data);
				$(".content-wait").addClass("hidden"); // show ajax wait 

			},
			error: function(data) {
				$(".content-wait .three-bound").addClass('hidden');

				$(".content-wait .content-error").removeClass('hidden'); //show the error tip
			}
		});
	});
}

function seeBigPics() {
	$(".canBig").each(function() {
		$(this).on('click', function() {
			var picSrc = $(this).attr('src');

			$(".content-picBig").removeClass('hidden');

			$(".picBig .bigPic").attr('src', picSrc);
		});
	});

	$(".picBig .close").on('click', function() {
		$(this).parent().parent().addClass('hidden');
	});
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