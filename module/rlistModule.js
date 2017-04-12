var rlistModule = Object.create(pageModule);

rlistModule = $.extend(rlistModule, {
	name: '商家列表页',
	dom: $('#rlist'),
	bindEvent: function() {

	},
	loadList: function(hash) {
		var lat = hash.split('-')[1],
			lng = hash.split('-')[2];

		// 加载商家列表
		$.ajax({
			url: 'https://mainsite-restapi.ele.me/shopping/restaurants',
			data: {
				latitude:lat,
				longitude:lng,
				offset:20,
				limit:20,
				extras:['activities'],
				terminal:'h5'
			},
			success: function(res) {
				console.log(res);
				for(var i = 0, iLen = res.length; i < iLen; i++) {
					var child = $(".template:first-of-type").clone(true); // 克隆节点
					child.appendTo(".recommend");

					var imgsrc = res[i].image_path;
					var _imgsrc = 'https://fuss10.elemecdn.com/' + imgsrc.substring(0, 1) + '/' + imgsrc.substring(1, 3) + '/' + imgsrc.substr(3);
					if(imgsrc.indexOf('jpeg') === -1) { // 图片格式为 png
						_imgsrc = _imgsrc + '.png?imageMogr/format/webp/';
					}else { // 图片格式为 jpeg
						_imgsrc = _imgsrc + '.jpeg?imageMogr/format/webp/';
					}
					// 商店 logo
					child.find(".sLogo").attr('src', _imgsrc);
					// 商店名字
					child.find(".shopName").text(res[i].name);
					// 评分
					child.find(".score").text(res[i].rating);
					// 月售单数
					child.find(".sale").text("月售"+ res[i].recent_order_num +"单");
					// 距离
					child.find(".distance").text((res[i].distance / 1000).toFixed(2) + 'km');
					// 时间
					child.find(".time").text(res[i].order_lead_time + "分钟");
					// 配送费
					child.find(".transPay").text(res[i].piecewise_agent_fee.tips);
					// 起送费
					child.find(".moneyLimit i").text(res[i].piecewise_agent_fee.rules[0].price);

					// 保 准 票
					var html = '';
					for(var j = 0, jLen = res[i].supports.length; j < jLen; j++) {
						html += '<i>'+ res[i].supports[j]['icon_name'] +'</i>';
						console.log(html);
					}
					$(".supportWrap").html(html);
				}
			},
			error: function() {
				console.log("faild");
			}
		});

		// 加载附近美食搜索的热词
		$.ajax({
			url: 'https://mainsite-restapi.ele.me/shopping/v3/hot_search_words',
			data: {
				latitude:lat,
				longitude:lng,
			},
			success: function(res) {
				console.log(res);
				var html = '';
				for (var i = 0, iLen = res.length; i < iLen; i++) {
					html += '<a>'+res[i].word+'</a>';
				}
				$('.hotword').html(html);
			},
			error: function() {
				console.log("faild");
			}
		});

		// 加载天气信息
		$.ajax({
			url: 'https://mainsite-restapi.ele.me/bgs/weather/current',
			data: {
				latitude:lat,
				longitude:lng,
			},
			success: function(res) {
				console.log(res);
				// 温度
				$('.temp').text(res.temperature+"°");
				// 天气描述
				$('.weather .desc').text(res.description);
//https://fuss10.elemecdn.com/3/73/19e992e612e983f517e2690cb3e16png.png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/
				var imgsrc = res.image_hash;
				var _imgsrc = 'https://fuss10.elemecdn.com/' + imgsrc.substring(0, 1) + '/' + imgsrc.substring(1, 3) + '/' + imgsrc.substr(3);
				if(imgsrc.indexOf('jpeg') === -1) { // 图片格式为 png
					_imgsrc = _imgsrc + '.png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/';
				}else { // 图片格式为 jpeg
					_imgsrc = _imgsrc + '.jpeg?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/';
				}

				// 天气图片
				$('.weather .img-box').attr('src', _imgsrc);
			},
			error: function() {
				console.log("faild");
			}
		});
	}
});