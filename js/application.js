// JavaScript Document

function getStation() {
	if ($('#sname').val() == '') {
		alert('站台名称不能为空哦！');
		return false;
	}
	var sname = $('#sname').val();
	$.ajax({
		url: 'http://220.191.224.176/server-ue2/rest/busStations/simple/330600/' + sname + '/0/200',
		type: 'get',
		dataType: 'json',
		async: false,
		jsonp: 'callback',
		jsonpCallback: '_Callback',
		success: function (json) {
			if (json.status.code != 0) {
				alert(json.status.msg + '\n错误特征码：' + json.status.code);
				return false;
			}
			var html = '';
			$.each(json.result.result, function (index, data) {
				if (data.busLineList.length == 0) {
					console.log('Query successfully.');
					return false;
				}
				var busNum = 'Line' + data.busLineList[0].lineName.replace(/[^0-9]/g, '');
				var busId = data.busLineList[0].id;
				var startSName = data.busLineList[0].startStationName;
				var endSName = data.busLineList[0].endStationName;
				html += '<div class="col-sm-4 text-center"><h4>' + busNum + '</h4><p>' + startSName + '——' + endSName + '</p><button type="button" class="btn btn-success btn-sm" onclick="openLineDetail(\'' + busId + '\')">显示详情</button></div>';
			});
			$('#StationInformation').html(html);
		},
		error: function () {
			alert('异步通信失败，可能您的浏览器开启了同源保护策略！');
			return false;
		}
	});
}

/**
 * 线路详情页面传送过程
 * @param {integer} line_id 线路ID
 * @return null
 */
function openLineDetail(line_id) {
	location.href = './LineInformation.html?busId=' + line_id;
}

/**
 * 通过ID查询公交线路详情
 * @param {integer} bus_id 传入线路ID
 * @return string 返回数据
 */
function getBusLinesById(bus_id) {
	$.ajax({
		url: 'http://220.191.224.176/server-ue2/rest/buslines/330600/' + bus_id,
		type: 'get',
		dataType: 'json',
		async: false,
		jsonp: 'callback',
		jsonpCallback: '_Callback',
		success: function (json) {
			if (json.status.code != 0) {
				alert(json.status.msg + '\n错误特征码：' + json.status.code);
				return false;
			}
			var LineNumber = json.result.lineName.replace(/[^0-9]/g, '');
			var html = '<div class="col-sm-12 text-left"><h3>Line ' + LineNumber + '</h3><hr><p>【起始站】 <strong><span style="color: #ff0000">-></span></strong> ';
			$.each(json.result.stations, function (index, data) {
				var SName = data.stationName;
				html += '<a href="./StationOfBusQuery.html?SName=' + SName + '" target="_self">' + SName + '</a> <strong><span style="color: #ff0000">-></span></strong> ';
			});
			var BusOwner = json.result.owner;
			if (BusOwner == '') {
				BusOwner = '暂无'
			}
			var BusTicketPrice = json.result.ticketPrice;
			if (BusTicketPrice == '') {
				BusTicketPrice = '暂无';
			}
			html += '【终点站】</p><hr><h4>票价：￥' + BusTicketPrice + '<h4><h4>隶属公交公司：' + BusOwner + '<h4></div>';
			$('#LineInformation').html(html);
		},
		error: function () {
			alert('异步通信失败，可能您的浏览器开启了同源保护策略！');
			return false;
		}
	});
}
