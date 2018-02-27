$(function () {
    // $("#book_ul").cycle({
    //     timeout:2000,
    //     speed:1000,
    //     pause:true
    // });
    // $("<button>pause</button>").on("click",function () {
    //     $("ul").cycle("pause");
    //     return false;
    // }).insertAfter("#book_ul");
    // $("<button>resume</button>").on("click",function () {
    //     $("ul:paused").cycle("resume");
    //     return false;
    // }).insertAfter("#book_ul");
    // $(".title").hover(function () {
    //     $(this).animate({
    //         backgroundColor: "#eee",
    //         color: "#000"
    //     });
    // },function () {
    //     $(this).animate({
    //         backgroundColor: "#000",
    //         color: "#fff"
    //     });
    // });
    //
    // $("tr").on("click",function () {
    //     if($(this).hasClass("class1"))
    //          $(this).removeClass("class1");
    //     else
    //         $(this).addClass("class1");
    // });
    // (function ($) {
    //     $.memath= {
    //         sum : function (array) {
    //         var totle = 0;
    //         $.each(array, function (index, value) {
    //             value = $.trim(value);
    //             totle += parseFloat(value) || 0;
    //         });
    //         return totle;
    //     },
    //     average : function (array) {
    //         var aver = 0;
    //         $.each(array, function (index, value) {
    //             value = $.trim(value);
    //             aver += parseFloat(value) || 0;
    //         });
    //         return aver / 3;
    //     },
    //    };
    //     //     $.fn.shadow=function (opts) {
    //     //     var options = $.extend({},$.fn.shadow.defaults,opts) ;
    //     //         return this.each(function () {
    //     //             var $mubiao = $(this);
    //     //             for(var i=0;i<options.copies;i++){
    //     //                 var offset = options.copyoffset(i);
    //     //                 $mubiao.clone().css({
    //     //                     position:"absolute",
    //     //                     left:$mubiao.offset.left+offset.x,
    //     //                     top:$mubiao.offset.top+offset.y,
    //     //                     margin:0,
    //     //                     zIndex:-1,
    //     //                     opacity:options.opacity
    //     //                 }).appendTo('#biaoge');
    //     //             }
    //     //         });
    //     //     };
    //     // $.fn.shadow.defaults ={
    //     //         copies:5,
    //     //         opacity:0.1,
    //     //         copyoffset:function (index) {
    //     //         return {x:index,y:index};
    //     //      }
    //     // };
    // })(jQuery);
    //
    // var $shuzu=$("table td:nth-child(2)").map(function (index,value) {
    //     return $(value).text();
    // });
    // var $aver = $("table td:nth-child(3)").map(function (index,value) {
    //     return $(value).text();
    // })
    // var totle=$.memath.sum($shuzu);
    // var avera = $.memath.average($aver);
    // $("tfoot tr:nth-child(1) td:nth-child(2)").text(totle);
    // $("tfoot tr:nth-child(2) td:nth-child(3)").text(avera.toFixed(2));
    //
    // $("#biaoge h2").hover(function () {
    //     $("#showdiv").show();
    // },function () {
    //     $("#showdiv").hide();
    // });
    // $("#showdiv").hover(function () {
    //     $("#showdiv").show();
    // },function () {
    //     $("#showdiv").hide();
    // });
    // $("#showdiv th").hover(function () {
    //     $(this).addClass("a_hover");
    // },function () {
    //     $(this).removeClass("a_hover");
    // });



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