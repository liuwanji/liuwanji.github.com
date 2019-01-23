var fs = require("fs");
var url = require("url");
var path = require("path");
var express = require('express');
var app = express();
var querystring = require('querystring');
var request = require('request');
var _url = 'http://118.31.174.57:5000';

app.get('/',function(req,res){
	res.redirect(302, 'http://127.0.0.1:5123/html/index/index.html');
});

app.get('/*', function(req, res) {
	//得到用户路径
	var pathname = url.parse(req.url).pathname;

	//拓展名
//	console.log(pathname);
	var extname = path.extname(pathname);
	res.sendFile(__dirname + "/" + pathname);

});

app.post("/api/*", function(req, res) {
	var data = '';
	req.on('data', function(chunk) {
		data += chunk;
	});
	req.on('end', function() {
		data = decodeURI(data);
		var pathname = url.parse(req.url).pathname.replace("/api","");
		getCurlData(_url+pathname,data,res);
	});
});

app.listen(5123, function() {
	console.log('音乐项目的后端管理系统!');
});

function getCurlData(url, param, res) {
	console.log(url);
	request.post(
		url,
		param,
		function(error, response, body) {
			if(error) {
				console.log(error);
			}else{
				if(response.statusCode == 200) {
					console.log(param);
					res.writeHead(200, {
						"Content-type": "application/json"
					});
					res.end(body);
				} else {
					console.log(response.statusCode);
				}
			}
		}
	);

}