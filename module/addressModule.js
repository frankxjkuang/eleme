var addressModule = Object.create(pageModule);
addressModule = $.extend(addressModule, {
	name: '地址搜索页',
	dom: $('#address'),
	bindEvent: function() {
		// 绑定事件

		var _this = this;
		// 清除搜索框内容
		$(".btnClean").on("click", function() {
			$('#addr_kwd').val("");
			$('.addrContent').empty();
		});

		// 监听输入框搜索
		$("#addr_kwd").on("input", function() {
			var poi = $('#addr_kwd').val();
			_this.loadList(event);
		});
	},
	loadList: function(event) {
		$.ajax({
			// 饿了么接口采用了CORS跨域方式
			url: 'https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby',
			type: 'get',
			data: {
				keyword: $("#addr_kwd").val(),
				offset: 0,
				limit: 20
			},
			success: function(res) {
				var html = "";

				for(var i = 0, iLen = res.length; i < iLen; i++) {
					html += '<div class="addrInfo"><div class="addrName"><a href="#rlist-'+ res[i].latitude +'-'+ res[i].longitude +'-'+ res[i].name +'-'+ res[i].geohash +'">'+ res[i].name +'</div><p class="desc">'+ res[i].address +'</p></div>';
				}
				
				$(".addrContent").html(html);
			},
			error: function() {

			}
		});
	}
});


