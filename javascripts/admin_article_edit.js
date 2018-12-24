/**
 * Created by helingyun on 2017/6/18.
 */
// API_URI_PRE = "http://kfer.cn/airbnbclone/";
// IMAGE_ROOT = "http://kfer.cn/";

API_URI_PRE = "http://localhost:9000/mashupcms/";
IMAGE_ROOT = "http://localhost:9000/";

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
    infoDetail("pk", API_URI_PRE + "admin/infoflow/admin_getArticle.do?pk=", "#detailInfo", function() {

        $('#descriptioniption_detail').parent().html('<script type="text/plain" id="description" style="width:100%;height:240px;">' + $('#descriptioniption_detail').val() + '</script>');
        //实例化编辑器
        var um = UM.getEditor('description');

        var imageObj = {
            smallCoverURL: '',
            bigCoverURL: ''
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
        //deletePics('.front-row .img-box>i', API_URI_PRE + '/admin/area/admin_deleteContentImage.do');

        //see Big picture
        seeBigPics();

    })

});



function UploadFun(imageObj) {

    var URLs = {

    }

    $('#smallCover').diyUpload({

        url: API_URI_PRE + '/admin/infoflow/file_upload_109_104.do',

        success: function(data) {

            if (data[0] == 'ERR') {
                $(".content-imageError").removeClass('hidden');
                $(".imageUploadMsg").html(data.msg);
                $(".close").click(function() {
                    $(".content-imageError").addClass('hidden');
                })
                return false;
            }

            imageObj.smallCoverURL += data[2];

            //$(data.fileId).find('.diyFileName').attr('data-url',data[2]);
            $("#curr_smallCoverURL").attr('data-value', data[2])
            $("#curr_smallCoverURL").attr('src', IMAGE_ROOT + data[2])
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

        url: API_URI_PRE + '/admin/infoflow/file_upload_283_173.do',

        success: function(data) {

            if (data[0] == 'ERR') {
                $(".content-imageError").removeClass('hidden');
                $(".imageUploadMsg").html(data.msg);
                $(".close").click(function() {
                    $(".content-imageError").addClass('hidden');
                })
                return false;
            }

            imageObj.bigCoverURL += data[2];

            $("#curr_bigCoverURL").attr('data-value', data[2])
            $("#curr_bigCoverURL").attr('src', IMAGE_ROOT + data[2])

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
    $(".saveInfo").click(function() {
    //$(".saveInfo")[0].onclick = function() {
        $(".content-wait").removeClass("hidden"); // wait ajax info

        var URLs = {}
        for (var key in imageObj) {
            if (imageObj[key] !== '') {
                URLs[key] = imageObj[key];
            }
        }

        var data = {
            pk: getQueryString('pk'),
            title: $("input[name='title']").val(),
            intro: $("input[name='intro']").val(),
            content: UM.getEditor('description').getContent(),
            author: $("input[name='author']").val()
        };

        var smallCoverURL = $('#curr_smallCoverURL').attr('data-value');

        if (smallCoverURL != null && smallCoverURL.length > 0) {
            data['smallCoverUrl'] = smallCoverURL;
        }

        var bigCoverURL = $('#curr_bigCoverURL').attr('data-value');

        if (bigCoverURL != null && bigCoverURL.length > 0) {
            data['bigCoverUrl'] = bigCoverURL;
        }

        $.ajax({
            type: "post",
            url: API_URI_PRE + "admin/infoflow/admin_editArticle.do",
            data: data,
            dataType: "json",
            success: function(data) {
                if (data[0] == 'OK') {
                    location.href = "admin_articlelist.html";
                }
            }
        });

    });
}


function vaild(selector, tip, reg, contain1, contain2) {
    $(selector).on('blur', function() {

        $(tip).addClass('hidden').parent().parent().removeClass('has-error has-success');

        if ($(this).val() == '') {
            $(tip).html(contain1).removeClass('hidden').parent().parent().addClass('has-error');
        } else if (!reg.test($(this).val())) {
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