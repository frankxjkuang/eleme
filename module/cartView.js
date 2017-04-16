// 购物车列表模块
var cartView = {
	name: '购物车列表模块',
	dom: $('.cart-list'),
	list: {
		// 购物车列表中的数据对象，缓存购物车的所有实例
	},
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		$('.cart-view').on('click', '.plus', function(e) {
			// 数量加
			var closestDom = $(this).closest('.cart-info');

			var currId = closestDom.data('itemid');
			var currModule = _this.list[currId];
			currModule.plus();

			// 动态的对购物车列表中的数据进行创建
			var selector = '[data-itemid="'+ currId +'"]';
			$(selector).find('.num').html(currModule.num);

			Store(location.hash.split('-')[1], cartView.list);
		});

		$('.cart-view').on('click', '.minus', function(e) {
			// 数量减
			var closestDom = $(this).closest('.cart-info');

			var currId = closestDom.data('itemid');
			var currModule = _this.list[currId];
			currModule.minus();

			// 动态的对购物车列表中的数据进行创建
			var selector = '[data-itemid="'+ currId +'"]';
			$(selector).find('.num').html(currModule.num);

			// 数量为零删除节点
			if(currModule.num === 0) {
				delete cartView.list[currModule.id];
				closestDom.remove();
			}

			Store(location.hash.split('-')[1], cartView.list);
		});
	},  
	clear: function() {
		for(var key in this.list) {
			this.list[key].num = 0;

			var selector = '[data-itemid="'+ this.list[key].id +'"]';
			$(selector).find('.num').html(this.list[key].num); // 批量修改
			$('.cart-view').hide();
			this.dom.html('');
			delete this.list[key];
		}
		Store(location.hash.split('-')[1], {});
	},
	render: function() {
		// 渲染购物车列表的视图
		var html = '<div class="cart-title"><span>购物车</span><span id="clear-cart">清空</span></div>';
		for(var key in this.list) {
			html += this.list[key].renderCart();
		}
		this.dom.html(html);
	}
}