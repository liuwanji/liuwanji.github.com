/*周表中上下翻动页码数*/
var _index = -1;
/*日期月课程的数组*/
var dateCourse = [];
/*日期周课表的数组*/
var dateWeek = [];
$(function() {
	addlisten();
	dataRefresh();
});

/*事件监听方法*/
function addlisten() {
	/*周和月的点击事件*/
	$("#_day").on("click", function() {
		$(this).css({
			background: "#347ffa",
			color: "#fff"
		});
		$("#_week").css({
			background: "#fff",
			color: "#347ffa"
		});
		$("#course_day").show();
		$("._top").show();
		$("#course_week").hide();
		$("._top1").hide();
	});
	$("#_week").on("click", function() {
		$(this).css({
			background: "#347ffa",
			color: "#fff"
		});
		$("#_day").css({
			background: "#fff",
			color: "#347ffa"
		});
		$("#course_week").show();
		$("._top1").show();
		$("#course_day").hide();
		$("._top").hide();
	});
	/*周和月调整对应的点击事件*/
	$("#_left").on("click", function() {
		_index--;
		var date = "";
		if(_index == 0) {
			date = thisxingqi(Math.abs(_index));
		} else if(_index < 0) {
			date = lastxingqi(Math.abs(_index));
		} else if(_index > 0) {
			date = nextxingqi(Math.abs(_index));
		}
		$("#date_year").html(date.getFullYear());
		$("#date_yue span:nth-child(1)").html(date.getMonth() + 1);
		$("#date_yue span:nth-child(2)").html(date.getDate());
		var oneday = 1000 * 60 * 60 * 24;
		var nextday = new Date(Date.parse(date) + oneday * 6);
		$("#date_yue span:nth-child(3)").html(nextday.getMonth() + 1);
		$("#date_yue span:nth-child(4)").html(nextday.getDate());
		refreshWeek(date);
	});
	$("#_left1").on("click", function() {
		var month = $("#date_yue1").html();
		var year = $("#date_year1").html();
		if(month == 1) {
			$("#date_yue1").html("12");
			$("#date_year1").html(parseInt(year) - 1)
		} else {
			$("#date_yue1").html(parseInt(month) - 1);
		}
		var date = new Date();
		date.setFullYear($("#date_year1").html());
		date.setMonth($("#date_yue1").html() - 1);
		refreshMonth(date);
	});
	$("#_right").on("click", function() {
		_index++;
		var date = '';
		if(_index == 0) {
			date = thisxingqi(Math.abs(_index));
		} else if(_index < 0) {
			date = lastxingqi(Math.abs(_index));
		} else if(_index > 0) {
			date = nextxingqi(Math.abs(_index));
		}
		$("#date_year").html(date.getFullYear());
		$("#date_yue span:nth-child(1)").html(date.getMonth() + 1);
		$("#date_yue span:nth-child(2)").html(date.getDate());
		var oneday = 1000 * 60 * 60 * 24;
		var nextday = new Date(Date.parse(date) + oneday * 6);
		$("#date_yue span:nth-child(3)").html(nextday.getMonth() + 1);
		$("#date_yue span:nth-child(4)").html(nextday.getDate());
		refreshWeek(date);
	});
	$("#_right1").on("click", function() {
		var month = $("#date_yue1").html();
		var year = $("#date_year1").html();
		if(month == 12) {
			$("#date_yue1").html("1");
			$("#date_year1").html(parseInt(year) + 1)
		} else {
			$("#date_yue1").html(parseInt(month) + 1);
		}
		var date = new Date();
		date.setFullYear($("#date_year1").html());
		date.setMonth($("#date_yue1").html() - 1);
		refreshMonth(date);
	});
}

/*数据初始化渲染方法*/
function dataRefresh() {
	if(!window.sessionStorage.token) {
		window.location.href = "../../html/login/login.html";
	}
	refresh_date();
	$("#_right").trigger("click");
	var date = new Date();
	date.setFullYear($("#date_year1").html());
	date.setMonth($("#date_yue1").html() - 1);
	refreshMonth(date);
}

/*日期初始化的方法*/
function refresh_date() {
	var nstr = new Date(); //当前Date资讯
	var ynow = nstr.getFullYear(); //年份
	var mnow = nstr.getMonth(); //月份
	$("#date_year").html(ynow);
	$("#date_yue1").html(mnow + 1);
	$("#date_year1").html(ynow);
}

/*上个星期一时间戳*/
function lastxingqi(index) {
	var today = new Date();
	today.setHours(0);
	today.setSeconds(0);
	today.setMinutes(0);
	var oneday = 1000 * 60 * 60 * 24;
	var lastMonday = new Date(today - oneday * (today.getDay() + 6 + 7 * (index - 1)));
	//	console.log(Date.parse(lastMonday)/1000);
	//	console.log(lastMonday.getFullYear()+"-"+ (lastMonday.getMonth()+1) +"-"+lastMonday.getDate());
	return lastMonday;
}

function thisxingqi() {
	var today = new Date();
	today.setHours(0);
	today.setSeconds(0);
	today.setMinutes(0);
	var oneday = 1000 * 60 * 60 * 24;
	var lastMonday = new Date(today - oneday * (today.getDay() - 1));
	return lastMonday;
}
/*下个星期一时间戳*/
function nextxingqi(index) {
	var today = new Date();
	today.setHours(0);
	today.setSeconds(0);
	today.setMinutes(0);
	var oneday = 1000 * 60 * 60 * 24;
	var lastMonday = '';
	if(today.getDate() == 0) {
		lastMonday = new Date(Date.parse(today) + oneday * (1 + 7 * (index - 1)));
	} else {
		lastMonday = new Date(Date.parse(today) + oneday * (8 - today.getDay() + 7 * (index - 1)));
	}
	//	console.log(Date.parse(lastMonday)/1000);
	//	console.log(lastMonday.getFullYear()+"-"+ (lastMonday.getMonth()+1) +"-"+);
	return lastMonday;
}
/*某年某月一号时间戳*/
function getyue(year, month) {
	var today = new Date();
	today.setFullYear(year);
	today.setMonth(month);
	today.setDate(1);
	today.setHours(0);
	today.setSeconds(0);
	today.setMinutes(0);
	//	console.log(Date.parse(today)/1000);
	//	console.log(today.getFullYear()+"-"+ (today.getMonth()+1) +"-"+today.getDate());
	return today;
}

/*日历组件初始化方法在下面*/
var kecheng = "<div class='kecheng'>" +
	"<div></div>" +
	"<div>%fromtime %class_name</div>" +
	"</div>";

function is_leap(year) {
	return(year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
} //是否为闰年

function draw_table(fromtime) {
	var table_string = ""; //日历表格字符串
	var nstr = new Date(fromtime); //当前Date资讯
	var ynow = nstr.getFullYear(); //年份
	var mnow = nstr.getMonth(); //月份
	var dnow = nstr.getDate(); //今日日期
	var n1str = new Date(ynow, mnow, 1); //当月第一天Date资讯

	var firstday = n1str.getDay(); //当月第一天星期几

	var m_days = new Array(31, 28 + is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //各月份的总天数

	var tr_str = Math.ceil((m_days[mnow] + firstday) / 7); //表格所需要行数

	//打印表格第一行（有星期标志）
	table_string += "<table id='calendar_table' cellspacing='0'><tr><th>星期日</th><th>星期一</th><th>星期二</th><th>星期三</th><th>星期四</th><th>星期五</th><th>星期六</th></tr>";

	for(var i = 0; i < tr_str; i++) { //表格的行
		table_string += "<tr>";
		for(var k = 0; k < 7; k++) { //表格每行的单元格
			var idx = i * 7 + k; //单元格自然序列号
			var date_str = idx - firstday + 1; //计算日期
			(date_str <= 0 || date_str > m_days[mnow]) ? date_str = "&nbsp;": date_str = idx - firstday + 1; //过滤无效日期（小于等于零的、大于月总天数的）
			//打印日期：今天底色为蓝色，签到过底色为粉金色
			if(date_str == dnow) {
				table_string += "<td><div class='_draw'><div class='_today'>" + date_str + "</div></div><div style='max-height:150px;overflow-y:auto;'>";
				$.each(dateCourse[date_str], function(index, element) {
					table_string += kecheng.replace("%fromtime", element.fromtime).replace("%class_name", element.class_name);
				});
				table_string += "</div></td>";
			} else {
				if(date_str != "&nbsp;") {
					table_string += "<td><div class='_draw'><div class='_aside'>" + date_str + "</div></div><div style='max-height:150px;overflow-y:auto;'>";
					$.each(dateCourse[date_str], function(index, element) {
						table_string += kecheng.replace("%fromtime", element.fromtime).replace("%class_name", element.class_name);
					});
					table_string += "</div></td>";
				} else {
					table_string += "<td><div class='_draw'><div class='_aside'>" + date_str + "</div></div></td>";
				}
			}
		}
		table_string += "</tr>";
	}
	table_string += "</table>";
	$("#course_week").html(table_string);
}

/*月表刷新方法*/
function refreshMonth(date) {
	var fromtime = Date.parse(getyue(date.getFullYear(), date.getMonth()));
	date.setMonth(date.getMonth() + 1);
	date.setDate(0);
	var day = date.getDate();
	var data = {
		dtype:1,
		day: day,
		fromtime: fromtime / 1000,
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "curriculum/bytime?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			dateCourse = msg.data;
			console.log(dateCourse);
			draw_table(fromtime);
		} else {
			alert(msg.msg);
		}
	});
}
/*周表刷新方法*/
function refreshWeek(date) {
	var data = {
		dtype:2,
		day: 7,
		fromtime: Date.parse(date) / 1000,
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "curriculum/bytime?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			var _head = '<th></th>';
				_head += "<th>星期一 "+(date.getMonth()+1)+"/"+(date.getDate())+"</th>";
				_head += "<th>星期二 "+((new Date(Date.parse(date)+3600*24*1000)).getMonth()+1)+"/"+((new Date(Date.parse(date)+3600*24*1000)).getDate())+"</th>";
				_head += "<th>星期三 "+((new Date(Date.parse(date)+3600*24*1000*2)).getMonth()+1)+"/"+((new Date(Date.parse(date)+3600*24*1000*2)).getDate())+"</th>";
				_head += "<th>星期四 "+((new Date(Date.parse(date)+3600*24*1000*3)).getMonth()+1)+"/"+((new Date(Date.parse(date)+3600*24*1000*3)).getDate())+"</th>";
				_head += "<th>星期五 "+((new Date(Date.parse(date)+3600*24*1000*4)).getMonth()+1)+"/"+((new Date(Date.parse(date)+3600*24*1000*4)).getDate())+"</th>";
				_head += "<th>星期六 "+((new Date(Date.parse(date)+3600*24*1000*5)).getMonth()+1)+"/"+((new Date(Date.parse(date)+3600*24*1000*5)).getDate())+"</th>";
				_head += "<th>星期日 "+((new Date(Date.parse(date)+3600*24*1000*6)).getMonth()+1)+"/"+((new Date(Date.parse(date)+3600*24*1000*6)).getDate())+"</th>";
			$.each(msg.data, function(index,element) {
				var _time = '';
				if(parseInt(index/3600) < 10){
					_time += "0"+parseInt(index/3600)+":";
				}else{
					_time += parseInt(index/3600)+":";
				}
				if(parseInt(index%3600/60) < 10){
					_time += "0"+parseInt(index%3600/60);
				}else{
					_time += parseInt(index%3600/60);
				}
				s += "<tr><td>"+_time+"</td>";
				$.each(element, function(index,element1) {
					s += "<td><div style='max-height:150px;overflow-y:auto;'>";
					$.each(element1, function(index,element2) {
						s += "<div class='yuan'><div></div>"+element2.class_name+"</div>";
					});
					s += "</div></td>";
				});
				s += "</tr>";
			});
			$("#weekHead").html(_head);
			$("#weekDate").html(s);
		} else {
			alert(msg.msg);
		}
	});
}
