var detailModule = Object.create(pageModule);
detailModule = $.extend(detailModule, {
	name: '食物详情页',
	dom: $('#detail'),
	bindEvent: function() {
		var _this = this;

		// 返回商家列表
		$('#detail').on('click', '.backrlist', function() {
			window.history.back();
		});

		// 菜单左边的导航点击事件
		$('.menu-left').on('click', 'li', function() {
			$(this).addClass('active');
			$(this).siblings().removeClass('active');
			console.log('scroll');

			var selector = "[data-title='"+ $(this).text() +"']";
			var dom = $(selector).get(0);
			rightScroll.scrollToElement(dom, 400);
		});

		// 购物车视图的显示
		var cartDom = _this.dom.find('.cart-view');
		$('.cart-layer').click(function() {
			cartDom.hide();
		});

		$('.cart-img').click(function() {
			cartDom.toggle();
		});
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
		var _this = this;
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
						'<a href="javascript:void(0);" class="backrlist">'+
							'<img src="imgs/detail-back.jpg" alt="back">'+
						'</a>'+
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

				_this.dom.find('.header').html(html);

				// 活动类型
				if(res.activities[0].icon_name === '新') {
					$('.activity-box').addClass('activity-new');
				}
				if(res.activities[0].icon_name === '减') {
					$('.activity-box').addClass('activity-diff');
				} 

				// 配送费
				_this.dom.find('.postage').text(res.piecewise_agent_fee.description);
			},
			error: function() {
				console.log('获取数据失败...')
			}
		});
	},
	loadFoodInfo: function() {
		var _this = this;

		$.ajax({
			url: 'https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id='+this.shopId,
			type: 'get',
			success: function(res) {
				console.log('食物信息', res);

				var left_html = '',
					right_html = '';

				// 左边导航条渲染
				for(var i = 0, iLen = res.length; i < iLen; i++) {
					left_html += '<li>'+ res[i].name +'</li>'
				}
				$('.menu-left-main').html(left_html);

				// 右边食物渲染
				for(var i = 0, iLen = res.length; i < iLen; i++) {
					right_html += 
								'<div class="food-item">'+
									'<div class="food-title">'+
										'<h4 class="title" data-title="'+ res[i].name +'">'+ res[i].name +'</h4>'+
										'<div class="desc">'+ res[i].description +'</div>'+
										'<div class="info">...</div>'+
									'</div>'+
									_this.renderFood(res[i].foods)+
								'</div>';
				}
				$('.menu-right .inner-wrapper').html(right_html);

				// 防止重复初始化滚动条 销毁原有对象
				if(typeof leftScroll !== 'undefined' || typeof rightScroll !== 'undefined') {
					leftScroll.destroy();
					rightScroll.destroy();
				}

				// 此时 视图已经渲染完成
				window.leftScroll = new IScroll('.menu-left', {
					scrollbars: true // 要进行滚动条的展示
				});
				window.rightScroll = new IScroll('.menu-right', {
					scrollbars: true, // 要进行滚动条的展示
					probeType: 2 // 1, 2, 3设置滚动条的灵敏度
				});

				var foodItem = $('.food-item'), // 所有食物版块
					foodTtemHeight = [], // 各食物版块的高度
					sum = 0; // 食物版块总高度


				for(var i = 0, iLen = foodItem.length; i < iLen; i++) {
					sum += foodItem.eq(i).height();
					foodTtemHeight.push(sum);
				}
				console.log('食物版块：', foodTtemHeight);

				rightScroll.on('scroll', function() {

					var offsetY = Math.abs(rightScroll.y); // 食物版块滚动条的偏移量
					for(var i = 0, iLen = foodTtemHeight.length; i < iLen; i++) {
						if(offsetY < foodTtemHeight[i]) {

							$('.menu-left li').eq(i).addClass('active');
							$('.menu-left li').eq(i).siblings().removeClass('active');
							break;
						}
					}
				});
			},
			error: function() {
				console.log('获取数据失败...')
			}
		});
	},
	renderFood: function(data) {
		var html = '';
		for(var i = 0, iLen = data.length; i < iLen; i++) {

			var cart = new SingleCart(data[i]);
			html += cart.render();
		}
		return html;
	}

});