/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;
/*上课成员样式字符串*/
var chengyuan = "<div class='xueyuanImg1'>"+
							"<div style='background:url(%img) no-repeat center/100% 100%'>"+
							"<div class='removeXueyuan1'>-</div>"+
							"</div>"+
							"<div>%name</div>"+
							"<div style='display:none'>%stuid</div>"+
						"</div>";
/*校区列表样式字符串*/
var xiaoqu = "<tr>"+
								"<td>%schid</td>"+
								"<td>%ctime</td>"+
								"<td>%schname</td>"+
								"<td>%manager</td>"+
								"<td>%tel</td>"+
								"<td>%versions</td>"+
								"<td>%etime</td>";
var xiaoqu1 = "<td class='daishenghe'>待审核</td>"+
								"<td>"+
									"<div class='toTongguo' style='margin-right:10px;'>通过</div>"+
									"<div class='toJujue'>拒绝</div>"+
								"</td>"+
							"</tr>";
var xiaoqu2 = "<td class='butongguo'>不通过</td>"+
								"<td><div class='toTongguo'>通过</div></td>"+
							"</tr>";
var xiaoqu3 = "<td class='tongguo'>正常使用</td>"+
								"<td><div class='tobianji'>编辑</div></td>"+
							"</tr>";
var xiaoqu4 = "<td style='color:red;'>到期</td>"+
								"<td><div class='tobianji'>编辑</div></td>"+
							"</tr>";
var xiaoqu5 = "<td style='color:red;'>禁用</td>"+
								"<td><div class='tobianji'>编辑</div></td>"+
							"</tr>";
/*新增班级中班级类型*/
var banji_type = 0;
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
	/*校区申请编辑的点击事件*/
	$("#campusBody").on("click",".tobianji",function() {
		var schid = $(this).parent().parent().find("td:nth-child(1)").html();
		editCampusDet(schid);
		return false;
	});
	$("#close_bjxq,#quxiao").on("click", function() {
		$("#bjxqShadow").animate({opacity: '0'}, 400);
		$("#bjxqMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#bjxq").hide();
		});
		return false;
	});
	/*待审核通过不通过点击事件*/
	$("#campusBody").on("click", ".toTongguo,.toJujue",function() {
		var schid = $(this).parent().parent().find("td:nth-child(1)").html();
		detCampus(schid);
		return false;
	});
	$("#close_xqsq").on("click", function() {
		$("#xqsqShadow").animate({opacity: '0'}, 400);
		$("#xqsqMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xqsq").hide();
		});
		return false;
	});
	/*校区预览的点击事件*/
	$("#campusBody").on("click","tr",function(){
		var schid = $(this).find("td:nth-child(1)").html();
		campusDet(schid);
//		$("#xqxq").show();
//		$("#xqxqShadow").animate({opacity: '0.3'}, 400);
//		$("#xqxqMain").animate({top: '10%',opacity: '1'}, 400);
		return false;
	});
	$("#close_xqxq").on("click", function() {
		$("#xqxqShadow").animate({opacity: '0'}, 400);
		$("#xqxqMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xqxq").hide();
		});
		return false;
	});
	/*班级名称的输入监听事件*/
	$("#addName").on("input", function() {
		var _length = $(this).val().length;
		if(_length > 20) {
			$("#addNameNum span:nth-child(1)").html(_length).css({
				color: "red"
			});
		} else {
			$("#addNameNum span:nth-child(1)").html(_length).css({
				color: "#888"
			});
		}
	});

	/*编辑弹窗中添加学员按钮和删除按钮的点击事件*/
	/*添加学员都在上面的监听事件中*/
	$("#xiangche").on("click", ".removeXueyuan", function() {
		var _this = $(this).parent().parent();
		_this.hide("200", function() {
			_this.remove();
		});
	});

	/*我要参与中选择照片的点击事件*/
	$('#imgInput').change(function() {
		readURL(this, $("#studentImg"));
	});
	$('#imgInput1').change(function() {
		readURL(this, $("#studentImg1"));
	});
	/*监听筛选输入触发搜索*/
	$("#classess_select2").on("change",function(){
		chaxun(1);
	});
	/*清空的方法*/
	$("#_clear").on("click", function() {
		$("#classess_input1").val("");
		$("#classess_select2").val("0");
		$("#datetime1").val("");
		$("#datetime2").val("");
		chaxun(1);
	});
	/*输入框聚焦的事件*/
	laydate.render({
	  elem: '#datetime1' //指定元素
	   ,eventElem: '#dateFocus1'
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
	  	var etime = $("#datetime2").val();
	  	var btime = Date.parse(value);
	  	if(etime != ''){
	  		etime = Date.parse(etime);
	  		if(btime > etime){
	  			$("#datetime1").val("");
	  			alert("开始时间不能大于截止时间!");
	  			return false;
	  		}
	  	}
	  	chaxun(1);
	  }
	});
	laydate.render({
	  elem: '#datetime2' //指定元素
	   ,eventElem: '#dateFocus2'
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
	  	var btime = $("#datetime1").val();
	  	var etime = Date.parse(value);
	  	if(btime != ''){
	  		btime = Date.parse(btime);
	  		if(btime > etime){
	  			$("#datetime2").val("");
	  			alert("开班时间不能大于截止时间!");
	  			return false;
	  		}
	  	}
	  	chaxun(1);
	  }
	});
	laydate.render({
	  elem: '#etime' //指定元素
	  ,eventElem: '#etimeImg'
	  ,trigger: 'click'
	});
	laydate.render({
	  elem: '#etime1' //指定元素
	  ,eventElem: '#etime1Img'
	  ,trigger: 'click'
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
	/*给定查询的初始化条件*/
	var date = new Date();
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	var starttime = formatDate(date);
	var endtime = formatDate(new Date(Date.parse(date) +  3600 * 24 * 1000));
	$("#datetime1").val(starttime);
	$("#datetime2").val(endtime);
	chaxun(1);
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


/*格式化时分时间为时间戳*/
function times(date){
	var time1 = parseInt(date.slice(0,2));
	var time2 = parseInt(date.slice(3,6));
	return time1*3600+time2*60;
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

/*类型一搜索或切换每页显示时页码变换方法*/
function changePage(){
		num_all = $("#all_num").html();
		num_curr = $("#curr_num").val();
		$("#fenye_num").off("click", "div");
		$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
		yema_suanfa(num_all, num_curr);
}
/*校区申请中查询按钮的点事件*/
function chaxun(type) {
	var schname = $("#classess_input1").val();
	var status = $("#classess_select2").val();
	var btime = $("#datetime1").val();
	var etime = $("#datetime2").val();
	if(btime != ''){
		btime = new Date(btime);
		btime.setHours(0);
		btime = Date.parse(btime) / 1000;
	}else{
		btime = 0;
	}
	if(etime != ''){
		etime = new Date(etime);
		etime.setHours(0);
		etime = Date.parse(etime) / 1000;
	}else{
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        etime = Date.parse(date) +  365 * 3600 * 24 * 1000;
	}
	var page = '';
	if(type == 1) {
		page = 1;
	} else if(type == 2) {
		page = page_num;
	} else {
		page = $("#curr_input").val();
	}
	var data = {
		schname: schname,
		status: parseInt(status),
		btime: btime,
		etime: etime,
		paixuname:paixuname,
		paixutype:paixutype,
		page: parseInt(page),
		size: parseInt($("#curr_num").val()),
		nocheck:0,
		total:0
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "organization/select?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			var tetime ='';
			$.each(msg.data.info, function(index,element) {
				var versions = '';
				if(element.versions == 0){
					versions = "全部";
				}else if(element.versions == 1){
					versions = "试用版";
				}else if(element.versions == 2){
					versions = '基础版';
				}
                tetime =formatDate(element.etime*1000);
                if(element.etime ==0){
                    tetime = "暂无";
                }

				s += xiaoqu.replace("%schid",element.schid).replace("%ctime",formatDate(element.ctime*1000)).replace("%schname",element.schname)
				.replace("%manager",element.manager).replace("%tel",element.tel).replace("%versions",versions).replace("%etime",tetime);
				if(element.status == 1||element.status == 0){
					s += xiaoqu1;
				}else if(element.status == 2){
					s += xiaoqu2;
				}else if(element.status == 3){
					s += xiaoqu3;
				}else if(element.status == 4){
					s += xiaoqu4;
				}
			});
			$("#campusBody").html(s);
			if(type == 1) {
				$("#all_num,#countNum").html(msg.data.total);
				$("#noCourse").html(msg.data.nocheck);
				changePage();
			}
		} else {
			alert(msg.msg);
		}
	});
}

/*校区申请中详情方法*/
function detCampus(schid){
	clearCampus();
	var data ={
		schid:schid,
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "organization/approveinfo?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			$("#schid").html(schid);
			$("#sqrq").html(formatDate(msg.data.ctime*1000));
			$("#jgmc").val(msg.data.schname);
			
			$("#addr").val(msg.data.addr);
			$("#guanliyuan").val(msg.data.manager);
			$("#tel").val(msg.data.tel);
			$("#sqbb").val(msg.data.versions);
			$("#etime").val(formatDate(msg.data.etime*1000));
			
			$("#xqsq").show();
			$("#xqsqShadow").animate({opacity: '0.3'}, 400);
			$("#xqsqMain").animate({top: '25%',opacity: '1'}, 400);
			
			addressInit('prov', 'city', 'country',msg.data.province,msg.data.city,msg.data.area);
		}else{
			alert(msg.msg);
		}
	});
}

/*清空校区申请信息*/
function clearCampus(){
	$("#schid").html("");
	$("#sqrq").html('');
	$("#jgmc").val('');
//	$("#prov").val("0"); 
//	$("#city").val("0"); 
//	$("#country").val("0"); 
	$("#addr").val("");
	$("#guanliyuan").val("");
	$("#tel").val("");
	$("#sqbb").val("1");
	$("#etime").val("");
}
/*清空编辑校区信息*/
function clearEdit(){
	$("#schid1").html("");
	$("#sqrq1").html('');
	$("#jgmc1").val('');
//	$("#prov1").val("0"); 
//	$("#city1").val("0"); 
//	$("#country1").val("0"); 
	$("#addr1").val("");
	$("#guanliyuan1").val("");
	$("#tel1").val("");
	$("#jyfw1").val("");
	$("#jgjj1").val("");
	$("#sqbb1").val("1");
	$("#etime1").val("");
	$("#zhzt").val("");
	$("#studentImg").prop("src","");
	$("#studentImg1").prop("src","");
}

/*校区审核通过或不通过事件*/
function Toexamine(type){
	var schid = $("#schid").html();
	var schname = $("#jgmc").val();
	var province = $("#prov option:selected").text(); 
	var city = $("#city option:selected").text(); 
	var area = $("#country option:selected").text(); 
	var addr = $("#addr").val();
	var manager = $("#guanliyuan").val();
	var tel = $("#tel").val();
	var range = '';
	var des = '';
	var versions = $("#sqbb").val();
	var etime = $("#etime").val();
	var status = type;
	if(versions == ''||etime == ''){
		alert("请输入完整!");
		return false;
	}
	var data ={
		schid:parseInt(schid),
		schname:schname,
		province:province,
		city:city,
		area:area,
		addr:addr,
		manager:manager,
		tel:tel,
		range:range,
		des:des,
		versions:parseInt(versions),
		etime:parseInt(Date.parse(etime))/1000,
		status:parseInt(status)
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "organization/approve?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_post(url,"logo=license=&photo=[]",function(msg) {
		console.log(msg);
		if(msg.status == 0){
			chaxun(1);
			$("#xqsqShadow").animate({opacity: '0'}, 400);
			$("#xqsqMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#xqsq").hide();
			});
			setTimeout(function(){
				alert("审核成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}

/*编辑校区详情方法*/
function editCampusDet(schid){
	clearEdit();
	var data ={
		schid:schid,
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "organization/approveinfo?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			$("#schid1").html(schid);
			$("#sqrq1").html(formatDate(msg.data.ctime*1000));
			$("#jgmc1").val(msg.data.schname);
			$("#addr1").val(msg.data.addr);
			$("#guanliyuan1").val(msg.data.manager);
			$("#tel1").val(msg.data.tel);
			$("#jyfw1").val(msg.data.range);
			$("#jgjj1").val(msg.data.des);
			$("#sqbb1").val(msg.data.versions);
			$("#etime1").val(formatDate(msg.data.etime*1000));
			$("#zhzt").val(msg.data.status);
			$("#studentImg").prop("src",msg.data.logo);
			$("#studentImg1").prop("src",msg.data.license);
			
			$("#bjxq").show();
			$("#bjxqShadow").animate({opacity: '0.3'}, 400);
			$("#bjxqMain").animate({top: '10%',opacity: '1'}, 400);
			
			addressInit('prov1', 'city1', 'country1',msg.data.province,msg.data.city,msg.data.area);
		}else{
			alert(msg.msg);
		}
	});
}

/*编辑校区方法*/
function editCampus(){
	var schid = $("#schid1").html();
	var schname = $("#jgmc1").val();
	var province = $("#prov1 option:selected").text(); 
	var city = $("#city1 option:selected").text(); 
	var area = $("#country1 option:selected").text(); 
	var addr = $("#addr1").val();
	var manager = $("#guanliyuan1").val();
	var tel = $("#tel1").val();
	var range = $("#jyfw1").val();
	var des = $("#jgjj1").val();
	var versions = $("#sqbb1").val();
	var etime = $("#etime1").val();
	var status = $("#zhzt").val();
	if(versions == ''||etime == ''||schname==''||addr1 == ''||!province||!city||!area||manager==''||tel==''){
		alert("请输入完整!");
		return false;
	}
	var logo_ext = '';
	var logo = $("#studentImg").attr("src");
	if(logo == ''){
		alert("请上传机构logo!");
		return false;
	}else{
		logo_ext = logo.split(",")[0].split("/")[1].split(";")[0];
		console.log(logo_ext);
		logo =logo.split(",")[1];
		if(!logo){
			logo = '';
		}else{
			logo = encodeURIComponent(logo);
		}
	}
	var license_ext = '';
	var license = $("#studentImg1").attr("src");
	if(license == ''){
		alert("请上传营业执照!");
		return false;
	}else{
		license_ext = license.split(",")[0].split("/")[1].split(";")[0];
		console.log(license_ext);
		license =license.split(",")[1];
		if(!license){
			license = '';
		}else{
			license = encodeURIComponent(license);
		}
	}
	var data ={
		schid:parseInt(schid),
		schname:schname,
		province:province,
		city:city,
		area:area,
		addr:addr,
		manager:manager,
		tel:tel,
		range:range,
		des:des,
		versions:parseInt(versions),
		etime:parseInt(Date.parse(etime))/1000,
		status:parseInt(status)
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "organization/approve?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_post(url,"logo="+logo+"&license="+license+"&photo=[]&logo_ext="+logo_ext+"&license_ext="+license_ext,function(msg) {
		console.log(msg);
		if(msg.status == 0){
			chaxun(1);
			$("#bjxqShadow").animate({opacity: '0'}, 400);
			$("#bjxqMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#bjxq").hide();
			});
			setTimeout(function(){
				alert("编辑成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}

/*tr点击弹出校区详情方法*/
function campusDet(schid){
	var data ={
		schid:schid,
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "organization/approveinfo?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			var versions = "";
			if(msg.data.versions == 1){
				versions = "试用版";
			}else if(msg.data.versions == 2){
				versions = "基础版";
			}
			var status = '';
			if(msg.data.status == 0){
				status = "<div style='color:#00ad5f;'>全部</div>";
			}else if(msg.data.status == 1){
				status = "<div style='color:#f9bd46;'>未审核</div>";
			}else if(msg.data.status == 2){
				status = "<div style='color:red;'>不通过</div>";
			}else if(msg.data.status == 3){
				status = "<div style='color:#00ad5f;'>正常使用</div>";
			}else if(msg.data.status == 4){
				status = "<div style='color:red;'>到期</div>";
			}else if(msg.data.status == 1){
				status = "<div style='color:red;'>禁用</div>";
			}
			$("#schid2").html(schid);
			$("#sybb2").html(versions);
			$("#kssj2").html(formatDate(msg.data.ztime*1000));
			$("#dqsj2").html(formatDate(msg.data.etime*1000));
			$("#zhzt2").html(status);
			$("#jgmc_top").html(msg.data.schname);
			$("#jgmc2").html(msg.data.schname);
			$("#jgdz2").html(msg.data.province+msg.data.city+msg.data.area+msg.data.addr);
			$("#guanliyuan2").html(msg.data.manager);
			$("#tel2").html(msg.data.tel);
			$("#jyfw2").html(msg.data.range);
			$("#jgjj2").html(msg.data.des);
			$("#logo").prop("src",msg.data.logo);
			$("#yyzz2").prop("src",msg.data.license);
			
			$("#jssl").html(msg.data.classroom);
			$("#rkls").html(msg.data.teacher);
			$("#lszs").html(msg.data.teacherAll);
			$("#dqsl").html(msg.data.class);
			$("#lsbj").html(msg.data.classAll);
			$("#lsks").html(msg.data.course);
			$("#jcmb").html(msg.data.textbook);
			$("#qktj").html(msg.data.music);
			$("#dqxs").html(msg.data.stuNum);
			$("#lsxs").html(msg.data.stuAll);
			
			$("#xqxq").show();
			$("#xqxqShadow").animate({opacity: '0.3'}, 400);
			$("#xqxqMain").animate({top: '10%',opacity: '1'}, 400);
		}else{
			alert(msg.msg);
		}
	});
}

/*去编辑的方法*/
function tobianji(){
	$("#xqxqShadow").animate({opacity: '0'}, 400);
	$("#xqxqMain").animate({top: '0%',opacity: '0'}, 400, function() {
		$("#xqxq").hide();
	});
	editCampusDet($("#schid2").html());
}


/*排序的点击事件方法*/
function paixu(type1,type2){
	paixuname = type1;
	paixutype = type2;
	chaxun(1);
}