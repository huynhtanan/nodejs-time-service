var express = require('express');
var http = require('http');
var app = express();
var fs = require("fs");
var dateFormat = require('dateformat');
var request = require('request');
var moment=require("moment");
var xml2js=require("xml2js");

app.get('/:timezone', function (req, res) { 
	request("http://www.time.gov/actualtime.cgi??lzbc=siqm9b", function(error, response, body) {
		var parseString = xml2js.parseString;
		var xml = body;
		parseString(xml, function (err, result) {
			var formatTime = result.timestamp.$.time / 1000.0;
			var date=new Date(formatTime);
			var tz=Number(req.params.timezone);
			var tzstr=tz>0?"GMT+"+tz:"GMT"+tz;
			date.setHours(date.getHours()+tz);
			res.send({ date: get2DegitFormatString(date.getUTCDate())+"/"+get2DegitFormatString((date.getUTCMonth()+1))+"/"+date.getUTCFullYear()+" "+get2DegitFormatString(date.getUTCHours())+":"+get2DegitFormatString(date.getUTCMinutes())+":"+get2DegitFormatString(date.getUTCSeconds()), timezone: tzstr });
		});
	});
})
function get2DegitFormatString(num){
	if(num<10)
		return "0"+num;
	return num;
}
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Node.js is started...")

})