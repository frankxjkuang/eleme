// 防抖动
function debounce(func, wait) {
	var timer = null;

	return function() {
		var args = arguments;

		var later = function() {
			func.apply(null, args);
			// or func();
		}

		clearTimeout(timer);

		timer = setTimeout(function() {
			later();
		}, wait || 300);
	}
}

var pageModule = {
	name: '地址搜索页',
	dom: $('#address'),
	init: function() {
		// 初始化方法
		this.bindEvent();
	},
	bindEvent: function() {
		// 绑定事件
	},
	loadList: function(event) {

	},
	enter: function() {
		this.dom.show();
	},
	leave: function() {
		this.dom.hide();
	}
}