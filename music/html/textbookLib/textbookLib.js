/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;
var num_all1 = $("#all_num1").html();
var num_curr1 = $("#curr_num1").val();
var page_num1 = 1;
/*教材库的筛选类型*/
var category = 1;
/*教材的样式字符串*/
var jiaocaiStr = "<tr>" +
	"<td>%course_id</td>" +
	"<td>%tbook_type</td>" +
	"<td>%belong</td>" +
	"<td class='ifedit'>%ifedit</td>" +
	"<td><img class='fengmiantu' src='%cover' /></td>" +
	"<td>%textbook</td>" +
	"<td>%author</td>" +
	"<td>%course_num</td>" +
	"<td>%class</td>" +
	"<td>%ctime</td>" +
	"<td><div class='tobianji'>%bianjiorchakan</td>" +
	"</tr>";
/*编辑页码的字符串样式*/
var yema = "<div class='yema'>" +
	"<div>第<span class='num'>%num</span>页</div>" +
	"<img class='closeyema' src='../../public/img/close.png'/>" +
	"</div>";
/*选择歌曲的字符串样式*/
var musicStr = "<tr>" +
	"<td>" +
	"<div class='xzlsSelect'><img src='../../public/img/login_tip.png' /></div>" +
	"</td>" +
	"<td>%songid</td>" +
	"<td>" +
	'<img class="xzgqImg" src="%imgpath" />' +
	"</td>" +
	"<td>%name</td>" +
	"<td>%genre</td>" +
	"<td>%ltime</td>" +
	"<td>%bpm</td>" +
	"<td>%style</td>" +
	"<td>%difflv</td>" +
	"</tr>";
/*选择谱例的字符串样式*/
var puliStr = "<tr>" +
	"<td>" +
	"<div class='xzxySelect'><img src='../../public/img/login_tip.png' /></div>" +
	"</td>" +
	"<td style='display:none;' class='plid'>%plid</td>" +
	"<td style='display:none;' class='plurl'>%img</td>" +
	"<td style='display:none;' class='plname'>%name</td>" +
	"<td>" +
	'<img class="puliimg" src="%url"/>' +
	"</td>" +
	"<td>%plname</td>" +
	"<td>%cate1</td>" +
	"<td>%cate2</td>" +
	"</tr>";
/*课时谱例教案的样式字符串*/
var puliImgStr = "<div class='jiaoan' style='background: url(%img) no-repeat left/auto 100%;'>" +
	"<div class='removeJiaocai'>-</div>" +
	"<div class='plid' style='display: none;'>%plid</div>" +
	"<div class='plurl' style='display: none;'>%plurl</div>" +
	"<div class='plname' style='display: none;'>%plname</div>" +
	"</div>";

/*添加教材中表格样式字符串*/
var addjiaocai = "<tr class='addjiaocaiTr'>" +
	"<td>%index</td>" +
	"<td style='display:none;' class='course_id'>%course_id</td>" +
	"<td>%course_name</td>" +
//	"<td>" +
//	"<div>%music_name</div>" +
//	"<div class='tdQumu'>" +
//	"<img src='../../public/img/shijian.png' /><span>%ltime</span>" +
//	"<img src='../../public/img/BPMicon.png' /><span>%bpm</span>" +
//	"<img src='../../public/img/nandu.png' /><span>难度%difflv</span>" +
//	"</div>" +
//	"</td>" +
	"<td><img src='../../public/img/%jiaoan.png' /></td>" +
	"<td><img src='../../public/img/%is_imp.png' /></td>" +
	"<td>" +
	"<div style='overflow: hidden;'>" +
	"<div class='bianji'>编辑</div>" +
	"<div class='shanchu' style='display:%textbookremove'>删除</div>" +
	"<div class='charu' style='display:%textbookremove1'>插入</div>" +
	"</div>" +
	"</td>" +
	"</tr>";
var addjiaocai1 = "<tr class='addjiaocaiTr'>" +
	"<td>%index</td>" +
	"<td style='display:none;' class='course_id'>%course_id</td>" +
	"<td>%course_name</td>" +
//	"<td>" +
//	"<div>%music_name</div>" +
//	"<div class='tdQumu'>" +
//	"<img src='../../public/img/shijian.png' /><span>%ltime</span>" +
//	"<img src='../../public/img/BPMicon.png' /><span>%bpm</span>" +
//	"<img src='../../public/img/nandu.png' /><span>难度%difflv</span>" +
//	"</div>" +
//	"</td>" +
	"<td><img src='../../public/img/%jiaoan.png' /></td>" +
	"<td><img src='../../public/img/%is_imp.png' /></td>" +
	"<td>" +
	"<div style='overflow: hidden;'>" +
	"<div class='chakan'>查看</div>" +
	"</div>" +
	"</td>" +
	"</tr>";
/*添加课程中编辑页面谱例选择和课时谱例的区别字段*/
var puliType = 0;
var puliElement = '';
/*教材区别编辑和新增*/
var addOredit = 0;
/*教材课程区别编辑和新增*/
var courseAddOrEd = 0;
/*教材或草稿区别*/
var jcOrcg = 1;
/*保存选择歌曲的位置*/
var music_jq = '';
var music_jq_type = 0;
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
	/*教材库和草稿箱的点击时间*/
	$("#sck").on("click", function() {
		$(this).addClass("_select1").siblings().removeClass("_select1");
		$(".shucaiku,#jieguo,.jiaocaiTable").show();
		$(".caogaoTable").hide();
		$(".jiaocaiTable").css({"top":"160px"});
		jcOrcg = 1;
		chaxun(1);
	});
	$("#cgx").on("click", function() {
		$(this).addClass("_select1").siblings().removeClass("_select1");
		$(".shucaiku,#jieguo").hide();
		$(".jiaocaiTable").css({"top":"62px"});
		jcOrcg = 2;
		chaxun(1);
	});
	/*新增教材和关闭按钮的点击事件*/
	$("#drgq").on("click", function() {
		$("#tianjia").show();
		$("#jrcgx").show();
		$("#copyCourse").hide();
		$("#textbookremove").html("2");
		$("#textbook1").val("");
		$("#kcs").val(0);
		$("#jclx").val(1);
		$("#studentImg").prop("src", "../../public/img/logoMoren1.jpg");
		$("#addjiaocaiBody").html("");
		$("#scjc").html("生成教材");
		$("#tjjcTipName").html("添加教材");
		addOredit = 1;
		$("#addJiaocai").show();
		$("#jiaocaiShadow").animate({
			opacity: '0.3'
		}, 400);
		$("#jiaocaiMain").animate({
			top: '15%',
			opacity: '1'
		}, 400);
	});
	/*生成教材，提交，转为正式按钮的点击事件和确认转入正式库弹窗的关闭事件*/
	$("#scjc").on("click",function(){
		if(parseInt($("#textbookremove").html()) == 1){
			creatTb(1);
		}else if(parseInt($("#textbookremove").html()) == 2){
			$("#qrtj").show();
			$("#qrtjShadow").animate({opacity: '0.3'}, 400);
			$("#qrtjMain").animate({top: '30%',opacity: '1'}, 400);
		}
	});
	$("#close_qrtj,#qx_no").on("click",function(){
		$("#qrtjShadow").animate({opacity: '0'}, 400);
		$("#qrtjMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#qrtj").hide();
		});
	});
	
	/*教材库中编辑按钮的点击事件*/
	$("#jiaocaiBody").on("click", ".tobianji", function() {
		var textbooktype = $(this).parent().parent().find(".ifedit").html();
		if(textbooktype == 1){
			$("#textbookremove").html("");
			$("#textbook1").val("");
			$("#kcs").val(0);
			$("#jclx").val(1);
			$("#studentImg").prop("src", "../../public/img/logoMoren1.jpg");
			$("#addjiaocaiBody").html("");
			if($("#sck").hasClass("_select1")){
				$("#scjc").html("提交");
				$("#jrcgx").html("放入草稿箱");
			}else{
				$("#scjc").html("转为正式");
				$("#jrcgx").html("放回草稿箱");
			}
			$("#tjjcTipName").html("编辑教材");
			addOredit = 2;
			var tbid = $(this).parent().parent().find("td:nth-child(1)").html();
			detJiaocai(tbid,1);
		}else if(textbooktype == 2){
			changeTextbook();
			var tbid = $(this).parent().parent().find("td:nth-child(1)").html();
			detJiaocai(tbid,2);
		}
		return false;
	});
	$("#close_jiaocai,#fangqi,#guanbi").on("click", function() {
		$("#jiaocaiShadow").animate({
			opacity: '0'
		}, 400);
		$("#jiaocaiMain").animate({
			top: '0%',
			opacity: '0'
		}, 400, function() {
			$("#addJiaocai").hide();
			backTextbook();
		});
	});
	/*查看的点击事件*/
	$("#addjiaocaiBody").on("click", ".chakan", function() {
		$("#courseTopTitle").html("查看课程");
		$("#kcbh").val(parseInt($(this).parent().parent().parent().find("td:nth-child(1)").html()));
		var course_id = $(this).parent().parent().parent().find(".course_id").html();
		zhikong();
		changeCourse();
		detCourse(course_id,2);
		return false;
	});
	/*添加教材中添加按钮的点击事件*/
	$("#tianjia").on("click", function() {
		courseAddOrEd = 1;
		$("#courseTopTitle").html("添加课程");
		var _length = $(".addjiaocaiTr").length;
		$("#kcbh").val(parseInt(_length) + 1);
		zhikong();
		$("#tjkc").show();
		$("#tjkcShadow").animate({
			opacity: '0.3'
		}, 400);
		$("#tjkcMain").animate({
			top: '3%',
			opacity: '1'
		}, 400);
	});
	$("#close_tjkc,#guanbicourse").on("click", function() {
		$("#tjkcShadow").animate({
			opacity: '0'
		}, 400);
		$("#tjkcMain").animate({
			top: '0%',
			opacity: '0'
		}, 400, function() {
			$("#tjkc").hide();
			backCourse();
		});
	});
	/*教材列表中详细教材信息的点击事件*/
	$("#jiaocaiBody").on("click", "tr", function() {
//		$("#ckxq").show();
//		$("#ckxqShadow").animate({
//			opacity: '0.3'
//		}, 400);
//		$("#ckxqMain").animate({
//			top: '15%',
//			opacity: '1'
//		}, 400);
	});
	$("#close_ckxq").on("click", function() {
		$("#ckxqShadow").animate({
			opacity: '0'
		}, 400);
		$("#ckxqMain").animate({
			top: '0%',
			opacity: '0'
		}, 400, function() {
			$("#ckxq").hide();
		});
	});
	/*添加歌曲的点击事件*/
	$("#tjgq").on("click", function() {
		music_jq = $("#jiaocaiMusic");
		music_jq_type = 1;
		selectmusic(1);
	});
	$(".tjkcInput2").on("click", ".qiehuan", function() {
		music_jq = $("#jiaocaiMusic");
		music_jq_type = 1;
		selectmusic(1);
	});
	$("#close_tjjc,#xzgqNo").on("click", function() {
		$("#xzgqShadow").animate({
			opacity: '0'
		}, 400);
		$("#xzgqMain").animate({
			top: '0%',
			opacity: '0'
		}, 400, function() {
			$("#xzgq").hide();
		});
	});
	/*添加课时谱例的点击事件*/
	$(".addjiaoan").on("click", function() {
		puliType = 1;
		$("#xzxyTc").off("click");
		$("#xzxyTc").on("click", ".xzxySelect", function() {
			var _index = 0;
			var _this = $(this).find("img");
			if(_this.css("display") != 'none') {
				_this.hide();
			} else {
				_this.show();
			}
			$.each($(".xzxySelect"), function(index, element) {
				if($(element).find("img").css("display") != "none") {
					_index++;
				}
			});
			$("#yxzStudent").html(_index);
		});
		puliSearch(1);
	});
	$("#close_xzxy").on("click", function() {
		$("#xzxyShadow").animate({
			opacity: '0'
		}, 400);
		$("#xzxyMain").animate({
			top: '0%',
			opacity: '0'
		}, 400, function() {
			$("#xzxyTc").hide();
		});
	});

	/*教材重点的输入监听事件*/
	$("#kczd").on("input", function() {
		var _length = $(this).val().length;
		$("#kczdNum>span:nth-child(1)").html(_length);
		if(_length > 30) {
			$("#kczdNum>span:nth-child(1)").addClass("colorRed");
		} else {
			$("#kczdNum>span:nth-child(1)").removeClass("colorRed");
		}
	});
	/*课程名称的输入监听事件*/
	$("#kcmc").on("input", function() {
		var _length = $(this).val().length;
		$("#kcmcNum>span:nth-child(1)").html(_length);
		if(_length > 10) {
			$("#kcmcNum>span:nth-child(1)").addClass("colorRed");
		} else {
			$("#kcmcNum>span:nth-child(1)").removeClass("colorRed");
		}
	});
	/*编辑页面的选中事件*/
	$(".bjym").on("click", ".yema", function() {
		$(this).addClass("yemaSelect").siblings().removeClass("yemaSelect");
		$(".yemaCtr:nth-child(" + ($(this).index() + 1) + ")").show().siblings().hide();
	});
	/*页面中close的点击事件*/
	$(".bjym").on("click", ".closeyema", function() {
		if($(this).parent().index() != "0") {
			$(".yemaCtr:nth-child(" + ($(this).parent().index() + 1) + ")").remove();
			$(this).parent().remove();
			$.each($(".yema"), function(index, element) {
				$(element).find(".num").html(index + 1);
			});
			$(".yema:nth-last-child(1)").trigger("click");
			var offsetLeft = document.getElementById("yemabox").scrollWidth;
			$("#yemabox").animate({scrollLeft:offsetLeft},200);
		}
		return false;
	});
	/*附件类型选择的点击事件*/
	$("#yemaCtrBox").on("change", ".fujianType", function() {
		var element = $(this).parents(".yemaCtr");
		if(parseInt($(this).val()) == 1) {
			element.find(".puli,.music_select,.game_type,.game_select,.fujian3,.music_img,.game_music,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box").hide();
			element.find(".fujian2Img,.imgvideo").show();
		} else if(parseInt($(this).val()) == 2) {
			element.find(".puli,.music_select,.game_type,.game_select,.music_img,.game_music,.game_gongju,.fujian2Img,.huike_box,.zhuoye_box").hide();
			element.find(".imgvideo,.fujian3,.fujian2Video").show();
		} else if(parseInt($(this).val()) == 3) {
			element.find(".imgvideo,.fujian3,.music_select,.game_type,.game_select,.music_img,.game_music,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box").hide();
			element.find(".fujian2Img,.puli").show();
		}else if(parseInt($(this).val()) == 4){
			element.find(".imgvideo,.puli,.game_type,.game_select,.fujian3,.game_music,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box").hide();
			element.find(".music_select,.music_img,.fujian2Img").show();
		}else if(parseInt($(this).val()) == 5){
			getGame(1,0,0,function(s){
				element.find(".game_select_select").html(s);
				element.find(".game_select_select").trigger("change");
			});
			element.find(".imgvideo,.puli,.music_select,.game_type,.fujian3,.music_img,.game_music,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box").hide();
			element.find(".game_select,.fujian2Img").show();
		}else if(parseInt($(this).val()) == 6){
			element.find(".game_type_select").val("1");
			element.find(".game_type_select").trigger("change");
			element.find(".imgvideo,.puli,.music_select,.game_select,.fujian3,.music_img,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box").hide();
			element.find(".game_type,.game_music,.fujian2Img").show();
		}else if(parseInt($(this).val()) == 7){
			element.find(".imgvideo,.puli,.music_select,.game_type,.game_select,.fujian3,.music_img,.game_music,.game_gongju,.fujian2Video,.zhuoye_box,.fujian2Img").hide();
			element.find(".huike_box").show();
		}else if(parseInt($(this).val()) == 8){
			getTask($(this).parents(".yemaCtr").index(),function(flag){
				if(flag == 1){
					element.find(".imgvideo,.puli,.music_select,.game_type,.game_select,.fujian3,.music_img,.game_music,.game_gongju,.fujian2Video,.huike_box,.fujian2Img").hide();
					element.find(".zhuoye_box").show();
				}else{
					element.find(".fujianType").val("1");
					element.find(".puli,.music_select,.game_type,.game_select,.fujian3,.music_img,.game_music,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box").hide();
					element.find(".fujian2Img,.imgvideo").show();
				}
			});
		}
		return false;
	});
	/*游戏类型select的切换选择事件*/
	$("#yemaCtrBox").on("change",".game_type_select",function(){
		var element = $(this).parents(".yemaCtr");
		if($(this).val() == 1){
			element.find(".game_music").show();
			element.find(".game_gongju").hide();
			getGame(2,1,1,function(s){
				element.find(".game_music_select").html(s);
				element.find(".game_music_select").trigger("change");
			});
		}else if($(this).val() == 2){
			element.find(".game_music").hide();
			element.find(".game_gongju").show();
			getGame(2,2,1,function(s){
				element.find(".game_gongju_select2").html(s);
				element.find(".game_gongju_select2").trigger("change");
			});
		}
		return false;
	});
	/*游戏选择改变时触发图片预览显示*/
	$("#yemaCtrBox").on("change",".game_select_select,.game_music_select,.game_gongju_select2",function(){
		var url = "../../public/img/game"+$(this).val()+".png";
		var element = $(this).parents(".yemaCtr");
		element.find(".fujian2Img").prop("src",url);
	});
	/*PG助手中启用关闭的点击事件*/
	$("#yemaCtrBox").on("click",".qiyong",function(){
		var element = $(this).parents(".yemaCtr");
		element.find(".guanbi").show();
		element.find(".qiyong,.pg_style").hide();
		element.find(".music_url").val("").prop("disabled","disabled");
	});
	$("#yemaCtrBox").on("click",".guanbi",function(){
		var element = $(this).parents(".yemaCtr");
		element.find(".guanbi").hide();
		element.find(".qiyong,.pg_style").show();
		element.find(".music_url").removeAttr("disabled");
	});
	/*歌曲中预览的点击事件*/
	$("#yemaCtrBox").on("click",".music_img_yulan",function(){
		var element = $(this).parents(".yemaCtr");
		element.find(".fujian2Img").prop("src", element.find(".music_img_input").val());
	});
	/*休闲游戏中预览的点击事件*/
	$("#yemaCtrBox").on("click",".game_select_yulan",function(){
		var element = $(this).parents(".yemaCtr");
		element.find(".fujian2Img").prop("src", "../../public/img/game"+element.find(".game_select_select").val()+".png");
	});
	/*教学游戏中预览的点击事件*/
	$("#yemaCtrBox").on("click",".game_music_yulan",function(){
		var element = $(this).parents(".yemaCtr");
		element.find(".fujian2Img").prop("src", "../../public/img/game"+element.find(".game_music_select").val()+".png");
	});
	/*教学游戏中预览的点击事件*/
	$("#yemaCtrBox").on("click",".game_gongju_yulan",function(){
		var element = $(this).parents(".yemaCtr");
		element.find(".fujian2Img").prop("src", "../../public/img/game"+element.find(".game_gongju_select2").val()+".png");
	});
	
	/*歌曲中选择歌曲和替换歌曲的点击事件*/
	$("#yemaCtrBox").on("click",".music_select_add",function() {
		music_jq = $(this).parents(".music_select");
		music_jq_type = 2;
		selectmusic(1);
	});
	$("#yemaCtrBox").on("click",".music_select_qiehuan",function() {
		music_jq = $(this).parents(".music_select");
		music_jq_type = 2;
		selectmusic(1);
	});
	/*游戏类型为歌曲时歌曲选择中的选择歌曲和替换歌曲的点击事件*/
	$("#yemaCtrBox").on("click",".game_music_add",function() {
		music_jq = $(this).parents(".game_music");
		music_jq_type = 3;
		selectmusic(1);
	});
	$("#yemaCtrBox").on("click",".game_music_qiehuan",function() {
		music_jq = $(this).parents(".game_music");
		music_jq_type = 3;
		selectmusic(1);
	});
	/*作业类型中练习次数的加减点击事件 选中 以及 开启关闭游戏模式的点击事件*/
	$("#yemaCtrBox").on("click",".public_duoxuan",function() {
		if($(this).find("img").css("display") == 'none'){
			$(this).parents(".zhuoye_list").addClass("zhuoye_list_selected")
			$(this).find("img").show();
		}else{
			$(this).parents(".zhuoye_list").removeClass("zhuoye_list_selected")
			$(this).find("img").hide();
		}
	});
	$("#yemaCtrBox").on("click",".task_jian",function() {
		var element = $(this).parent().find(".task_num");
		if(parseInt(element.html()) > 1){
			element.html(parseInt(element.html())-1);
		}
	});
	$("#yemaCtrBox").on("click",".task_jia",function() {
		var element = $(this).parent().find(".task_num");
		element.html(parseInt(element.html())+1);
	});
	$("#yemaCtrBox").on("click",".danxuan",function() {
		var _element = $(this);
		if(_element.parents(".zhuoye_list").find(".task_type").html() == 3){
				alert("该小工具仅支持小游戏模式进行作业配置");
				return false;
		}
		if(_element.find("div:nth-child(1)").hasClass("danxuanSelect")){
			_element.find("div:nth-child(1)").removeClass("danxuanSelect");
			_element.parent().find(".work_game_select").prop("disabled","disabled");
		}else{
			_element.find("div:nth-child(1)").addClass("danxuanSelect");
			_element.parent().find(".work_game_select").removeAttr("disabled");
		}
	});
	
		
	/*附件地址的清除事件*/
	$("#yemaCtrBox").on("click", ".addclose", function() {
		$(this).parent().find(".fujiandizi").val("");
	});
	$("#yemaCtrBox").on("click", ".addclose1", function() {
		$(this).parent().find(".fengmianurl").val("");
	});
	/*预览的点击事件*/
	$("#yemaCtrBox").on("click", ".yulan", function() {
		var element = $(this).parents(".yemaCtr");
		var _src = element.find(".fujiandizi").val();
		if(parseInt(element.find(".fujianType").val()) == 1) {
			element.find(".fujian2Img").prop("src", _src);
		} else if(parseInt(element.find(".fujianType").val()) == 2) {
			element.find(".fujian2Video").prop("src", _src);
		} else if(parseInt(element.find(".fujianType").val()) == 3) {
			
		}
	});
	/*编辑页面中谱例选择的点击事件*/
	$("#yemaCtrBox").on("click", ".qiehuanpuli", function() {
		puliType = 2;
		puliElement = $(this).parents(".yemaCtr");
		$("#xzxyTc").off("click");
		$("#xzxyTc").on("click", ".xzxySelect", function() {
			var _index = 0;
			$(".xzxySelect").find("img").hide();
			var _this = $(this).find("img");
			if(_this.css("display") != 'none') {
				_this.hide();
				_index = 0;
			} else {
				_this.show();
				_index = 1;
			}
			$("#yxzStudent").html(_index);
		});
		puliSearch(1);
	});
	/*增加编辑页的点击事件*/
	$("#addyema").on("click", function() {
		var s = '';
		var _length = $(".yema").length;
		s += yema.replace("%num", parseInt(_length) + 1);
		$("#yemabox").append(s);
		var s1 = bianjiyemian.replace("%order_page",$(".yemaCtr:last").find(".order_page").val());
		$("#yemaCtrBox").append(s1);
		$(".yema:nth-last-child(1)").trigger("click");
		var offsetLeft = document.getElementById("yemabox").scrollWidth;
		$("#yemabox").animate({scrollLeft:offsetLeft},200);
	});

	/*选择谱例中分类1的点击事件*/
	$(".fenlei1,.fenlei2").on("click", function() {
		$(this).addClass("fenleiSelected").siblings().removeClass("fenleiSelected");
		puliSearch(2);
	});
	/*选择谱例中选择事件*/
	$("#xzxyTc").on("click", ".xzxySelect", function() {
		var _index = 0;
		var _this = $(this).find("img");
		if(_this.css("display") != 'none') {
			_this.hide();
		} else {
			_this.show();
		}
		$.each($(".xzxySelect"), function(index, element) {
			if($(element).find("img").css("display") != "none") {
				_index++;
			}
		});
		$("#yxzStudent").html(_index);
	});

	/*选择歌曲中选择事件*/
	$("#musicBody").on("click", ".xzlsSelect", function() {
		$(".xzlsSelect").find("img").hide();
		$(this).find("img").show();
		return false;
	});

	/*教案删除的点击事件*/
	$("#jiaoanBox").on("click", ".removeJiaocai", function() {
		var _this = $(this).parent();
		_this.hide("200", function() {
			_this.remove();
		});
	});
	/*添加教材中删除课程的点击事件*/
	$("#addjiaocaiBody").on("click", ".shanchu", function() {
		$(this).parent().parent().parent().remove();
		$.each($(".addjiaocaiTr"), function(index, element) {
			$(element).find("td:nth-child(1)").html(index + 1);
		});
		$("#kcs").val($(".addjiaocaiTr").length);
	});
	/*添加教材中插入课程的点击事件*/
	$("#addjiaocaiBody").on("click", ".charu", function() {
		courseAddOrEd = 1;
		$("#courseTopTitle").html("添加课程");
		$("#kcbh").val(parseInt($(this).parent().parent().parent().find("td:nth-child(1)").html()) + 1);
		zhikong();
		$("#tjkc").show();
		$("#tjkcShadow").animate({
			opacity: '0.3'
		}, 400);
		$("#tjkcMain").animate({
			top: '3%',
			opacity: '1'
		}, 400);
	});
	/*添加教材中编辑课程的点击事件*/
	$("#addjiaocaiBody").on("click", ".bianji", function() {
		courseAddOrEd = 2;
		$("#courseTopTitle").html("编辑课程");
		$("#kcbh").val(parseInt($(this).parent().parent().parent().find("td:nth-child(1)").html()));
		var course_id = $(this).parent().parent().parent().find(".course_id").html();
		zhikong();
		detCourse(course_id,1);
	});
	/*监听筛选输入触发搜索*/
	$("#teacher_select1").on("change",function(){
		chaxun(1);
	});
	/*选择歌曲中筛选触发事件*/
	$("#qkxz,#gqlx,#gqnd,#gqfg").on("change",function(){
		selectmusic(2);
	});
	/*课时谱例中谱例的点击事件*/
//	$("#jiaoanBox").on("click",".jiaoan",function(){
//		var puliJq = '';
//		$.each($(".yemaCtr"), function(index,element) {
//			if($(element).css("display") == "block"){
//				puliJq = $(element);
//			}
//		});
//		if(puliJq.find(".fujianType").val() == 3){
//			puliJq.find(".puliselectname").html($(this).find(".plname").html());
//			puliJq.find(".plist").html($(this).find(".plid").html());
//			puliJq.find(".fujian2Img").prop("src",$(this).find(".plurl").html());
//		}
//	});
	
	/*清空的方法*/
	$("#_clear").on("click", function() {
		$("#teacher_select1").val("0");
		$("#teacher_input1").val("");
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
	
	/*我要参与中选择照片的点击事件*/
	$('#imgInput').change(function() {
		readURL(this,$("#studentImg"));
	});
}

/*数据初始化渲染方法*/
function dataRefresh() {
	yema_suanfa(num_all, num_curr);
	chaxun(1);
}

/*筛选的点击时间*/
function saixuan(index, element) {
	category = index;
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

function photoCompress(img_id_jq, file, w, objDiv) {
	var ready = new FileReader();
	/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	ready.readAsDataURL(file);
	ready.onload = function(e) {
		var re = this.result;
		img_id_jq.attr('src', e.target.result);
		canvasDataURL(re, w, objDiv)
	}
}

function canvasDataURL(path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 0.5; // 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// 图像质量
		if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调函数返回base64的值
		callback(base64);
	}
}
/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *            用url方式表示的base64图片数据  
 */
function convertBase64UrlToBlob(urlData) {

	var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte  

	//处理异常,将ascii码小于0的转换为大于0  
	var ab = new ArrayBuffer(bytes.length);
	var ia = new Uint8Array(ab);
	for(var i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}

	return new Blob([ab], {
		type: '',
		name: ''
	});
}
/*将我要参与页面中用户选中的图像显示出来*/
function readURL(input, element) {
	if(input.files && input.files[0]) {
		var files = Array.prototype.slice.call(input.files);
		if(files[0].size > 1024000 * 8) {
			// 文件大小自定义限制
			alert("图片大小过大!");
			return;
		}
		if(files[0].size < 1024000) {
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(e) {
				element.attr('src', e.target.result);
			};
		} else {
			photoCompress(element, input.files[0], 0.05, function(base64) {
//				var img = convertBase64UrlToBlob(base64)
//				img.name = input.files[0]['name'];
//				img.type = input.files[0]['type'];
				if(img.size > 1024000 * 2) {
					alert("图片大小过大!");
				}else{
					element.attr('src', base64);
				}
			})
		}
	}
}

/* 格式化时间方法，结果类型 yy-mm-dd*/
function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if(month.length < 2) month = '0' + month;
	if(day.length < 2) day = '0' + day;
	return [year, month, day].join('-');
}
/*格式话时间方法 结果类型 hh:mm*/
function hhmmdate(date) {
	var _time = '';
	if(date.getHours() < 10) {
		_time += "0" + date.getHours() + ":";
	} else {
		_time += date.getHours();
	}
	if(date.getMinutes() < 10) {
		_time += "0" + date.getMinutes();
	} else {
		_time += date.getMinutes();
	}
}
/*格式 年月日时分秒*/
function add0(m) {
	return m < 10 ? '0' + m : m
}

function nyrDate(needTime) {
	//needTime是整数，否则要parseInt转换
	var time = new Date(needTime);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

/*类型一搜索或切换每页显示时页码变换方法*/
function changePage() {
	num_all = $("#all_num").html();
	num_curr = $("#curr_num").val();
	$("#fenye_num").off("click", "div");
	$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
	yema_suanfa(num_all, num_curr);
}
/*教材中查询按钮的点事件*/
function chaxun(type) {
	var page = '';
	if(type == 1) {
		page = 1;
	} else if(type == 2) {
		page = page_num;
	} else {
		page = $("#curr_input").val();
	}
	var textbook = $("#teacher_input1").val();
	var tbook_type = $("#teacher_select1").val();
	
	if(jcOrcg == 1){
		var data = {
			textbook: textbook,
			tbook_type: parseInt(tbook_type),
			category: category,
			type1:jcOrcg,
			page: parseInt(page),
			size: parseInt($("#curr_num").val()),
			count: 0
		};
	}else if(jcOrcg == 2){
		var data = {
			textbook: '',
			tbook_type: 0,
			category: category,
			type1:jcOrcg,
			page: parseInt(page),
			size: parseInt($("#curr_num").val()),
			count: 0
		};
	}
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "teaching/select?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			$.each(msg.data.info, function(index, element) {
				var tbook_type = '';
				var belong = '';
				var banji = "<div style='max-height:100px;overflow:auto;display:block;'>";
				if(element.tbook_type == 0) {
					tbook_type = "<div>全部</div>";
				}else if(element.tbook_type == 1) {
					tbook_type = "<div>初级</div>";
				} else if(element.tbook_type == 2) {
					tbook_type = "<div>中级</div>";
				} else if(element.tbook_type == 3) {
					tbook_type = "<div>高级</div>";
				}

				if(element.belong == 0) {
					belong = "<div>全部</div>";
				} else if(element.belong == 1) {
					belong = "<div>学校教材</div>";
				} else if(element.belong == 2) {
					belong = "<div>系统教材</div>";
				}
				
				$.each(element.class, function(index, element1) {
					banji += "<div><div class='classname'>" + element1.name + "</div><div class='classid' style='display:none;'>" + element1.id + "</div></div>";
				});
				banji += "</div>";
				
				var ifedit = '编辑';
				if(element.textbooktype == 2){
					ifedit = '查看';
				}
				s += jiaocaiStr.replace("%course_id", element.tbid).replace("%tbook_type", tbook_type).replace("%belong", belong).replace("%ifedit",element.textbooktype)
					.replace("%bianjiorchakan", ifedit).replace("%cover", element.cover).replace("%textbook", element.textbook).replace("%author", element.author)
					.replace("%course_num", element.course_num).replace("%class", banji).replace("%ctime", nyrDate(element.ctime*1000));
			});
			$("#jiaocaiBody").html(s);
			if(type == 1) {
				$("#all_num,#jieguoNum").html(msg.data.count);
				changePage();
			}
		} else {
			alert(msg.msg);
		}
	});
}
/*教材中详情信息渲染方法*/
function detJiaocai(tbid,textbooktype) {
	var data = {
		tbid: parseInt(tbid)
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "teaching/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#tbid").html(msg.data.tbid);
			$("#textbook1").val(msg.data.textbook);
			$("#kcs").val(msg.data.course_num);
			$("#jclx").val(msg.data.tbook_type);
			$("#studentImg").prop("src", msg.data.cover);
			$("#textbookremove").html(msg.data.type1);
			var textbookremove = '';
			var textbookremove1 = '';
			if(msg.data.type1 == 1){
				if(textbooktype == 1){
					$("#tianjia").hide();
					$("#jrcgx").hide();
					$("#copyCourse").show();
				}else if(textbooktype == 2){
					$("#tianjia").hide();
					$("#jrcgx").hide();
					$("#copyCourse").show();
				}
				textbookremove = "none";
				textbookremove1 = "none";
			}else if(msg.data.type1 == 2){
				if(textbooktype == 1){
					$("#tianjia").show();
					$("#jrcgx").show();
					$("#copyCourse").hide();
				}else if(textbooktype == 2){
					$("#tianjia").hide();
					$("#jrcgx").hide();
					$("#copyCourse").hide();
				}
				textbookremove = "block";
				textbookremove1 = "block";
			}
			var s = '';
			$.each(msg.data.course, function(index, element) {
				var is_imp = '';
				var jiaoan = '';
				if(element.course_imp != '') {
					is_imp = 'duihao';
				} else {
					is_imp = 'gantanhao';
				}
				if(element.page.length != 0) {
					jiaoan = 'duihao';
				} else {
					jiaoan = 'gantanhao';
				}
				var music_name = '暂无';
				var music_ltime = '暂无';
				var music_bpm = '暂无';
				var music_difflv = '暂无';
				if(element.music.name){
					music_name = element.music.name;
				}
				if(element.music.ltime){
					music_ltime = element.music.ltime;
				}
				if(element.music.bpm){
					music_bpm = element.music.bpm;
				}
				if(element.music.difflv){
					music_difflv = element.music.difflv;
				}
				if(textbooktype == 1){
					s += addjiaocai.replace("%index", index + 1).replace("%course_id", element.course_id).replace("%course_name", element.course)
					.replace("%music_name", music_name).replace("%ltime", music_ltime).replace("%bpm", music_bpm).replace("%difflv", music_difflv)
					.replace("%jiaoan", jiaoan).replace("%is_imp", is_imp).replace("%textbookremove",textbookremove).replace("%textbookremove1",textbookremove1);
				}else{
					s += addjiaocai1.replace("%index", index + 1).replace("%course_id", element.course_id).replace("%course_name", element.course)
					.replace("%music_name", music_name).replace("%ltime", music_ltime).replace("%bpm", music_bpm).replace("%difflv", music_difflv)
					.replace("%jiaoan", jiaoan).replace("%is_imp", is_imp);
				}
			});
			$("#addjiaocaiBody").html(s);

			$("#addJiaocai").show();
			$("#jiaocaiShadow").animate({
				opacity: '0.3'
			}, 400);
			$("#jiaocaiMain").animate({
				top: '15%',
				opacity: '1'
			}, 400);
		} else {
			alert(msg.msg);
		}
	});
}

/* todo 2、添加教材课程接口 test*/
function addCourse() {
	if(courseAddOrEd == 1){
		var course_id = 0;
	}else {
		var course_id = $("#course_id").html();
	}
	var course_order = $("#kcbh").val();
	var course_name = $("#kcmc").val();
	var course_imp = $("#kczd").val();
//	var music = $("#musicid").html();
	var music = '';
	var orderNum = [];
	var orderflag = 0;
	$.each($(".yemaCtr"), function(index,element) {
		if($(element).find(".order_page").val() == ''){
			orderflag += 1;
			return false;
		}
	});
	if(orderflag == $(".yemaCtr").length){
		for(var i=0;i<$(".yemaCtr").length;i++){
			orderNum.push(0);
		}
	}else if(orderflag == 0){
		$.each($(".yemaCtr"), function(index,element) {
			if(index == 0){
				orderNum.push(1);
			}else{
				if($(element).find(".order_page").val() == $(".yemaCtr").eq(index-1).find(".order_page").val()){
					orderNum.push(orderNum[orderNum.length-1]);
				}else{
					orderNum.push(orderNum[orderNum.length-1]+1);
				}
			}
		});
	}else{
		alert("配置目录不完整,请输入完整!");
		return false;
	}
	var course_flag = 1;
	var page = [];
	$.each($(".yemaCtr"), function(index, element) {
		var order_page = $(element).find(".order_page").val();
		var page_title = $(element).find(".page_title").val();
		var type = parseInt($(element).find(".fujianType").val());
		if($(element).find(".qiyong").css("display") == 'none'){
			var pgtype = 2;
			var pgurl = '';
		}else{
			var pgtype = 1;
			var pgurl = $(element).find(".music_url").val();
		}
		var s = {
				order: orderNum[index],
				order_page: order_page,
				page_title: page_title,
				type:type,
				pgtype:pgtype,
				pgurl:pgurl,
				pg_x:0,
				pg_y:0
			}
		if(type == 1){
			var s1 = {
				url: $(element).find(".fujiandizi").val(),
			}
			Object.assign(s,s1);
		}else if(type == 2){
			var s1 = {
				url: $(element).find(".fujiandizi").val(),
				url1:$(element).find(".fengmianurl").val(),
			}
			Object.assign(s,s1);
		}else if(type == 3){
			var s1 = {
				plist: parseInt($(element).find(".plist").html()),
			}
			Object.assign(s,s1);
		}else if(type == 4){
			if($(element).find(".music_select_id").html() == ''){
				course_flag = 2;
				alert("第"+(index+1)+"页没有选择歌曲，请配置歌曲!");
				return false;
			}else if($(element).find(".music_img_input").val() == ''){
				course_flag = 2;
				alert("第"+(index+1)+"页没有填写图片地址，请补充完整!");
				return false;
			}
			var s1 = {
				music_id: parseInt($(element).find(".music_select_id").html()),
				music_url: $(element).find(".music_img_input").val(),
			}
			Object.assign(s,s1);
		}else if(type == 5){
			if($(element).find(".game_select_select").val() == ''){
				course_flag = 2;
				alert("第"+(index+1)+"页没有选择游戏，请补充完整!");
				return false;
			}
			var s1 = {
				casual_game_id: parseInt($(element).find(".game_select_select").val()),
			}
			Object.assign(s,s1);
		}else if(type == 6){
			var teach_game_type = parseInt($(element).find(".game_type_select").val());
			if(teach_game_type == 1){
				if($(element).find(".game_music_id").html() == ''){
					course_flag = 2;
					alert("第"+(index+1)+"页没有选择歌曲，请配置歌曲!");
					return false;
				}
				if($(element).find(".game_music_select").val() == ''){
					course_flag = 2;
					alert("第"+(index+1)+"页没有选择游戏，请补充完整!");
					return false;
				}
				teach_game_music_id = parseInt($(element).find(".game_music_id").html());
				teach_game_id = parseInt($(element).find(".game_music_select").val());
				var s1 = {
					teach_game_type:teach_game_type,
					teach_game_music_id : teach_game_music_id,
					teach_game_id : teach_game_id
				}
			}else if(teach_game_type == 2){
				if($(element).find(".game_gongju_select1").val() == ''){
					course_flag = 2;
					alert("第"+(index+1)+"页没有选择工具类型，请补充完整!");
					return false;
				}
				if($(element).find(".game_gongju_select2").val() == ''){
					course_flag = 2;
					alert("第"+(index+1)+"页没有选择游戏，请补充完整!");
					return false;
				}
				teach_game_tool_type = parseInt($(element).find(".game_gongju_select1").val());
				teach_game_id = parseInt($(element).find(".game_gongju_select2").val());
				var s1 = {
					teach_game_type:teach_game_type,
					teach_game_tool_type : teach_game_tool_type,
					teach_game_id : teach_game_id
				}
			}
			Object.assign(s,s1);
		}else if(type == 7){
			
		}else if(type == 8){
			var task = [];
			$.each($(element).find(".zhuoye_list"), function(index,element1) {
				if($(element1).hasClass("zhuoye_list_selected")){
					var task_game_type = 2;
					if($(element1).find(".danxuan div:nth-child(1)").hasClass("danxuanSelect")){
						task_game_type = 1;
					}
					var s = {
						task_type:parseInt($(element1).find(".task_type").html()),
						task_id:parseInt($(element1).find(".task_id").html()),
						task_name:$(element1).find(".task_name").html(),
						task_url:$(element1).find(".zhuoye_style2").css("backgroundImage").replace('url("','').replace('")',''),
						task_num:parseInt($(element1).find(".task_num").html()),
						task_game_type:task_game_type,
						task_game_id:parseInt($(element1).find(".work_game_select").val())
					}
					task.push(s);
				}
			});
			if(task.length > 10){
				course_flag = 2;
				alert("作业布置不能超过10份!")
				return false;
			}
			var s1 = {task:task};
			Object.assign(s,s1);
		}
		page.push(s);
	});
	if(course_flag == 2){
		return false;
	}
	
	var puli = [];
	$.each($(".jiaoan"), function(index, element) {
		puli.push(parseInt($(element).find(".plid").html()));
	});
	if(course_imp.length > 30) {
		alert("课程重点超过字数限制!");
		return false;
	}
//	if(course_order == '' || course_name == '' || course_imp == '' || music == '' || page.length == 0 || puli.length == 0) {
//		alert("请输入完整!");
//		return false;
//	}
	if(music == ''){
		music = 0;
	}else{
		music = parseInt(music);
	}
	var data = {
		"course_id": parseInt(course_id),
		"course_order": parseInt(course_order),
		"course_name": course_name,
		"course_imp": course_imp,
		"music": music,
		"page": page,
		"puli": puli,
		/* 谱例 */
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "teaching_ks/add?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var jiaoan = '';
			var is_imp = '';
			if(msg.data.jiaoan == 1) {
				jiaoan = 'duihao';
			} else {
				jiaoan = 'gantanhao';
			}
			if(msg.data.is_imp == 1) {
				is_imp = 'duihao';
			} else {
				is_imp = 'gantanhao';
			}
			var music_name = '暂无';
				var music_ltime = '暂无';
				var music_bpm = '暂无';
				var music_difflv = '暂无';
				if(msg.data.musInfo.music_name){
					music_name = msg.data.musInfo.music_name;
				}
				if(msg.data.musInfo.ltime){
					music_ltime = msg.data.musInfo.ltime;
				}
				if(msg.data.musInfo.bpm){
					music_bpm = msg.data.musInfo.bpm;
				}
				if(msg.data.musInfo.difflv){
					music_difflv = msg.data.musInfo.difflv;
				}
			var textbookremove = '';
			var textbookremove1 = '';
			if(parseInt($("#textbookremove").html()) == 1){
				textbookremove = "none";
				textbookremove1 = "none";
			}else if(parseInt($("#textbookremove").html()) == 2){
				textbookremove = "block";
				textbookremove1 = "block";
			}
			var s = '';
			s += addjiaocai.replace("%index", $("#kcbh").val()).replace("%course_id", msg.data.course_id).replace("%course_name", msg.data.course_name)
				.replace("%music_name", music_name).replace("%ltime", music_ltime).replace("%bpm", music_bpm).replace("%difflv", music_difflv)
				.replace("%jiaoan", jiaoan).replace("%is_imp", is_imp).replace("%textbookremove",textbookremove).replace("%textbookremove1",textbookremove1);
			if(courseAddOrEd == 1){
				if($("#kcbh").val() == 1) {
					$("#addjiaocaiBody").append(s);
				} else {
					$(".addjiaocaiTr:nth-child(" + ($("#kcbh").val() - 1) + ")").after(s);
				}
			}else if(courseAddOrEd == 2){
				$(".addjiaocaiTr:nth-child("+$("#kcbh").val()+")").replaceWith(s);
			}
			
			$.each($(".addjiaocaiTr"), function(index, element) {
				$(element).find("td:nth-child(1)").html(index + 1);
			});
			
			$("#kcs").val($(".addjiaocaiTr").length);
			
			$("#tjkcShadow").animate({
				opacity: '0'
			}, 400);
			$("#tjkcMain").animate({
				top: '0%',
				opacity: '0'
			}, 400, function() {
				$("#tjkc").hide();
			});
			setTimeout(function() {
				if(courseAddOrEd == 1){
					alert("添加成功!");
				}else if(courseAddOrEd == 2){
					alert("编辑成功!");
				}
			}, 500);
		} else {
			alert(msg.msg);
		}
	});
}

/* todo 3、生成教材接口 test*/
function creatTb(type) {
	/*此接口为POST 测试时以get方式*/
	var textbook = $("#textbook1").val();
	var course_num = $("#kcs").val();
	var tbook_type = $("#jclx").val();
	var course = [];
	$.each($(".addjiaocaiTr"), function(index, element) {
		course.push(parseInt($(element).find(".course_id").html()));
	});
	if(course_num != ''){
		course_num = parseInt(course_num);
	}
	if(textbook == '') {
		alert("请输入教材名称!");
		return false;
	}
	if(addOredit == 1) {
		var data = {
			"tbid": 0,
			/*教材ID 必须 为零表示新增 非零编辑*/
			"textbook": textbook,
			"course_num": course_num,
			"tbook_type": parseInt(tbook_type),
			"course": course,
			/*课程ID*/
			"type1": parseInt(type),
			/*1-生成教材  2-放草稿箱*/
		};
	} else if(addOredit == 2) {
		var data = {
			"tbid": parseInt($("#tbid").html()),
			/*教材ID 必须 为零表示新增 非零编辑*/
			"textbook": textbook,
			"course_num": course_num,
			"tbook_type": parseInt(tbook_type),
			"course": course,
			/*课程ID*/
			"type1": parseInt(type),
			/*1-生成教材  2-放草稿箱*/
		};
	}
	var ext = '';
	var head = $("#studentImg").attr("src");
	if(head == ''||head == '../../public/img/logoMoren1.jpg') {
		alert("请上传头像!");
		return false;
	} else {
		ext = head.split(",")[0].split("/")[1].split(";")[0];
		console.log(ext);
		head = head.split(",")[1];
		if(!head) {
			head = '';
		} else {
			head = encodeURIComponent(head);
		}
	}

	var token = window.sessionStorage.token;
	var deal = "teaching/add?";
	var url = objKeySort(deal, data, token);
	console.log(data);
	console.log(url);
	ajax_post(url, "head=" + head+"&ext="+ext, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#jiaocaiShadow").animate({opacity: '0'}, 400);
			$("#jiaocaiMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#addJiaocai").hide();
			});
			$("#qrtjShadow").animate({opacity: '0'}, 400);
			$("#qrtjMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#qrtj").hide();
			});
			setTimeout(function() {
				if(addOredit == 1) {
					chaxun(1);
					alert('添加成功!');
				} else if(addOredit == 2) {
					chaxun(1);
					alert('编辑成功!');
				}
			}, 500);
		} else {
			alert(msg.msg);
		}
	});
}

/*复制按钮的点击事件*/
function copyCourse(){
	var data = {
		tbid : parseInt($("#tbid").html())
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "teaching/copytch?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			$("#jiaocaiShadow").animate({opacity: '0'}, 400);
			$("#jiaocaiMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#addJiaocai").hide();
				backTextbook();
			});
			setTimeout(function() {
				alert('复制教材成功!');
			}, 500);
		}else{
			alert(msg.msg);
		}
	});
}

function selectmusic(type) {
	if(type == 1) {
		var name = '';
		var genre = 0;
		var style = 0;
		var re_type = 0;
		var difflv = 0;
		$('#gqmc').val("");
		$('#gqlx').val(0);
		$('#gqfg').val(0);
		$('#qkxz').val(0);
		$('#gqnd').val("");
	} else {
		var name = $('#gqmc').val();
		var genre = $('#gqlx').val();
		var style = $('#gqfg').val();
		var re_type = $("#qkxz").val();
		var difflv = $("#gqnd").val();
		if(difflv == '') {
			difflv = 0;
		}
	}

	var data = {
		"name": name,
		"genre": genre,
		"style": style,
		"re_type": re_type,
		"difflv": difflv,
		"paixuname":0,
		"paixutype":0,
		"size": 1000,
		"page": 1,
		"total": 0,
	}
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "song/select?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var song = '';
			$.each(msg.data.info, function(index, element) {
				var genre = '';
				if(element.genre == 1) {
					genre = "初级";
				} else if(element.genre == 2) {
					genre = "中级";
				} else if(element.genre == 3) {
					genre = "高级";
				}
				song += musicStr.replace('%songid', element.songid).replace('%imgpath', element.imgpath.replace(/ /g,"%20")).replace('%name', element.name).replace('%genre', genre)
					.replace('%ltime', element.ltime).replace('%bpm', element.bpm).replace('%style', element.style).replace('%difflv', element.difflv);
			});
			$("#musicBody").html(song);
			$("#xzgq").show();
			$("#xzgqShadow").animate({
				opacity: '0.3'
			}, 400);
			$("#xzgqMain").animate({
				top: '10%',
				opacity: '1'
			}, 400);
		} else {
			alert(msg.msg);
		}
	});
}

/*选择歌曲中的确认选择的点击事假*/
function musicOkSelect() {
	var _index = '';
	$.each($(".xzlsSelect"), function(index, element) {
		if($(element).find("img").css("display") != "none") {
			_index = $(element).parent().parent();
		}
	});
	if(_index == ''){
		alert("请选择歌曲!");
	}else{
		if(music_jq_type == 1){
			$("#musicid").html(_index.find("td:nth-child(2)").html());
			$("#musicName").html(_index.find("td:nth-child(4)").html());
			$("#musicTime").html(_index.find("td:nth-child(6)").html());
			$("#musicBpm").html(_index.find("td:nth-child(7)").html());
			$("#musicNandu").html(_index.find("td:nth-child(9)").html());
			$(".kcgq").show();
			$("#tjgq").hide();
		}else if(music_jq_type == 2){
			music_jq.find(".music_select_id").html(_index.find("td:nth-child(2)").html());
			music_jq.find(".music_select_url").html(_index.find("td:nth-child(3) img").attr("src"));
			music_jq.find(".musicName").html(_index.find("td:nth-child(4)").html());
			music_jq.find(".musicTime").html(_index.find("td:nth-child(6)").html());
			music_jq.find(".musicBpm").html(_index.find("td:nth-child(7)").html());
			music_jq.find(".musicNandu").html(_index.find("td:nth-child(9)").html());
			music_jq.find(".music_select_exist").show();
			music_jq.find(".music_select_add").hide();
		}else if(music_jq_type == 3){
			music_jq.find(".game_music_id").html(_index.find("td:nth-child(2)").html());
			music_jq.find(".game_music_url").html(_index.find("td:nth-child(3) img").attr("src"));
			music_jq.find(".musicName").html(_index.find("td:nth-child(4)").html());
			music_jq.find(".musicTime").html(_index.find("td:nth-child(6)").html());
			music_jq.find(".musicBpm").html(_index.find("td:nth-child(7)").html());
			music_jq.find(".musicNandu").html(_index.find("td:nth-child(9)").html());
			music_jq.find(".game_music_exist").show();
			music_jq.find(".game_music_add").hide();
		}
		$("#xzgqShadow").animate({opacity: '0'}, 400);
		$("#xzgqMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xzgq").hide();
		});
	}
}

/*选择谱例的搜索事件*/
function puliSearch(type) {
	if(type == 1) {
		var plname = '';
		var cate1 = 0;
		var cate2 = '';
		$("#puliname").val("");
		$(".fenlei1:nth-child(1)").addClass("fenleiSelected").siblings().removeClass("fenleiSelected");
		$(".fenlei2:nth-child(1)").addClass("fenleiSelected").siblings().removeClass("fenleiSelected");
		$("#yxzStudent").html("0");
	} else {
		$("#yxzStudent").html("0");
		var plname = $('#puliname').val();
		var cate1 = 0;
		$.each($(".fenlei1"), function(index, element) {
			if($(element).hasClass("fenleiSelected")) {
				if(index == 0) {
					cate1 = 0;
				} else if(index == 1) {
					cate1 = 4;
				} else if(index == 2) {
					cate1 = 8;
				} else if(index == 3) {
					cate1 = 16;
				} else if(index == 4) {
					cate1 = 32;
				}
			}
		});
		var cate2 = 0;
		$.each($(".fenlei2"), function(index, element) {
			if($(element).hasClass("fenleiSelected")) {
				if(index == 0) {
					cate2 = '';
				} else {
					cate2 = $(element).html();
				}
			}
		});
	}

	var data = {
		"plname": plname,
		"cate1": cate1,
		"cate2": cate2,
		"size": 1000,
		"page": 1,
		"count": 0,
	}
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "teaching/pulilist?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var puliList = '';
			$.each(msg.data.info, function(index, element) {
				puliList += puliStr.replace('%plid', element.plid).replace('%img', element.url.replace(/ /g,"%20")).replace('%url', element.url).replace('%plname', element.plname)
					.replace('%cate1', element.cate1).replace('%cate2', element.cate2).replace('%name', element.plname);
			});
			$("#puliBody").html(puliList);
			$("#xzxyTc").show();
			$("#xzxyShadow").animate({
				opacity: '0.3'
			}, 400);
			$("#xzxyMain").animate({
				top: '15%',
				opacity: '1'
			}, 400);
		} else {
			alert(msg.msg);
		}
	});
}

/*确认选择的点击事件*/
function selectPuli() {
	var studentObject = [];
	$.each($(".xzxySelect"), function(index, element) {
		if($(element).find("img").css("display") != "none") {
			var s = {
				plid: $(element).parent().parent().find(".plid").html(),
				plurl: $(element).parent().parent().find(".plurl").html().replace(/ /g,"%20"),
				plname: $(element).parent().parent().find(".plname").html()
			};
			studentObject.push(s);
		}
	});
	console.log(studentObject);

	var oldstuObject = [];
	$.each($("#jiaoanBox").find(".jiaoan"), function(index, element) {
		var s = {
			plid: $(element).find(".plid").html(),
			plurl: $(element).find(".plurl").html().replace(/ /g,"%20"),
			plname: $(element).find(".plname").html()
		};
		oldstuObject.push(s);
	});
	console.log(oldstuObject);

	var stuObject = [];
	if(oldstuObject.length == 0) {
		$.each(studentObject, function(index, element) {
			stuObject.push(element);
		});
	} else if(studentObject.length == 0) {
		$.each(oldstuObject, function(index, element) {
			stuObject.push(element);
		});
	} else if(oldstuObject.length != 0 && studentObject.length != 0) {
		$.each(oldstuObject, function(index, element) {
			stuObject.push(element);
		});
		$.each(studentObject, function(index, element) {
			var flag = 1;
			$.each(oldstuObject, function(index1, element1) {
				if(parseInt(element.plid) == parseInt(element1.plid)) {
					flag = 2;
					return;
				}
			});
			if(flag == 1) {
				stuObject.push(element);
			}
		});
	}
	console.log(stuObject);

	var s = '';
	$.each(stuObject, function(index, element) {
		s += puliImgStr.replace("%img", element.plurl).replace("%plurl", element.plurl).replace("%plid", element.plid).replace("%plname", element.plname);
	});

	if(puliType == 2) {
		$.each(studentObject, function(index, element) {
			puliElement.find(".plist").html(element.plid);
			puliElement.find(".plist_url").html(element.plurl);
			puliElement.find(".puliselectname").html(element.plname);
			puliElement.find(".fujian2Img").prop("src", element.plurl);
		});
	}

	$("#jiaoanBox").html(s);
	$("#xzxyShadow").animate({
		opacity: '0'
	}, 400);
	$("#xzxyMain").animate({
		top: '0%',
		opacity: '0'
	}, 400, function() {
		$("#xzxyTc").hide();
	});
}

/*给添加教材课程信息重置为空的方法*/
function zhikong() {
	$("#kcmc").val("");
	$("#kczd").val("");
	$("#musicid").html("");
	$("#tjgq").show();
	$(".kcgq").hide();
	$("#kcmcNum>span:nth-child(1)").html("0");
	$("#kcmcNum>span:nth-child(1)").removeClass("colorRed");
	$("#kczdNum>span:nth-child(1)").html("0");
	$("#kczdNum>span:nth-child(1)").removeClass("colorRed");
	$.each($(".yema"), function(index, element) {
		if(index != 0) {
			$(element).remove();
		} else {
			$(element).addClass("yemaSelect");
		}
	});
	$("#yemabox").animate({scrollLeft:0},200);
	$.each($(".yemaCtr"), function(index, element) {
		if(index != 0) {
			$(element).remove();
		} else {
			$(element).show();
			$(element).find(".textNeirong").val("");
			$(element).find(".page_title").val("");
			$(element).find(".order_page").val("");
//			$(element).find(".fengmianurl").val("");
//			$(element).find(".fujianType").val(1);
//			$(element).find(".imgvideo").show();
//			$(element).find(".fujiandizi").val("");
//			$(element).find(".puli").hide();
//			$(element).find(".puliselectname").html("");
//			$(element).find(".plist").html("");
//			$(element).find(".fujian2Img").show();
//			$(element).find(".fujian2Video").hide();
//			$(element).find(".fujian2Img").prop("src","");
//			$(element).find(".fujian2Video").prop("src","");
			$(element).find(".fujiandizi").val("");
			$(element).find(".puliselectname").html("");
			$(element).find(".plist").html("");
			$(element).find(".music_select_id").html("");
			$(element).find(".music_select_url").html("");
			$(element).find(".music_select_add").show();
			$(element).find(".music_select_exist").hide();
			$(element).find(".game_select_select").val("");
			$(element).find(".fengmianurl").val("");
			$(element).find(".music_img_input").val("");
			$(element).find(".game_music_id").html("");
			$(element).find(".game_music_url").html("");
			$(element).find(".game_music_add").show();
			$(element).find(".game_music_exist").hide();
			$(element).find(".game_music_select").val("");
			$(element).find(".game_gongju_select1").val("1");
			$(element).find(".game_gongju_select2").val("");
			$(element).find(".guanbi").show();
			$(element).find(".qiyong").hide();
			$(element).find(".music_url").val("");
			$(element).find(".music_url").prop("disabled","disabled");
			$(element).find(".fujian2Img").prop("src","");
			$(element).find(".fujian2Video").prop("src","");
			$(element).find(".pg_style").hide();
			
			$(element).find(".fujianType").val(1);
			$(element).find(".fujianType").trigger("change");
		}
	});
	$("#jiaoanBox").html("");
}

/*教材课程详情的方法*/
function detCourse(course_id,coursetype) {
	var data = {
		course_id: parseInt(course_id)
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "teaching_ks/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#course_id").html(msg.data.course_id);
			$("#kcmc").val(msg.data.course_name);
			$("#kczd").val(msg.data.course_imp);
			$("#kcmcNum>span:nth-child(1)").html(msg.data.course_name.length);
			$("#kczdNum>span:nth-child(1)").html(msg.data.course_imp.length);
//			if(msg.data.music.songid){
//				$("#tjgq").hide();
//				$(".kcgq").show();
//				$("#musicid").html(msg.data.music.songid);
//				$("#musicName").html(msg.data.music.music_name);
//				$("#musicTime").html(msg.data.music.ltime);
//				$("#musicBpm").html(msg.data.music.bpm);
//				$("#musicNandu").html(msg.data.music.difflv);
//			}else{
//				$("#tjgq").show();
//				$(".kcgq").hide();
//			}
			if(msg.data.page.length >= 1){
				
				$.each(msg.data.page, function(index,element) {
					if(index != 0){
						var s1 = '';
						s1 += yema.replace("%num",index+1);
						$("#yemabox").append(s1);
						var s2 = '';
						s2 += bianjiyemian.replace("%order_page","");
						$("#yemaCtrBox").append(s2);
					}
						var _element = $(".yemaCtr").eq(index);
						_element.find(".textNeirong").val(element.content);
						_element.find(".page_title").val(element.page_title);
						_element.find(".order_page").val(element.order_page);
						if(element.pgtype == 1){
							_element.find(".qiyong,.pg_style").show();
							_element.find(".guanbi").hide();
							_element.find(".music_url").val(element.pgurl);
							_element.find(".music_url").removeAttr("disabled");
						}else if(element.pgtype == 2){
							_element.find(".qiyong,.pg_style").hide();
							_element.find(".guanbi").show();
							_element.find(".music_url").val(element.pgurl);
							_element.find(".music_url").prop("disabled","disabled");
						}
						_element.find(".fujianType").val(element.type);
						if(element.type != 5 && element.type != 6 && element.type != 8){
							_element.find(".fujianType").trigger("change");
						}
						
						
						if(element.type == 1){
							_element.find(".fujiandizi").val(element.url);
							_element.find(".fujian2Img").prop("src",element.url);
						}else if(element.type == 2){
							_element.find(".fujiandizi").val(element.url);
							_element.find(".fengmianurl").val(element.url1);
							_element.find(".fujian2Video").prop("src",element.url);
						}else if(element.type == 3){
							_element.find(".puliselectname").html(element.plist.name);
							_element.find(".plist").html(element.plist.id);
							_element.find(".plist_url").html(element.plist.url);
							_element.find(".fujian2Img").prop("src",element.plist.url);
						}else if(element.type == 4){
							if(element.music_det.songid){
								_element.find(".music_select_id").html(element.music_det.songid);
								_element.find(".music_select_url").html(element.music_det.music_url);
								_element.find(".music_select_body .musicName").html(element.music_det.music_name);
								_element.find(".music_select_body .musicTime").html(element.music_det.ltime);
								_element.find(".music_select_body .musicBpm").html(element.music_det.bpm);
								_element.find(".music_select_body .musicNandu").html(element.music_det.difflv);
								_element.find(".music_select_exist").show();
								_element.find(".music_select_add").hide();
							}else{
								_element.find(".music_select_exist").hide();
								_element.find(".music_select_add").show();
							}
							_element.find(".music_img_input").val(element.music_url);
							_element.find(".fujian2Img").prop("src",element.music_url);
						}else if(element.type == 5){
							_element.find(".imgvideo,.puli,.music_select,.game_type,.fujian3,.music_img,.game_music,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box").hide();
							_element.find(".game_select,.fujian2Img").show();
							var str_game = '';
							var s = '<option value="%id">%name</option>';
							$.each(element.casual_game, function(index,element2) {
								str_game += s.replace("%id",element2.id).replace("%name",element2.name);
							});
							_element.find(".game_select_select").html(str_game);
							_element.find(".game_select_select").val(element.casual_game_id);
							_element.find(".fujian2Img").prop("src","../../public/img/game"+element.casual_game_id+".png");
						}else if(element.type == 6){
							_element.find(".imgvideo,.puli,.music_select,.game_select,.fujian3,.music_img,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box,.game_type,.game_music,.fujian2Img").hide();
							var str_game = '';
							var s = '<option value="%id">%name</option>';
							$.each(element.teach_game, function(index,element2) {
								str_game += s.replace("%id",element2.id).replace("%name",element2.name);
							});
							if(element.teach_game_type == 1){
								_element.find(".game_type_select").val(element.teach_game_type);
								_element.find(".game_type,.game_music,.fujian2Img").show();
								if(element.teach_game_music.songid){
									_element.find(".game_music_id").html(element.teach_game_music.songid);
									_element.find(".game_music_url").html(element.teach_game_music.music_url);
									_element.find(".game_music_body .musicName").html(element.teach_game_music.music_name);
									_element.find(".game_music_body .musicTime").html(element.teach_game_music.ltime);
									_element.find(".game_music_body .musicBpm").html(element.teach_game_music.bpm);
									_element.find(".game_music_body .musicNandu").html(element.teach_game_music.difflv);
									_element.find(".game_music_exist").show();
									_element.find(".game_music_add").hide();
								}else{
									_element.find(".game_music_exist").hide();
									_element.find(".game_music_add").show();
								}
								_element.find(".game_music_select").html(str_game);
								_element.find(".game_music_select").val(element.teach_game_id);
								_element.find(".fujian2Img").prop("src","../../public/img/game"+element.teach_game_id+".png");
							}else if(element.teach_game_type == 2){
								_element.find(".game_type_select").val(element.teach_game_type);
								_element.find(".game_type,.game_gongju,.fujian2Img").show();
								_element.find(".game_gongju_select1").val(element.teach_game_tool_type);
								_element.find(".game_gongju_select2").html(str_game);
								_element.find(".game_gongju_select2").val(element.teach_game_id);
								_element.find(".fujian2Img").prop("src","../../public/img/game"+element.teach_game_id+".png");
							}
						}else if(element.type == 7){
							
						}else if(element.type == 8){
							_element.find(".imgvideo,.puli,.music_select,.game_type,.game_select,.fujian3,.music_img,.game_music,.game_gongju,.fujian2Video,.huike_box,.fujian2Img").hide();
							_element.find(".zhuoye_box").show();
							var s = '';
							$.each(element.task, function(index,element1) {
								var task_type_style1 = '',task_type_style2 = '',task_type_style3 ='',game='',game_status='',disabled='disabled',gamestr = '';
								var task_url = element1.task_url;
								if(element1.task_type == 1){
									task_type_style1 = 'block';
									task_type_style2 = 'none';
									task_type_style3 = 'none';
									game = 'block';
								}else if(element1.task_type == 2){
									task_type_style1 = 'none';
									task_type_style2 = 'block';
									task_type_style3 = 'none';
									game = 'none';
								}else if(element1.task_type == 3){
									task_type_style1 = 'none';
									task_type_style2 = 'none';
									task_type_style3 = 'block';
									game = 'block';
								}
								if(element1.task_game_type == 1){
									game_status = 'danxuanSelect';
									disabled = '';
								}
								if(element1.task_type == 3){
									task_url = "../../public/img/tool.png";
								}
								
								if(element1.task_game_id == 0){
									gamestr += "<option value='0' selected>所有游戏</option>";
								}else{
									gamestr += "<option value='0'>所有游戏</option>";
								}
								$.each(element1.task_game, function(index2,element2) {
									if(element2.id == element1.task_game_id){
										gamestr += "<option value='"+element2.id+"' selected>"+element2.name+"</option>";
									}else{
										gamestr += "<option value='"+element2.id+"'>"+element2.name+"</option>";
									}
								});
								s += zhuoyeStr1.replace("%task_id",element1.task_id).replace("%task_type",element1.task_type).replace("%task_url",task_url)
									.replace("%task_name",element1.task_name).replace("%task_type_style1",task_type_style1).replace("%task_type_style2",task_type_style2)
									.replace("%task_type_style3",task_type_style3).replace("%task_num",element1.task_num).replace("%game",game)
									.replace("%game_status",game_status).replace("%disabled",disabled).replace("%gamestr",gamestr);
							});
							_element.find(".zhuoye_scroll").html(s);
						}
					
				});
				if(coursetype == 2){
					$(".addclose,.addclose1,.qiehuanpuli,.closeyema").hide();
					$("#tjkcMain input,#tjkcMain select").prop("disabled","disabled");
					$(".puli>div:nth-child(2)").css({background:"rgb(235,235,228)"});
				}
			}
			var s= '';
			$.each(msg.data.puli, function(index,element) {
				s += puliImgStr.replace("%img",element.url).replace("%plid",element.id).replace("%plurl",element.url).replace("%plname",element.name);
			});
			$("#jiaoanBox").append(s);
			
			
			$("#tjkc").show();
			$("#tjkcShadow").animate({
				opacity: '0.3'
			}, 400);
			$("#tjkcMain").animate({
				top: '3%',
				opacity: '1'
			}, 400);
		} else {
			alert(msg.msg);
		}
	});
}

/*新版教案课程中冲服务器中拉取小游戏数据的方法*/
function getGame(type,game_type,game_tool_type,callback){
	var data = {
		"type": type,
		"game_type": game_type,
		"game_tool_type":game_tool_type,
	}
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "teaching_ks/getgame?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var gameStr = '<option value="%id">%name</option>';
			var s = '';
			$.each(msg.data.game, function(index,element) {
				s += gameStr.replace("%id",element.id).replace("%name",element.name);
			});
			callback(s);
		} else {
			alert(msg.msg);
		}
	});
}
/*新版教案课程中作业的信息拉取*/
function getTask(indexFlag,callback){
	var flag = 1;
	var task = [];
	$.each($(".yemaCtr"), function(index,element) {
		if(index != indexFlag){
			var _type = $(element).find(".fujianType").val();
			if(_type == 3){
				if($(element).find(".plist").html() == ''){
					flag = 2;
					alert("第"+(index+1)+"页课程中谱例未选择，请先选择谱例!");
					return false;
				}
				var s = {
					task_type:2,
					task_id:parseInt($(element).find(".plist").html()),
					task_name:$(element).find(".puliselectname").html(),
					task_url:$(element).find(".plist_url").html()
				};
				task.push(s);
			}else if(_type == 4){
				if($(element).find(".music_select_id").html() == ''){
					flag = 2;
					alert("第"+(index+1)+"页课程中歌曲未选择，请先选择歌曲!");
					return false;
				}
				var s = {
					task_type:1,
					task_id:parseInt($(element).find(".music_select_id").html()),
					task_name:$(element).find(".music_select_body .musicName").html(),
					task_url:$(element).find(".music_select_url").html()
				};
				task.push(s);
			}else if(_type == 6){
				if($(element).find(".game_type_select").val() == 1){
					if($(element).find(".game_music_id").html() == ''){
						flag = 2;
						alert("第"+(index+1)+"页课程中歌曲未选择，请先选择歌曲!");
						return false;
					}
					var s = {
						task_type:1,
						task_id:parseInt($(element).find(".game_music_id").html()),
						task_name:$(element).find(".game_music_body .musicName").html(),
						task_url:$(element).find(".game_music_url").html()
					};
					task.push(s);
				}else if($(element).find(".game_type_select").val() == 2){
					if($(element).find(".game_gongju_select1").val() == ''){
						flag = 2;
						alert("第"+(index+1)+"页课程中工具类型未选择，请先选择工具类型!");
						return false;
					}
					var s = {
						task_type:3,
						task_id:parseInt($(element).find(".game_gongju_select1").val()),
						task_name:"节拍器",
						task_url:"../../public/img/tool.png"
					};
					task.push(s);
				}
			}else if(_type == 8){
				flag = 2;
				alert("您已在其他页面配置了作业!");
				return false;
			}
		}
	});
	if(flag == 1&&task.length == 0){
		flag = 2;
		alert("请先于其他页面配置 音乐 或 谱例 或 小工具 才能生成作业!");
	}
	console.log(task);
	if(flag == 1){
		var s = '';
		var _element = $(".yemaCtr").eq(indexFlag);
		_element.find(".zhuoye_scroll").empty();
		$.each(task, function(index,element) {
			var task_type_style1 = '',task_type_style2 = '',task_type_style3 ='',game='';
			if(element.task_type == 1){
				task_type_style1 = 'block';
				task_type_style2 = 'none';
				task_type_style3 = 'none';
				game = 'block';
			}else if(element.task_type == 2){
				task_type_style1 = 'none';
				task_type_style2 = 'block';
				task_type_style3 = 'none';
				game = 'none';
			}else if(element.task_type == 3){
				task_type_style1 = 'none';
				task_type_style2 = 'none';
				task_type_style3 = 'block';
				game = 'block';
			}
			s = zhuoyeStr.replace("%task_id",element.task_id).replace("%task_type",element.task_type).replace("%task_url",element.task_url)
				.replace("%task_name",element.task_name).replace("%task_type_style1",task_type_style1).replace("%task_type_style2",task_type_style2)
				.replace("%task_type_style3",task_type_style3).replace("%task_num",1).replace("%game",game);
			_element.find(".zhuoye_scroll").append(s);
			if(_element.find(".zhuoye_list").eq(index).find(".task_type").html() == 1){
				getGame(2,1,0,function(str){
					var all_game = "<option value='0'>所有游戏</option>";
					str = all_game + str;
					_element.find(".zhuoye_list").eq(index).find(".work_game_select").html(str);
				});
			}else if(_element.find(".zhuoye_list").eq(index).find(".task_type").html() == 3){
				_element.find(".zhuoye_list").eq(index).find(".danxuan>div:nth-child(1)").addClass("danxuanSelect");
				_element.find(".zhuoye_list").eq(index).find(".work_game_select").removeAttr("disabled");
				getGame(2,2,1,function(str){
					var all_game = "<option value='0'>所有游戏</option>";
					str = all_game + str;
					_element.find(".zhuoye_list").eq(index).find(".work_game_select").html(str);
				});
			}
		});
	}
	callback(flag);
}

/*教材查看动态变化编辑教材弹窗页面的方法*/
function changeTextbook(){
	$(".scsm").hide();
	$("#textbook1").prop("disabled","disabled");
	$("#jclx").prop("disabled","disabled");
	$("#textbook1").val("");
	$("#kcs").val(0);
	$("#jclx").val(1);
	$("#addjiaocaiBody").html("");
	$("#tjjcTipName").html("编辑教材");
	$(".tjBottom").hide();
	$("#guanbi").show();
	$("#scjc,#jrcgx,#fangqi").hide();
}
function backTextbook(){
	$(".scsm").show();
	$("#textbook1").removeAttr("disabled");
	$("#jclx").removeAttr("disabled");
	$("#tjjcTipName").html("编辑教材");
	$(".tjBottom").show();
	$("#guanbi").hide();
	$("#scjc,#jrcgx,#fangqi").show();
}
/*教材课程中动态变化页面显示*/
function changeCourse(){
	$(".addclose,.addclose1,.qiehuanpuli,#tjkcOk").hide();
	$("#tjkcMain input,#tjkcMain select").prop("disabled","disabled");
	$(".qiehuan,#kcmcNum,#kczdNum,#daorufrom,#addyema").hide();
	$(".kcgq,.tjgq,.puli>div:nth-child(2)").css({background:"rgb(235,235,228)"});
	$(".musicShadow,#guanbicourse").show();
}
function backCourse(){
	$(".addclose,.addclose1,.qiehuanpuli,#tjkcOk").show();
	$("#tjkcMain input,#tjkcMain select").removeAttr("disabled");
	$("#kcbh").prop("disabled","disabled");
	$(".qiehuan,#kcmcNum,#kczdNum,#daorufrom,#addyema").show();
	$(".kcgq,.tjgq,.puli>div:nth-child(2)").css({background:"#fff"});
	$(".musicShadow,#guanbicourse").hide();
}

//js 读取文件
    function jsReadFiles(files) {
        if (files.length) {
            var file = files[0];
            var reader = new FileReader();//new一个FileReader实例
            if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
                reader.onload = function() {
                	$.each($(".yema"), function(index, element) {
						if(index != 0) {
							$(element).remove();
						} else {
							$(element).addClass("yemaSelect");
						}
					});
					$.each($(".yemaCtr"), function(index, element) {
						if(index != 0) {
							$(element).remove();
						} else {
							$(element).show();
							$(element).find(".textNeirong").val("");
							$(element).find(".page_title").val("");
							$(element).find(".order_page").val("");
							$(element).find(".fujiandizi").val("");
							$(element).find(".puliselectname").html("");
							$(element).find(".plist").html("");
							$(element).find(".music_select_id").html("");
							$(element).find(".music_select_url").html("");
							$(element).find(".music_select_add").show();
							$(element).find(".music_select_exist").hide();
							$(element).find(".game_select_select").val("");
							$(element).find(".fengmianurl").val("");
							$(element).find(".music_img_input").val("");
							$(element).find(".game_music_id").html("");
							$(element).find(".game_music_url").html("");
							$(element).find(".game_music_add").show();
							$(element).find(".game_music_exist").hide();
							$(element).find(".game_music_select").val("");
							$(element).find(".game_gongju_select1").val("1");
							$(element).find(".game_gongju_select2").val("");
							$(element).find(".guanbi").show();
							$(element).find(".qiyong").hide();
							$(element).find(".music_url").val("");
							$(element).find(".music_url").prop("disabled","disabled");
							$(element).find(".fujian2Img").prop("src","");
							$(element).find(".fujian2Video").prop("src","");
							$(element).find(".pg_style").hide();
							
							$(element).find(".fujianType").val(1);
							$(element).find(".fujianType").trigger("change");
						}
					});
                	var data = JSON.parse(this.result);
                	console.log(data);
					if(data.page.length >= 1){
						
						$.each(data.page, function(index,element) {
							if(index != 0){
								var s1 = '';
								s1 += yema.replace("%num",index+1);
								$("#yemabox").append(s1);
								var s2 = '';
								s2 += bianjiyemian.replace("%order_page","");
								$("#yemaCtrBox").append(s2);
							}
								var _element = $(".yemaCtr").eq(index);
								_element.find(".textNeirong").val(element.content);
								_element.find(".page_title").val(element.page_title);
								_element.find(".order_page").val(element.order_page);
								if(element.pgtype == 1){
									_element.find(".qiyong,.pg_style").show();
									_element.find(".guanbi").hide();
									_element.find(".music_url").val(element.pgurl);
									_element.find(".music_url").removeAttr("disabled");
								}else if(element.pgtype == 2){
									_element.find(".qiyong,.pg_style").hide();
									_element.find(".guanbi").show();
									_element.find(".music_url").val(element.pgurl);
									_element.find(".music_url").prop("disabled","disabled");
								}
								_element.find(".fujianType").val(element.type);
								if(element.type != 5 && element.type != 6){
									_element.find(".fujianType").trigger("change");
								}
								
								
								if(element.type == 1){
									_element.find(".fujiandizi").val(element.url);
									_element.find(".fujian2Img").prop("src",element.url);
								}else if(element.type == 2){
									_element.find(".fujiandizi").val(element.url);
									_element.find(".fengmianurl").val(element.url1);
									_element.find(".fujian2Video").prop("src",element.url);
								}else if(element.type == 3){
									_element.find(".puliselectname").html(element.plist.name);
									_element.find(".plist").html(element.plist.id);
									_element.find(".plist_url").html(element.plist.url);
									_element.find(".fujian2Img").prop("src",element.plist.url);
								}else if(element.type == 4){
									if(element.music_det.songid){
										_element.find(".music_select_id").html(element.music_det.songid);
										_element.find(".music_select_url").html(element.music_det.music_url);
										_element.find(".music_select_body .musicName").html(element.music_det.music_name);
										_element.find(".music_select_body .musicTime").html(element.music_det.ltime);
										_element.find(".music_select_body .musicBpm").html(element.music_det.bpm);
										_element.find(".music_select_body .musicNandu").html(element.music_det.difflv);
										_element.find(".music_select_exist").show();
										_element.find(".music_select_add").hide();
									}else{
										_element.find(".music_select_exist").hide();
										_element.find(".music_select_add").show();
									}
									_element.find(".music_img_input").val(element.music_url);
									_element.find(".fujian2Img").prop("src",element.music_url);
								}else if(element.type == 5){
									_element.find(".imgvideo,.puli,.music_select,.game_type,.fujian3,.music_img,.game_music,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box").hide();
									_element.find(".game_select,.fujian2Img").show();
									var str_game = '';
									var s = '<option value="%id">%name</option>';
									$.each(element.casual_game, function(index,element2) {
										str_game += s.replace("%id",element2.id).replace("%name",element2.name);
									});
									_element.find(".game_select_select").html(str_game);
									_element.find(".game_select_select").val(element.casual_game_id);
									_element.find(".fujian2Img").prop("src","../../public/img/game"+element.casual_game_id+".png");
								}else if(element.type == 6){
									_element.find(".imgvideo,.puli,.music_select,.game_select,.fujian3,.music_img,.game_gongju,.fujian2Video,.huike_box,.zhuoye_box,.game_type,.game_music,.fujian2Img").hide();
									var str_game = '';
									var s = '<option value="%id">%name</option>';
									$.each(element.teach_game, function(index,element2) {
										str_game += s.replace("%id",element2.id).replace("%name",element2.name);
									});
									if(element.teach_game_type == 1){
										_element.find(".game_type_select").val(element.teach_game_type);
										_element.find(".game_type,.game_music,.fujian2Img").show();
										if(element.teach_game_music.songid){
											_element.find(".game_music_id").html(element.teach_game_music.songid);
											_element.find(".game_music_url").html(element.teach_game_music.music_url);
											_element.find(".game_music_body .musicName").html(element.teach_game_music.music_name);
											_element.find(".game_music_body .musicTime").html(element.teach_game_music.ltime);
											_element.find(".game_music_body .musicBpm").html(element.teach_game_music.bpm);
											_element.find(".game_music_body .musicNandu").html(element.teach_game_music.difflv);
											_element.find(".game_music_exist").show();
											_element.find(".game_music_add").hide();
										}else{
											_element.find(".game_music_exist").hide();
											_element.find(".game_music_add").show();
										}
										_element.find(".game_music_select").html(str_game);
										_element.find(".game_music_select").val(element.teach_game_id);
										_element.find(".fujian2Img").prop("src","../../public/img/game"+element.teach_game_id+".png");
									}else if(element.teach_game_type == 2){
										_element.find(".game_type_select").val(element.teach_game_type);
										_element.find(".game_type,.game_gongju,.fujian2Img").show();
										_element.find(".game_gongju_select1").val(element.teach_game_tool_type);
										_element.find(".game_gongju_select2").html(str_game);
										_element.find(".game_gongju_select2").val(element.teach_game_id);
										_element.find(".fujian2Img").prop("src","../../public/img/game"+element.teach_game_id+".png");
									}
								}else if(element.type == 7){
									
								}else if(element.type == 8){
									var s = '';
									$.each(element.task, function(index,element1) {
										var task_type_style1 = '',task_type_style2 = '',task_type_style3 ='',game='',game_status='',disabled='disabled',gamestr = '';
										var task_url = element1.task_url;
										if(element1.task_type == 1){
											task_type_style1 = 'block';
											task_type_style2 = 'none';
											task_type_style3 = 'none';
											game = 'block';
										}else if(element1.task_type == 2){
											task_type_style1 = 'none';
											task_type_style2 = 'block';
											task_type_style3 = 'none';
											game = 'none';
										}else if(element1.task_type == 3){
											task_type_style1 = 'none';
											task_type_style2 = 'none';
											task_type_style3 = 'block';
											game = 'block';
										}
										if(element1.task_game_type == 1){
											game_status = 'danxuanSelect';
											disabled = '';
										}
										if(element1.task_type == 3){
											task_url = "../../public/img/tool.png";
										}
										
										if(element1.task_game_id == 0){
											gamestr += "<option value='0' selected>所有游戏</option>";
										}else{
											gamestr += "<option value='0'>所有游戏</option>";
										}
										$.each(element1.task_game, function(index2,element2) {
											if(element2.id == element1.task_game_id){
												gamestr += "<option value='"+element2.id+"' selected>"+element2.name+"</option>";
											}else{
												gamestr += "<option value='"+element2.id+"'>"+element2.name+"</option>";
											}
										});
										s += zhuoyeStr1.replace("%task_id",element1.task_id).replace("%task_type",element1.task_type).replace("%task_url",task_url)
											.replace("%task_name",element1.task_name).replace("%task_type_style1",task_type_style1).replace("%task_type_style2",task_type_style2)
											.replace("%task_type_style3",task_type_style3).replace("%task_num",element1.task_num).replace("%game",game)
											.replace("%game_status",game_status).replace("%disabled",disabled).replace("%gamestr",gamestr);
									});
									_element.find(".zhuoye_scroll").html(s);
								}
							
						});
					}
					document.getElementById("daorufrom").reset();
                }
                reader.readAsText(file);
            }
        }
    }