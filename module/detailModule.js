var detailModule = Object.create(pageModule);
detailModule = $.extend(detailModule, {
	name: '食物详情页',
	dom: $('#detail'),
	bindEvent: function() {

	},
	loadInfo: function(hash) {
		// 加载信息
		this.shopId = hash.split('-')[1];
		this.lat = hash.split('-')[2];
		this.lng = hash.split('-')[3];
		this.loadHeaderInfo(); 
		this.loadFoodInfo();
	},
	loadHeaderInfo: function() {
		$.ajax({
			url: 'https://mainsite-restapi.ele.me/shopping/restaurant/'+this.shopId,
			type: 'get',
			data: {
				extras: ['activities', 'album', 'license', 'identification', 'statistics'],
				latitude:this.lat,
				longitude:this.lng
			},
			success: function(res) {
				console.log('头部信息', res);
				var is_solid = '',
					html = '';
				if(res.delivery_mode) {
					is_solid = '蜂鸟专送 /';
					console.log('true');
				}
				// e9a7271587acea919750d0304c0a29f6jpeg
				// https://fuss10.elemecdn.com/e/9a/7271587acea919750d0304c0a29f6jpeg.jpeg?imageMogr/format/webp/
				var imgsrc = res.image_path;
				var _imgsrc = 'https://fuss10.elemecdn.com/' + imgsrc.substring(0, 1) + '/' + imgsrc.substring(1, 3) + '/' + imgsrc.substr(3);
				if(imgsrc.indexOf('jpeg') === -1) { // 图片格式为 png
					_imgsrc = _imgsrc + '.png?imageMogr/format/webp/';
				}else { // 图片格式为 jpeg
					_imgsrc = _imgsrc + '.jpeg?imageMogr/format/webp/';
				}

				html += 
						'<div class="header-main">'+
							'<a href="">'+
								'<div class="logo">'+
									'<img src="'+ _imgsrc +'" alt="logo">'+
								'</div>'+
								'<div class="desc">'+
									'<h3 class="shopName">'+res.name+'</h3>'+
									'<p>'+
										'<i>'+ is_solid +'</i>'+
										'<i>'+ res.piecewise_agent_fee.tips +' /</i>'+
										'<i>配送费¥'+ res.float_delivery_fee +'</i>'+
										'<img src="" alt="">'+
									'</p>'+
									'<p>'+
										'<span class="promotion_info">公告：'+ res.promotion_info +'</span>'+
									'</p>'+
									'<div class="check-info">'+
										'><img src="" alt="">'+
									'</div>'+	
								'</div>'+
							'</a>'+
						'</div>'+
						'<div class="activity-box ">'+
							'<a href="">'+
								'<span>'+ res.activities[0].description +'</span>'+
								'<i>'+ res.activities.length +'个活动</i>'+
							'</a>'+
						'</div>';

				$('.header').append(html);

				// 活动类型
				if(res.activities[0].icon_name === '新') {
					$('.activity-box').addClass('activity-new');
				}
				if(res.activities[0].icon_name === '减') {
					$('.activity-box').addClass('activity-diff');
				} 

				//此时 视图已经渲染完成
				var left= new IScroll('.menu-left', {
					scrollbars: true //要进行滚动条的展示
				});
			},
			error: function() {
				console.log('获取数据失败...')
			}
		});
	},
	loadFoodInfo: function() {
		$.ajax({
			url: 'https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id='+this.shopId,
			type: 'get',
			success: function(res) {
				console.log('食物信息', res);
				var html = '';
				for(var i = 0, iLen = res.length; i < iLen; i++) {
					html += '<li>'+ res[i].name +'</li>'
				}
				$('.menu-left-main').html(html);
			},
			error: function() {
				console.log('获取数据失败...')
			}
		});
	},
	renderFood: function() {

	}

});