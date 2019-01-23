
/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;

var music = "<tr>"+
    "<td>%songid</td>" +
    "<td>%name</td>" +
    "<td>%genre</td>" +
    "<td>%difflv</td>" +
    "<td>%bpm</td>" +
    '<td><img class="fengmiantu" src="%imgpath" /></td>' +
    "<td>%drumSet</td>" +
    "<td>%style</td>" +
    "<td>%ltime</td>" +
    "<td>%author</td>" +
    "</tr>";
/*排序识别参数：排序哪个，排序类型*/
var paixuname = 0,paixutype = 0;
$(function() {
	addlisten();
	dataRefresh();
});
/*事件监听方法*/
function addlisten() {
	/*页码select的点击选择事件*/
	$("#curr_num").change(function() {
		chaxun(1);
	});
	/*导入歌曲和关闭的点击事件*/
	$("#drgq").on("click", function() {
		$("#addMusic").show();
		$("#musicShadow").animate({
			opacity: '0.3'
		}, 400);
		$("#musicMain").animate({
			top: '40%',
			opacity: '1'
		}, 400);
	});
	$("#close_music").on("click", function() {
		$("#addMusic1").show();
		$("#musicShadow1").animate({
			opacity: '0.3'
		}, 400);
		$("#musicMain1").animate({
			top: '30%',
			opacity: '1'
		}, 400);
	});
	$("#close_music1,#musicNo").on("click", function() {
		$("#musicShadow1").animate({
			opacity: '0'
		}, 400);
		$("#musicMain1").animate({
			top: '20%',
			opacity: '0'
		}, 400, function() {
			$("#addMusic1").hide();
		});
	});
	$("#musicOk").on("click", function() {
		$("#musicShadow1").animate({
			opacity: '0'
		}, 400);
		$("#musicMain1").animate({
			top: '20%',
			opacity: '0'
		}, 400, function() {
			$("#addMusic1").hide();
		});
		$("#musicShadow").animate({
			opacity: '0'
		}, 400);
		$("#musicMain").animate({
			top: '20%',
			opacity: '0'
		}, 400, function() {
			$("#addMusic").hide();
		});
	});
	/*监听筛选输入触发搜索*/
	$("#musci_select1,#musci_select2,#musci_select3,#musci_select4").on("change",function(){
		chaxun(1);
	});
	/*清空的方法*/
	$("#_clear").on("click", function() {
		$("#teacher_input1").val("");
		$("#musci_select1").val("0");
		$("#musci_select2").val("0");
		$("#musci_select3").val("0");
		$("#musci_select4").val("");
		chaxun(1);
	});
	
	/*输入确定的点击事件*/
	$("#table_ok").on("click", function() {
		var all = $("#all_num").html();
		var curr = $("#curr_num").val();
		var num_div = 0;
		if(all % curr > 0)
			num_div = parseInt(all / curr) + 1;
		else
			num_div = parseInt(all / curr);
		if($("#curr_input").val() == '') {
			return;
		} else if($("#curr_input").val() <= 0 || $("#curr_input").val() > num_div) {
			alert("请输入正确的页码!");
		}else{
			if(parseInt(page_num)>parseInt($("#curr_input").val())){
				page_num = parseInt($("#curr_input").val());
				last_next_max(page_num, 1);
				chaxun(2);
			}else if(parseInt(page_num)<parseInt($("#curr_input").val())){
				page_num = parseInt($("#curr_input").val());
				last_next_max(page_num, 2);
				chaxun(2);
			}
		}
	});
}

/*数据初始化渲染方法*/
function dataRefresh() {
	yema_suanfa(num_all, num_curr);
	chaxun(1);
}

/*筛选的点击时间*/
function saixuan(index, element) {
	$(element).addClass("_select2").siblings().removeClass("_select2");
}

function yema_suanfa(all, curr) {
	/*jquery控制的分页点击事件*/
	page_num = 1;
	var all = all;
	var curr = curr;
	var num_div = 0;
	if(all % curr > 0)
		num_div = parseInt(all / curr) + 1;
	else
		num_div = parseInt(all / curr);

	$("#fenye_num").html("");
	for(var i = 1; i <= num_div && i <= 5; i++) {
		$("#fenye_num").append("<div>" + i + "</div>")
	}
	$("#fenye_num>div:nth-child(1)").addClass("select_num");
	$("#fenye_num").on("click", "div", function() {
		page_num = $(this).html();
		$(this).addClass("select_num");
		$(this).siblings().removeClass("select_num");
		chaxun(2);
		return false;
	});

	$("#fenye_last").on("click", function() {
		if(page_num > 1) {
			page_num = parseInt(page_num) - 1;
			last_next_max(page_num, 1);
			chaxun(2);
		}
		return false;
	});
	$("#fenye_next").on("click", function() {
		if(page_num < num_div) {
			page_num = parseInt(page_num) + 1;
			last_next_max(page_num, 2);
			chaxun(2);
		}
		return false;
	});
	$("#fenye_last_max").on("click", function() {
		page_num = 1;
		last_next_max(page_num, 1);
		chaxun(2);
		return false;
	});
	$("#fenye_next_max").on("click", function() {
		page_num = num_div;
		last_next_max(page_num, 2);
		chaxun(2);
		return false;
	});
}
/*适应大量数据的上下翻页事件*/
function last_next_max(page_num, _type) {
	var _index = [];
	$.each($("#fenye_num>div"), function(index, element) {
		_index.push($(element).html());
	});
	if(_type == 1) {
		if(parseInt(page_num) >= parseInt(_index[0])) {
			var select_page = page_num - _index[0] + 1;
			$("#fenye_num>div:nth-child(" + select_page + ")").addClass("select_num").siblings().removeClass("select_num");
		} else {
			if(parseInt(page_num)<(parseInt(_index[0])-1)){
				var all = $("#all_num").html();
				var curr = $("#curr_num").val();
				var num_div = 0;
				if(all % curr > 0)
					num_div = parseInt(parseInt(all) / parseInt(curr)) + 1;
				else
					num_div = parseInt(parseInt(all) / parseInt(curr));
				$("#fenye_num").html("");
				for(var i = parseInt(page_num); i <= parseInt(num_div) && i <= parseInt(page_num)+4; i++) {
					$("#fenye_num").append("<div>" + i + "</div>")
				}
				$("#fenye_num>div:nth-child(1)").addClass("select_num");
			}else{
				$("#fenye_num").prepend("<div>" + page_num + "</div>");
				$("#fenye_num>div:last-child").remove();
				$("#fenye_num>div:nth-child(1)").addClass("select_num").siblings().removeClass("select_num");
			}
		}
	} else {
		if(parseInt(page_num) <= parseInt(_index[_index.length - 1])) {
			var select_page = page_num - _index[0] + 1;
			$("#fenye_num>div:nth-child(" + select_page + ")").addClass("select_num").siblings().removeClass("select_num");
		} else {
			if(parseInt(page_num)>(parseInt(_index[_index.length-1])+1)){
				$("#fenye_num").html("");
				for(var i = parseInt(page_num)-4; i <= parseInt(page_num) && i >0; i++) {
					$("#fenye_num").append("<div>" + i + "</div>")
				}
				$("#fenye_num>div:last-child").addClass("select_num");
			}else{
				$("#fenye_num").append("<div>" + page_num + "</div>");
				$("#fenye_num>div:nth-child(1)").remove();
				$("#fenye_num>div:last-child").addClass("select_num").siblings().removeClass("select_num");
			}
		}
	}
}
/*排序按钮的点击事件*/
function riqisheng(index, element) {
	//	$(".loading_div").show();
}

/*类型一搜索或切换每页显示时页码变换方法*/
function changePage(){
		num_all = $("#all_num").html();
		num_curr = $("#curr_num").val();
		$("#fenye_num").off("click", "div");
		$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
		yema_suanfa(num_all, num_curr);
}
function  chaxun(type){
	 var name =$('#teacher_input1').val();
	 var re_type =$('#musci_select1').val();
	 var genre =$('#musci_select2').val();
	 var style =$('#musci_select3').val();
	 var difflv =$('#musci_select4').val();
	 if(difflv == ''){
	 	difflv = 0;
	 }

    if(type == 1) {
        page = 1;
    } else if(type == 2) {
        page = page_num;
    } else {
        page = $("#curr_input").val();
    }

	 var data = {
	 	 "name":name,
	 	 "genre":parseInt(genre),
	 	 "style":style,
	 	 're_type':parseInt(re_type),
	 	 'difflv':parseInt(difflv),
	 	 'paixuname':paixuname,
		 'paixutype':paixutype,
	 	 "size":parseInt($("#curr_num").val()),
	 	 "page":parseInt(page),
		 "total":0,
	 }
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "song/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	var song ='';
	        $.each(msg.data.info,function (index,element) {
	        	var song_type = '';
	        	var author = element.author;
	        	if(element.genre == 1){
	        		song_type = "初级";
	        	}else if(element.genre == 2){
	        		song_type = "中级";
	        	}else if(element.genre == 3){
	        		song_type = "高级";
	        	}
	        	if(element.author == ''){
	        		author = "系统";
	        	}
	            song += music.replace('%songid',element.songid).replace('%name',element.name).replace('%genre',song_type)
	            .replace('%difflv',element.difflv).replace('%bpm',parseInt(element.bpm)).replace('%imgpath',element.imgpath.replace(/ /g,"%20")).replace('%drumSet',element.drumSet)
	            .replace('%style',element.style).replace('%ltime',element.ltime).replace('%author',author);
	        });
	        $("#musicbody").html(song);
	        if(type == 1){
	        	$("#all_num,#musicSum").html(msg.data.total);
		        changePage();
	        }
        }else{
        	alert(msg.msg);
        }
    });
}

/*排序的点击事件方法*/
function paixu(type1,type2){
	paixuname = type1;
	paixutype = type2;
	chaxun(1);
}