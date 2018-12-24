/**
 * Created by helingyun on 2017/6/18.
 */
//API_URI_PRE = "http://kfer.cn/airbnbclone/";

$(document).ready(function() {
    $("#header").load("header.html");
    $("#nav").load("include.html", function() {
        $("#area").addClass("has-child-item open-item active-item");
        $("#admin_arealist").addClass("active-item");
    });

    //	video begin
    var objs,index,position,source,bbs;
      index=0;

    urlinfo=window.location.href; //获取当前页面的url
    position = GetArgsFromHref(urlinfo,'position');
    source = GetArgsFromHref(urlinfo,'source');
    bbs = GetArgsFromHref(urlinfo,'bbs');

    $("#bbs").attr("href",bbs);
    
    var player = videojs('my-video', {
        fluid: true,
        controls: true,
        html5:{
          "nativeTextTracks": false
        }
     });

     $.ajaxSettings.async = false;
      $.getJSON('data/'+source+'.json',function(data){ 
        objs = data
        //alert(JSON.stringify(data)) 
      }); 

      player.ready(function() {
        position = parseInt(position);
        // the call to src is asynchronous under the covers
        // player.src({ src: objs[position].src });
        player.src(objs[position].src)

        metadataTrack = player.addRemoteTextTrack({src: objs[position].caption,srclang: 'en',label: 'English',kind: 'captions',mode: 'showing',default: 'default',}, false);  

        // Add a listener for the "cuechange" event and start ad playback.
        metadataTrack.addEventListener('cuechange', function() {
           console.log('aaa')
        });

        index = parseInt(position) 
      });

      $("#prev").click(function(){
        console.log("prev index=="+index)
        if(index==0){
          return false
        }
        index-=1
        player.src(objs[index].src)
        player.addRemoteTextTrack({src: objs[index].caption,srclang: 'en',label: 'English',kind: 'captions',mode: 'showing',default: 'default',}, false);  
        player.ready(function(){
          player.play()
          //alert("player")
        })
       
      })

      $("#next").click(function(){
        console.log("next index=="+index)
        index+=1
        player.src(objs[index].src)
        player.addRemoteTextTrack({src: objs[index].caption,srclang: 'en',label: 'English',kind: 'captions',mode: 'showing',default: 'default',}, false);  
        player.ready(function(){
          player.play()
          //alert("player")
        })
       
      }) 
});

function GetArgsFromHref(sHref, sArgName) {
    var args    = sHref.split("?");
    var retval = "";

    if(args[0] == sHref) /*参数为空*/
    {
            return retval; /*无需做任何处理*/
    }  
    var str = args[1];
    args = str.split("&");
    for(var i = 0; i < args.length; i ++)
    {
        str = args[i];
        var arg = str.split("=");
        if(arg.length <= 1) continue;
        if(arg[0] == sArgName) retval = arg[1]; 
    }
    return retval;
}
