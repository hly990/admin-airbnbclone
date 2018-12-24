/**
 * Created by helingyun on 2017/6/18.
 */
API_URI_PRE="http://localhost:9000/airbnbclone/";

$(document).ready(function() {
	$("#header").load("header.html");
	$("#nav").load("include.html", function() {
		$("#car").addClass("has-child-item open-item active-item");
		$("#admin_carlist").addClass("active-item");
		$.getScript("javascripts/template-script.min.js");
		$.getScript("javascripts/template-init.min.js");
	});

	infoDetail("pk", "https://www.buycarsmart.com.au/smartcar/admin/model/admin_getModelBy.do?pk=", "#carInfo", function() {
		$('#price').val(toThousands($('#price').val()));
		//get bandlist info
		bandList();

		//get bodytypelist info
		bodyTypeList();

		$(".seeMore>button").each(function() { //can show more picture
			$(this).on('click', function() {

				$(this).siblings('.more').fadeIn(1000);
				$(this).fadeOut(50);
			});
		});

		seeBigPics();
	});

});

function bandList() {
	$.ajax({
		type: "get",
		url: "https://www.buycarsmart.com.au/smartcar/admin/model/admin_listBrandBy.do",
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
			console.log(error);
		}
	});
}

function bodyTypeList() {
	$.ajax({
		type: "get",
		url: "https://www.buycarsmart.com.au/smartcar/admin/model/admin_listBodyTypeBy.do",
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

function infoDetail(query, href, selector) {
	var id = getQueryString(query);

	//merge  template
	templateFun({
		type: "get",
		url: href + id,
		selector: selector,
		model:"edit",
		fn: function() {

		}
	})
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