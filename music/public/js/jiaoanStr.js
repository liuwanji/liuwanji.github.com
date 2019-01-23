/*编辑页面中新增页面的字符串样式*/
var bianjiyemian = "<div class='yemaCtr' style='display:none;'>" +
//	"<textarea rows='20' cols='20' class='textNeirong'></textarea>" +
	"<div class='yemainputBox'>"+
							"<div class='yemainput'>"+
								"<div>页面标题</div>"+
								"<div style='width:250px;'>"+
									"<input class='page_title' type='text' maxlength='30'/>"+
									"<div><span style='color:red;'>* </span>30个字以内</div>"+
								"</div>"+
							"</div>"+
							"<div class='yemainput' style='float: right;'>"+
								"<div>页面标签</div>"+
								"<div>"+
									"<input class='order_page' type='text' value='%order_page' maxlength='6'/>"+
									"<div><span style='color:red;'>* </span>6个字以内</div>"+
								"</div>"+
							"</div>"+
						"</div>"+
	"<div class='fujian1'>" +
	"<div>附件类型</div>" +
	"<div>" +
	"<select class='fujianType'>" +
	"<option value='1'>图片</option>" +
	"<option value='2'>视频</option>" +
	"<option value='3'>谱例</option>" +
	"<option value='4'>歌曲</option>" +
	"<option value='5'>休闲游戏</option>" +
	"<option value='6'>教学游戏</option>" +
	"<option value='7'>回课</option>" +
	"<option value='8'>作业</option>" +
	"</select>" +
	"</div>" +
	"<div class='imgvideo'>" +
	"<div>附件地址</div>" +
	"<div>" +
	"<input type='text' class='fujiandizi'/>" +
	"<img class='addclose' src='../../public/img/close.png'/>" +
	"</div>" +
	"<div class='yulan'>预览</div>" +
	"</div>" +
	"<div class='puli' style='display: none;'>" +
	"<div>谱例选择</div>" +
	"<div>" +
	"<div class='puliselectname'></div>" +
	"<img class='qiehuanpuli' src='../../public/img/tihuan.png'/>" +
	"<div class='plist' style='display: none;'></div>" +
	"<div class='plist_url' style='display: none;'></div>"+
	"</div>" +
	"</div>" +
	"<div class='music_select'>"+
								"<div>歌曲选择</div>"+
								"<div class='music_select_add'>+添加曲目歌曲</div>"+
								"<div class='music_select_exist' style='display: none;'>"+
									"<div class='music_select_id' style='display: none;'></div>"+
									"<div class='music_select_url' style='display: none;'></div>"+
									"<div class='music_select_body'>"+
										"<img src='../../public/img/music1.png'>"+
										"<div style='margin-right: 10px;float: left;' class='musicName'>Falling Crazy in Love - Jessica</div>"+
										"<img src='../../public/img/time.png'>"+
										"<span style='margin-right: 10px;' class='musicTime'>120秒</span>"+
										"<img src='../../public/img/BPMicon.png' style='margin-top: 9px;'>"+
										"<span style='margin-right: 10px;' class='musicBpm'>999</span>"+
										"<img src='../../public/img/nandu.png' style='margin-top: 9px;'>"+
										"<span style='margin-right: 10px;' class='musicNandu'>难度10</span>"+
									"</div>"+
									"<img class='music_select_qiehuan' src='../../public/img/tihuan.png' />"+
								"</div>"+
							"</div>"+
							"<div class='game_type'>"+
								"<div>游戏类型</div>"+
								"<div>"+
									"<select class='game_type_select'>"+
										"<option value='1'>歌曲</option>"+
										"<option value='2'>小工具</option>"+
									"</select>"+
								"</div>"+
							"</div>"+
							"<div class='game_select'>"+
								"<div>游戏选择</div>"+
								"<select class='game_select_select'>"+
									"<option value='' style='display: none;' selected='selected'>请选择游戏</option>"+
								"</select>"+
								"<div class='game_select_yulan'>预览</div>"+
							"</div>"+
	"</div>" +
	"<div class='fujian3'>"+
							"<div>"+
								"<div>封面地址</div>"+
								"<div>"+
									"<input type='text' class='fengmianurl'/>"+
									"<img class='addclose1' src='../../public/img/close.png'/>"+
								"</div>"+
							"</div>"+
						"</div>"+
						"<div class='music_img'>"+
							"<div>"+
								"<div>图片地址</div>"+
								"<div>"+
										"<input type='text' class='music_img_input' placeholder='请输入图片地址'/>"+
								"</div>"+
								"<div class='music_img_yulan'>预览</div>"+
							"</div>"+
						"</div>"+
						"<div class='game_music'>"+
							"<div>"+
								"<div>歌曲选择</div>"+
								"<div class='game_music_add'>+添加曲目歌曲</div>"+
								"<div class='game_music_exist' style='display: none;'>"+
									"<div class='game_music_id' style='display: none;'></div>"+
									"<div class='game_music_url' style='display: none;'></div>"+
									"<div class='game_music_body'>"+
										"<img src='../../public/img/music1.png'>"+
										"<div style='margin-right: 10px;float: left;' class='musicName'>Falling Crazy in Love - Jessica</div>"+
										"<img src='../../public/img/time.png' style='display: none;'>"+
										"<span style='margin-right: 10px;display: none;' class='musicTime'>120秒</span>"+
										"<img src='../../public/img/BPMicon.png' style='margin-top: 9px;'>"+
										"<span style='margin-right: 10px;' class='musicBpm'>999</span>"+
										"<img src='../../public/img/nandu.png' style='margin-top: 9px;display: none;'>"+
										"<span style='margin-right: 10px;display: none;' class='musicNandu'>难度10</span>"+
									"</div>"+
									"<img class='game_music_qiehuan' src='../../public/img/tihuan.png' />"+
								"</div>"+
							"</div>"+
							"<div>"+
								"<div>游戏选择</div>"+
								"<select class='game_music_select'>"+
									"<option value='' style='display: none;' selected='selected'>请选择游戏</option>"+
								"</select>"+
								"<div class='game_music_yulan'>预览</div>"+
							"</div>"+
						"</div>"+
						"<div class='game_gongju'>"+
							"<div>"+
								"<div>工具类型</div>"+
								"<select class='game_gongju_select1'>"+
									"<option value='1' selected='selected'>节拍器</option>"+
								"</select>"+
							"</div>"+
							"<div>"+
								"<div>游戏选择</div>"+
								"<select class='game_gongju_select2'>"+
									"<option value='' style='display: none;' selected='selected'>请选择游戏</option>"+
								"</select>"+
								"<div class='game_gongju_yulan'>预览</div>"+
							"</div>"+
						"</div>"+
						
						
						"<div class='yemianHelp'>"+
							"<div>"+
								"<div>PG助手</div>"+
								"<div class='qiyong' style='display: none;'>"+
									"<div class='qiyong_zhi'>启用</div>"+
									"<div class='qiyong_yuan'></div>"+
								"</div>"+
								"<div class='guanbi'>"+
									"<div class='guanbi_zhi'>关闭</div>"+
									"<div class='guanbi_yuan'></div>"+
								"</div>"+
							"</div>"+
							"<div>"+
								"<div>音频地址</div>"+
								"<div>"+
									"<input type='text' class='music_url' disabled='disabled'>"+
								"</div>"+
							"</div>"+
						"</div>"+
	"<div class='fujian2'>" +
	"<img class='fujian2Img' src=''/>" +
	"<img class='pg_style' src='../../public/img/pg.png'>"+
	"<video class='fujian2Video' src='' controls='controls'>您的浏览器不支持video标签</video>" +
	"<div class='huike_box' style='display: none;'>"+
								"<div>课程回顾将根据上节作业自动生成</div>"+
								'<div>请您点击右上角 "<div class="jiahao">+</div>" 继续添加本节课内容。</div>'+
							"</div>"+
							"<div class='zhuoye_box' style='display: none;'>"+
								"<div class='zhuoye1'>"+
									"<div></div>"+
									"<div>选择作业</div>"+
								"</div>"+
								"<div class='zhuoye_scroll'></div>"+
							"</div>"+
	"</div>" +
	"</div>";

var zhuoyeStr = 					"<div class='zhuoye_list'>"+
										"<div class='task_id' style='display: none;'>%task_id</div>"+
										"<div class='task_type' style='display: none;'>%task_type</div>"+
										"<div class='public_duoxuan zhuoye_style1'><img src='../../public/img/login_tip.png'/></div>"+
										"<div class='zhuoye_style2'  style='background:url(%task_url) no-repeat center/auto 100%;'></div>"+
										"<div class='zhuoye_style3'>"+
											"<div class='task_name'>%task_name</div>"+
											"<div class='task_type_style1' style='display:%task_type_style1;'>歌曲</div>"+
											"<div class='task_type_style2' style='display:%task_type_style2;'>谱例</div>"+
											"<div class='task_type_style3' style='display:%task_type_style3;'>小工具</div>"+
										"</div>"+
										"<div class='zhuoye_style4' style='display:none;'>"+
											"<div>练习次数</div>"+
											"<div class='task_zhujian'>"+
												"<div class='task_jian'>-</div>"+
												"<div class='task_num'>%task_num</div>"+
												"<div class='task_jia'>+</div>"+
											"</div>"+
										"</div>"+
//										"<div class='danxuan zhuoye_style5' style='display:%game;float:right;'>"+
//											"<div></div>"+
//											"<div>开启游戏模式</div>"+
//										"</div>"+
										"<div style='float:right;display:%game;'>"+
											"<div class='danxuan zhuoye_style5' style='float:left;'>"+
												"<div></div>"+
												"<div>开启游戏模式</div>"+
											"</div>"+
											"<select class='work_game_select' disabled='disabled'>"+
												"<option value='0'>所有游戏</option>"+
											"</select>"+
										"</div>"+
									"</div>";
									
var zhuoyeStr1 = 					"<div class='zhuoye_list zhuoye_list_selected'>"+
										"<div class='task_id' style='display: none;'>%task_id</div>"+
										"<div class='task_type' style='display: none;'>%task_type</div>"+
										"<div class='public_duoxuan zhuoye_style1'><img style='display: inline;' src='../../public/img/login_tip.png'/></div>"+
										"<div class='zhuoye_style2' style='background:url(%task_url) no-repeat center/auto 100%;'></div>"+
										"<div class='zhuoye_style3'>"+
											"<div class='task_name'>%task_name</div>"+
											"<div class='task_type_style1' style='display:%task_type_style1;'>歌曲</div>"+
											"<div class='task_type_style2' style='display:%task_type_style2;'>谱例</div>"+
											"<div class='task_type_style3' style='display:%task_type_style3;'>小工具</div>"+
										"</div>"+
										"<div class='zhuoye_style4' style='display:none;'>"+
											"<div>练习次数</div>"+
											"<div class='task_zhujian'>"+
												"<div class='task_jian'>-</div>"+
												"<div class='task_num'>%task_num</div>"+
												"<div class='task_jia'>+</div>"+
											"</div>"+
										"</div>"+
										"<div style='float:right;display:%game;'>"+
											"<div class='danxuan zhuoye_style5' style='float:left;'>"+
												"<div class='%game_status'></div>"+
												"<div>开启游戏模式</div>"+
											"</div>"+
											"<select class='work_game_select' %disabled>"+
												"%gamestr"+
											"</select>"+
										"</div>"+
									"</div>";
