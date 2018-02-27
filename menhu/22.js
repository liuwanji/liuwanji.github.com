$(function () {
    /*切图代码*/
    $("#bigimage li:not(:nth-child(1))").hide();
    var index=0;
    setInterval(autoplay,2000);
    function autoplay() {
        $("#bigimage li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
        index++;
        index=index%3;
    }

    /*导航代码*/
    for(var i=2;i<=10;i++){
        $("#nav"+i).css({
            left:360+i*91+"px",
        });
    }
    $("#nav td").hover(function () {
        $(this).css({
            background:"#836FFF"
        });
        var index = $(this).index()+1;
        $("#nav"+index).show();
    },function () {
        $(this).css({
            background:"#000"
        });
        var index = $(this).index()+1;
        $("#nav"+index).hide();
    });

    /*主体代码*/
    var index=0;
    $("#neirong1_img li").eq(index).show().siblings().hide();
    var time1=setInterval(autoplay1,3000);
    function autoplay1() {
        $("#neirong1_img li").eq(index).show("slow").siblings().hide("slow");
        index++;
        index=index%3;
    }
    $("#kongzhi td").on("click",function () {
        index = $(this).index();
        clearInterval(time1);
        $("#neirong1_img li").eq(index).show().siblings().hide();
        time1=setInterval(autoplay1,3000);
    });

    $("#neirong4 td").hover(function () {
        $(this).find("img").animate({
            width:"140",
            height:"140"
        },"fast");
        $(this).find("p").animate({
            color:"red",
            "font-size":"25px"
        },"fast");
    },function () {
        $(this).find("img").animate({
            width:"122",
            height:"122"
        },"fast");
        $(this).find("p").animate({
            color:"black",
            "font-size":"20px"
        },"fast");
    });
});