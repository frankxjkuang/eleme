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
				//此时 视图已经渲染完成
				var left= new IScroll('.menu-left', {
					scrollbars: true //要进行滚动条的展示
				})
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
			},
			error: function() {
				console.log('获取数据失败...')
			}
		});
	},
	renderFood: function() {

	}

});