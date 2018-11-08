/**
 * Created by helingyun on 2017/6/18.
 */
$(document).ready(function(){
    $("#nav").load("include.html");
    $.getScript("javascripts/template-script.min.js");
    $.getScript("javascripts/template-init.min.js");
    $("#Dashboard").addClass("active-item");
});