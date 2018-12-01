/**
 * Created by helingyun on 2017/6/18.
 */
API_URI_PRE="https://kfer.cn/airbnbclone/";
IMAGE_ROOT="https://kfer.cn/";

$(document).ready(function() {
    $("#header").load("header.html");
    $("#nav").load("include.html", function() {
        $("#hotarea").addClass("has-child-item open-item active-item");
        $("#admin_hotarea_list").addClass("active-item");
        $.getScript("javascripts/template-script.min.js");
        $.getScript("javascripts/template-init.min.js");
    });
    var type = getQueryString("type");

    //  merge template
    infoDetail("pk", API_URI_PRE+"admin/area/admin_getBook.do?pk=", "#detailInfo", function() {

        addInfo();

    })

});

function addInfo() { //添加
    $(".saveInfo")[0].onclick = function() {
        $(".content-wait").removeClass("hidden"); // wait ajax info

        var data = {
            pk: getQueryString('pk'),
            areaId: $("input[name='bookId']").val(),
            userName:$("input[name='userName']").val(),
            userMobile:$("input[name='userMobile']").val(),
            content:$("input[name='content']").val()
        };

        $.ajax({
            type: "post",
            url: API_URI_PRE+"admin/area/admin_editBook.do",
            data: data,
            dataType: "json",
            success: function(data) {
                if(data[0] == 'OK') {
                    location.href = "admin_book_list.html";
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

