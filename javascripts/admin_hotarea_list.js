/**
 * Created by helingyun on 2017/6/18.
 */
API_URI_PRE="https://kfer.cn/airbnbclone/";
$(document).ready(function() {

    template.defaults.imports.parse = JSON.parse;

    $("#header").load("header.html");
    $("#nav").load("include.html", function() {
        $("#hotarea").addClass("has-child-item open-item active-item");
        //$("#admin_arealist").addClass("active-item");
        $.getScript("javascripts/template-script.min.js");
        $.getScript("javascripts/template-init.min.js");
    });

    //	merge template
    templateFun({
        type: "get",
        url: API_URI_PRE+"admin/area/admin_listHotArea.do",
        selector: "#areaList",
        data: {
            pageNumber: 1,
            pageSize: 10
        },
        fn: function(totalPage) {
            //remove
            removeTip();
            infoRemove(function(id) {
                $.ajax({
                    type: "get",
                    url: API_URI_PRE+"admin/area/admin_deleteHotArea.do",
                    data: {
                        areaId: id
                    },
                    success: function(data) {
                        console.log(data);

                        $(".content-wait").addClass("hidden"); // wait ajax info

                        $(".content-remove").addClass("hidden");
                        $(".content-remove>.panel").fadeOut(50);

                        $(".removeTip").each(function() {
                            if($(this).attr('data-id') == id) {
                                $(this).parent().parent().parent().remove();
                            }
                        })
                    }
                });
            }); //remove item
            getInfo("admin_hotarea_detail.html?pk="); //get item detail
            editInfo("admin_hotarea_edit.html?pk="); // edit item info
            $(".content-wait").addClass("hidden"); // wait ajax info

            //show current page
            $("#pageer .current").html(1);

            pageTurn(totalPage, {
                detailURL: API_URI_PRE+"admin/area/admin_listHotArea.do",
                deleteURL: API_URI_PRE+"admin/area/admin_deleteHotArea.do",
                getURL: "admin_area_detail.html?pk=",
                editURL: "admin_hotarea_edit.html?pk=",
            }, "#areaList", {
                pk: $(".clickRemove").attr('data-id')
            });

            //search
            search();
        }

    });
});

function search() {
    $(".searchBtn").click(function() {
        //				merge template
        $(".content-wait").removeClass('hidden'); // wait ajax


        templateFun({
            type: "get",
            url:  API_URI_PRE+"admin/area/admin_listAreaBy.do?searchContent="+$(".searchContent").val(),
            selector: "#areaList",
            data: {
                pageNumber: 1,
                pageSize: 10
            },
            fn: function(totalPage) {
                $(".content-wait").addClass('wait');  // hidden wait ajax

                //remove
                removeTip();
                infoRemove(function(id) {
                    $.ajax({
                        type: "get",
                        url: API_URI_PRE+"admin/area/admin_deleteAreaByPK.do",
                        data: {
                            pk: id
                        },
                        success: function(data) {
                            console.log(data);

                            $(".content-wait").addClass("hidden"); // wait ajax info

                            $(".content-remove").addClass("hidden");
                            $(".content-remove>.panel").fadeOut(50);

                            $(".removeTip").each(function() {
                                if($(this).attr('data-id') == id) {
                                    $(this).parent().parent().parent().remove();
                                }
                            })
                        }
                    });
                }); //remove item

                getInfo("admin_area_detail.html?pk="); //get item detail
                editInfo("admin_area_edit.html?pk="); // edit item info
                $(".content-wait").addClass("hidden"); // wait ajax info

                //show current page
                $("#pageer .current").html(1);

                //merge detailURL
                var detailURL =  API_URI_PRE+"admin/area/admin_listAreaBy.do?searchContent="+$(".searchContent").val();

                pageTurn(totalPage, {
                    detailURL: detailURL,
                    deleteURL:  API_URI_PRE+"admin/area/admin_deleteAreaByPK.do",
                    getURL: "admin_area_detail.html?pk=",
                    editURL: "admin_area_edit.html?pk=",
                }, "#carList", {
                    pk: $(".clickRemove").attr('data-id')
                });

                //loding brandList
                //brandList();
                //loding bodyTypeList
                //bodyTypeList();
            }
        });

    });
}


function formatRepo (repo) {
    if (repo.loading) return repo.text;

    var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'>" + repo.name + "</div>";
    "</div></div>";
    return markup;
}

function formatRepoSelection (repo) {
    return repo.name || repo.text;
}