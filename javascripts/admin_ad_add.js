/**
 * Created by helingyun on 2017/6/18.
 */
API_URI_PRE="https://kfer.cn/airbnbclone/";
IMAGE_ROOT="https://kfer.cn/";

$(document).ready(function() {
    $("#header").load("header.html");
    $("#nav").load("include.html", function() {
        $("#ad").addClass("has-child-item open-item active-item");
        $.getScript("javascripts/template-script.min.js");
        $.getScript("javascripts/template-init.min.js");
    });
    var type = getQueryString("type");

    var imageObj = {
        bigCoverURL: ''
    }

    //upload
    UploadFun(imageObj);

    addInfo(imageObj);

    //formVaild();


});

function UploadFun(imageObj) {

    var URLs = {

    }

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
            title: $("input[name='title']").val(),
            link:$("input[name='link']").val(),
            positionCode: $("input[name='positionCode']").val(),
            position: $("input[name='position']").val()
        };

        var bigCoverURL=$('#curr_bigCoverURL').attr('data-value');

        if(bigCoverURL!=null && bigCoverURL.length>0){
            data['coverUrl']=bigCoverURL;
        }

        $.ajax({
            type: "post",
            url: API_URI_PRE+"admin/user/admin_addAd.do",
            data: data,
            dataType: "json",
            success: function(data) {
                if(data[0] == 'OK') {
                    location.href = "admin_ad_list.html";
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



