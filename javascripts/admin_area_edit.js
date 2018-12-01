/**
 * Created by helingyun on 2017/6/18.
 */
API_URI_PRE="https://kfer.cn/airbnbclone/";
IMAGE_ROOT="https://kfer.cn/";

$(document).ready(function() {
	$("#header").load("header.html");
	$("#nav").load("include.html", function() {
		$("#area").addClass("has-child-item open-item active-item");
		$("#admin_arealist").addClass("active-item");
		$.getScript("javascripts/template-script.min.js");
		$.getScript("javascripts/template-init.min.js");
	});
	var type = getQueryString("type");

	//  merge template
	infoDetail("pk", API_URI_PRE+"admin/area/admin_getAreaBy.do?pk=", "#areaInfo", function() {

		$('#descriptioniption_detail').parent().html('<script type="text/plain" id="description" style="width:100%;height:240px;">'+$('#descriptioniption_detail').val()+'</script>');
		//实例化编辑器
		var um = UM.getEditor('description');

		var imageObj = {
			smallCoverURL: '',
			bigCoverURL: '',
			frontuploadURL: ''
		}

		//upload
		UploadFun(imageObj);

		addInfo(imageObj);

		//formVaild();

		//see More photos
		$(".seeMore>button").each(function() {
			$(this).on('click', function() {
				$(this).siblings('.more').fadeIn(1000);
				$(this).fadeOut(50);
			});
		});

		//deletePics

		//front-row
		deletePics('.front-row .img-box>i', API_URI_PRE+'/admin/area/admin_deleteContentImage.do');

		//see Big picture
		seeBigPics();

		//alert($("#container").val())
		if($("#container")){
			//百度地图
			$.getScript('http://api.map.baidu.com/api?v=2.0&ak=Ikd2A16tuZY9jviM4wRNkO2Tu3DT5lwK&callback=InitMap')
		}


	})

});

function loadScript() {
	var script = document.createElement("script");
	script.src = "http://api.map.baidu.com/api?v=2.0&ak=Ikd2A16tuZY9jviM4wRNkO2Tu3DT5lwK&callback=InitMap";
	document.body.appendChild(script);
}

function InitMap(){

	map=new BMap.Map("container");

	var positon_lat = $("#address_lat").val()?$("#address_lat").val():"116.43"
	var positon_lng = $("#address_lng").val()?$("#address_lng").val():"39.93"

	var point=new BMap.Point(positon_lng,positon_lat);//默认北京的经纬度点

	map.centerAndZoom(point,18);

	map.addOverlay(new BMap.Marker(point));//添加标注

	map.enableScrollWheelZoom();

	var autocompleteOptions={

		location:map,

		types:"",

		onSearchComplete:function(autocompleteResult){

			//alert("本次搜索的关键字:"+autocompleteResult.keyword);

			//alert("本次搜索结果总数:"+autocompleteResult.getNumPois());

			for(var i=0;i<autocompleteResult.getNumPois();i++){

				var poi=autocompleteResult.getPoi(i);

				console.log(poi);

			}

		},

		input:"textInput"
	};

	autocomplete=new BMap.Autocomplete(autocompleteOptions);

	autocomplete.addEventListener("onhighlight",function(e){

		var str="";

		var _value=e.fromitem.value;

		if(e.fromitem.index > -1){

			value = _value.province + _value.city + _value.district + _value.street + _value.business;

		}

		str = "FromItem index = " + e.fromitem.index + " value = " + value;

		value = "";

		if(e.toitem.index > -1){

			_value = e.toitem.value;

			value = _value.province + _value.city + _value.district + _value.street + _value.business;

		}

		//str += "<br/>ToItem index = " + e.toitem.index + " value = " + value;

		//document.getElementById("searchResultPanel").innerHTML = str;

	});

	autocomplete.addEventListener("onconfirm",function(e){

		var _value = e.item.value;

		myValue = _value.province + _value.city + _value.district + _value.street + _value.business;

		//document.getElementById("searchResultPanel").innerHTML = "onconfirm index = " + e.item + "myValue = " + myValue;

		setPlace();

	});

}

function setPlace(){

	map.clearOverlays();//清除地图上所有覆盖物

	var local=new BMap.LocalSearch(map,{

		//智能搜索
		onSearchComplete:function(){

			var pp=local.getResults().getPoi(0).point;//获取第一个智能搜索的结果

			map.centerAndZoom(pp,18);

			map.addOverlay(new BMap.Marker(pp));//添加标注

			$("#address_lat").val(pp.lat);
			$("#address_lng").val(pp.lng);

			//alert("lat:"+$("#address_lat").val()+" lng:"+$("#address_lng").val())
			$("#address").val(document.getElementById("textInput").value)
		}

	});

	local.search(myValue);

}

function InputTextClick(){

	var keyword=document.getElementById("textInput").value;

	if(keyword!=""){

		console.log(autocomplete);

		autocomplete.search(keyword);

	}

}

function UploadFun(imageObj) {

	var URLs = {

	}

	$('#smallCover').diyUpload({

		url: API_URI_PRE+'/admin/media/file_upload_400_300.do',

		success: function(data) {

			if(data[0] == 'ERR') {
				$(".content-imageError").removeClass('hidden');
				$(".imageUploadMsg").html(data.msg);
				$(".close").click(function() {
					$(".content-imageError").addClass('hidden');
				})
				return false;
			}

			imageObj.smallCoverURL += data[2];

			//$(data.fileId).find('.diyFileName').attr('data-url',data[2]);
			$("#curr_smallCoverURL").attr('data-value',data[2])
			$("#curr_smallCoverURL").attr('src',IMAGE_ROOT+data[2])
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


	$('#bigCover').diyUpload({

		url: API_URI_PRE+'/admin/media/file_upload_1600_1100.do',

		success: function(data) {

			if(data[0] == 'ERR') {
				$(".content-imageError").removeClass('hidden');
				$(".imageUploadMsg").html(data.msg);
				$(".close").click(function() {
					$(".content-imageError").addClass('hidden');
				})
				return false;
			}

			imageObj.bigCoverURL += data[2];

			$("#curr_bigCoverURL").attr('data-value',data[2])
			$("#curr_bigCoverURL").attr('src',IMAGE_ROOT+data[2])

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


	$('#frontupload').diyUpload({

		url: API_URI_PRE+'/admin/media/file_upload_800_350.do',

		success: function(data) {

			if(data[0] == 'ERR') {
				$(".content-imageError").removeClass('hidden');
				$(".imageUploadMsg").html(data.msg);
				$(".close").click(function() {
					$(".content-imageError").addClass('hidden');
				})
				return false;
			}

			var frontuploadURL = data[2]
			//提交ContentImage
			$.ajax({
				type: "get",
				url: API_URI_PRE+"admin/area/admin_addContentImage.do",
				data: {
					areaId: getQueryString('pk'),
					imageUrl: data[2]
				},
				dataType: "json",
				success: function(data) {

					if(imageObj.frontuploadURL.length === 0) {
						imageObj.frontuploadURL += frontuploadURL;
					} else {
						imageObj.frontuploadURL = imageObj.frontuploadURL + ',' + frontuploadURL;
					}

					$("#contentImages").append(
						'<span class="img-box">'
						+'<img class="canBig" data-value="'+frontuploadURL+'" id="curr_frontuploadURL" style="height: 56px; width: 100px;" src="https://kfer.cn/'+frontuploadURL+'" />'
						+'<i data-id="{{data.areaId}}">X</i>'
						+'</span>'
					)
					return true;
				}
			});

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

		var data = {
			pk: getQueryString('pk'),
			name: $("input[name='name']").val(),
			intro:$("input[name='intro']").val(),
			description: UM.getEditor('description').getContent(),
			price: $("input[name='price']").val(),
			lat: $("#address_lat").val(),
			lng: $("#address_lng").val(),
			address: $("#address").val()
		};

		var smallCoverURL=$('#curr_smallCoverURL').attr('data-value');

		if(smallCoverURL!=null && smallCoverURL.length>0){
			data['smallCoverUrl']=smallCoverURL;
		}

		var bigCoverURL=$('#curr_bigCoverURL').attr('data-value');

		if(bigCoverURL!=null && bigCoverURL.length>0){
			data['bigCoverUrl']=bigCoverURL;
		}



		$.ajax({
			type: "post",
			url: API_URI_PRE+"admin/area/admin_editAreaByPK.do",
			data: data,
			dataType: "json",
			success: function(data) {
				if(data[0] == 'OK') {
					location.href = "admin_arealist.html";
				}
			}
		});
	}
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



