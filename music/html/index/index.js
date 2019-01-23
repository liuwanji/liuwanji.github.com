
var indexJosn = {};

$(function() {
	button_addlisten();
	refresh();
	
	$(document).ready(function(e) { 
        var counter = 0;
        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
                window.history.pushState('forward', null, '#');
                window.history.forward(1);
                var arr = indexJosn.backArr || [];
                var elArr = indexJosn.elArr || [];
                console.log(arr[0])
                if(arr[0]){
					chongzhi();
					$(elArr[0]).css({
						background: "#e9f3ff",
						borderLeft: "2px solid #347ffa",
						color:'#2F80ED'
					});
					$(elArr[0]).find(".statu1").hide();
					$(elArr[0]).find(".statu2").show();
					$("#include_moban").css({"opacity":0});
					$("#include_moban").load(arr[0]);
					$("#include_moban").stop().animate({"opacity":"0"},100).animate({"opacity":1},500);
					indexJosn.backUrl2 = arr[0];
					indexJosn.backEl = elArr[0];
                	arr.splice(0,1)
                	elArr.splice(0,1)
                }
            });
        }
		
        window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
        window.history.forward(1);
});
	
});

function refresh() {
	if(!window.sessionStorage.token){
		window.location.href = "../../html/login/login.html";
	}
	if(window.sessionStorage.name){
		$("#_name>div:nth-child(1)").html(window.sessionStorage.name);
	}
	if(window.sessionStorage.head&&window.sessionStorage.head!=''){
		$("#_user").prop("src",window.sessionStorage.head);
	}
//	$("#loading").load("../../public/html/loading_div.html", function() {
//		//		$(".loading_div").show();
//	});
	$("#PublicIndex").load("../publicIndex/publicIndex.html")
	permission();
	refresh_Img();
	var u_agent = navigator.userAgent; 
	if(u_agent.indexOf('Trident')>-1&&u_agent.indexOf('rv:11')>-1){ 
		alert("使用ie浏览器，可能导致 生态学院管理系统 部分页面功能异常， 推荐您使用 chorme 等 非IE内核 的浏览器!");
	}else if(u_agent.indexOf('MSIE')>-1&&u_agent.indexOf('Trident')>-1){ 
		alert("使用ie浏览器，可能导致 生态学院管理系统 部分页面功能异常， 推荐您使用 chorme 等 非IE内核 的浏览器!");
	}else if(u_agent.indexOf('MSIE')>-1){ 
		alert("使用ie浏览器，可能导致 生态学院管理系统 部分页面功能异常， 推荐您使用 chorme 等 非IE内核 的浏览器!");
	}else if(u_agent.indexOf('Opera')>-1){ 
		alert("使用ie浏览器，可能导致 生态学院管理系统 部分页面功能异常， 推荐您使用 chorme 等 非IE内核 的浏览器!");
	}
}

function button_addlisten() {
	/*日程表的点击事件*/
	$("#schedule>div>img").on("click", function() {
		chongzhi();
		$("#schedule").css({
			background: "#e9f3ff",
			borderBottom: "2px solid #347ffa"
		});
		$("#include_moban").css({"opacity":0});
		$("#include_moban").load("../schedule/schedule.html");
		$("#include_moban").stop().animate({"opacity":"0"},100).animate({"opacity":1},500);
	});
	/*end关闭网页页面事件*/
	$("#_end").on("click",function(){
		window.opener = null;
		window.open('','_self');
		window.close()
	});
	
}
/*重置不用状态*/
function chongzhi() {
	$("#schedule").css({
		background: "none",
		borderBottom: "none"
	});
	$("#_aside>div").css({
		background: "none",
		borderLeft: "none",
		color:'#000'
	});
	$("#_aside>div").find(".statu1").show();
	$("#_aside>div").find(".statu2").hide();
}
/*首页logo的点击事件*/
function logo(){
	window.location.href = window.location.href;
}
/*导航栏的点击事件*/
function _nav(element){
	var _id = $(element).attr("id");
	chongzhi();
	$(element).css({
		background: "#e9f3ff",
		borderLeft: "2px solid #347ffa",
		color:'#2F80ED'
	});
	$(element).find(".statu1").hide();
	$(element).find(".statu2").show();
	$("#include_moban").css({"opacity":0});
	$("#include_moban").load("../"+_id+"/"+_id+".html");
	$("#include_moban").stop().animate({"opacity":"0"},100).animate({"opacity":1},500);
	
	var arr = indexJosn.backArr || [];
	var elArr = indexJosn.elArr || [];
	if(indexJosn.backUrl2){
		arr.unshift(indexJosn.backUrl2)
		elArr.unshift(indexJosn.backEl)
	};
	indexJosn.backArr = arr;
	indexJosn.elArr = elArr;
	indexJosn.backUrl2 = "../"+_id+"/"+_id+".html";
	indexJosn.backEl = element;
}
/*打开二级页面导航栏方法*/
function _nav_select(element){
	if($(element).attr("id") == 'manager'){
		$("#campusAppli").trigger("click");
		if($("#campusAppli").css("height") == "0px"){
			$(element).find(".direction").css({transform:"rotate(0deg)"});
			$("#campusAppli").css({height:"50px"});
		}else{
			$(element).find(".direction").css({transform:"rotate(-90deg)"});
			$("#campusAppli").css({height:"0px"});
		}
	}else if($(element).attr("id") == 'jiaocai'){
		$("#textbookLib").trigger("click");
		if($("#textbookLib").css("height") == "0px"){
			$(element).find(".direction").css({transform:"rotate(0deg)"});
			$("#textbookLib,#skillLib,#spectrumLib").css({height:"50px"});
		}else{
			$(element).find(".direction").css({transform:"rotate(-90deg)"});
			$("#textbookLib,#skillLib,#spectrumLib").css({height:"0px"});
		}
	}else if($(element).attr("id") == 'up'){
		$("#upManage").trigger("click");
		if($("#upManage").css("height") == "0px"){
			$(element).find(".direction").css({transform:"rotate(0deg)"});
			$("#upManage,#whiteManage,#APKList,#APPList").css({height:"50px"});
		}else{
			$(element).find(".direction").css({transform:"rotate(-90deg)"});
			$("#upManage,#whiteManage,#APKList,#APPList").css({height:"0px"});
		}
	}
}
/*切换账户的点击事件*/
function changeUser(){
	window.location.href = "../../html/login/login.html";
}

/*初始化页面图标名称等信息方法*/
function refresh_Img(){
	var data ={'schid':0};
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "organization/selectinfo?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.data.head!='')
        	$('#musicIndexImg').attr("src",msg.data.head);
        $('#musicIndexName').html(msg.data.schname);
    });
}

/*权限分配方法*/
function permission(){
	if(parseInt(window.sessionStorage.type) == 1){
			$("#_name>div:nth-child(2)").html("超级管理员");
		}else if(parseInt(window.sessionStorage.type) == 2){
			$("#_name>div:nth-child(2)").html("校长");
		}else if(parseInt(window.sessionStorage.type) == 3){
			$("#_name>div:nth-child(2)").html("校区教务");
		}else if(parseInt(window.sessionStorage.type) == 5){
			$("#_name>div:nth-child(2)").html("系统管理员");
		}else if(parseInt(window.sessionStorage.type) == 6){
			$("#_name>div:nth-child(2)").html("系统教务");
		}else if(parseInt(window.sessionStorage.type) == 10){
			$("#_name>div:nth-child(2)").html("教师");
		}else if(parseInt(window.sessionStorage.type) == 20){
			$("#_name>div:nth-child(2)").html("学员");
		}else if(parseInt(window.sessionStorage.type) == 30){
			$("#_name>div:nth-child(2)").html("游客");
		}
	if(window.sessionStorage.type == 1){
		$("#manageAcc,#banner,#manager,#campusAppli,#up,#upManage,#whiteManage,#APKList,#APPList").show();
		$("#banner").trigger("click");
	}else if(window.sessionStorage.type == 5){
		$("#manageAcc,#banner,#up,#upManage,#whiteManage,#APKList,#APPList").show();
		$("#banner").trigger("click");
	}else if(window.sessionStorage.type == 6){
		$("#jiaocai,#textbookLib,#skillLib,#spectrumLib,#music,#manageAcc").show();
		$("#jiaocai").trigger("click");
	}else if(window.sessionStorage.type == 3){
		$("#shouye,#classes,#student,#teacher,#course,#jiaocai,#textbookLib,#skillLib,#spectrumLib,#music,#campus,#manageClass,#workManage,#manageAcc").show();
		$("#shouye").trigger("click");
	}else if(window.sessionStorage.type == 2){
		$("#shouye,#classes,#student,#teacher,#course,#jiaocai,#textbookLib,#skillLib,#spectrumLib,#music,#campus,#manageClass,#workManage,#manageAcc").show();
		$("#shouye").trigger("click");
	}
}