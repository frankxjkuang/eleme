// 单个购物车对象
// 对象数据建模 秒速单个商品的属性和方法
function SingleCart(obj) {
	this.id = obj.item_id; // 商品 id
	this.price = obj.specfoods[0].price; // 单价
	this.num = obj.mum || 0; // 数量
	this.name = obj.name; // 名称
	this.description = obj.description; // 描述
	this.month_sales = obj.month_sales; // 月售
	this.satisfy_rate = obj.satisfy_rate; // 好评率
	this.image_path = obj.image_path; // 图片路径
}
SingleCart.prototype.plus = function() {
	// 商品数量加
	this.num++;
}
SingleCart.prototype.minus = function() {
	// 商品数量减
	this.num--;
}
SingleCart.prototype.render = function() {
	// 渲染商品列表中的单个商品
	console.log(this.name);

	// 图片路径的拼接
	var imgsrc = this.image_path || '';
	var _imgsrc = 'https://fuss10.elemecdn.com/' + imgsrc.substring(0, 1) + '/' + imgsrc.substring(1, 3) + '/' + imgsrc.substr(3);
	if(imgsrc.indexOf('jpeg') === -1) { // 图片格式为 png
		_imgsrc = _imgsrc + '.png?imageMogr/thumbnail/140x140/format/webp/quality/85';
	}else { // 图片格式为 jpeg
		_imgsrc = _imgsrc + '.jpeg?imageMogr/thumbnail/140x140/format/webp/quality/85';
	} 

	var str = 
			'<div class="food-info">'+
				'<div class="food-img">'+
					'<img src="'+ _imgsrc +'">'+
				'</div>'+
				'<div class="food-main">'+
					'<div class="food-name">'+ this.name +'</div>'+
					'<div class="food-desc desc-phrase">'+ this.description +'</div>'+
					'<div class="food-desc">'+
						'<span>月售'+ this.month_sales +'份</span>'+
						'<span>好评率'+ this.satisfy_rate +'%</span>'+
					'</div>'+
					'<div class="food-price">'+
						'<i class="sym">¥</i>'+
						'<i class="price">'+ this.price +'</i>'+
					'</div>'+
				'</div>'+
				'<div class="cart-operate">'+
					'<div class="minus operation">-</div>'+
					'<div class="num">0</div>'+
					'<div class="plus operation">+</div>'+
				'</div>'+
			'</div>';
	return str;
}
SingleCart.prototype.renderCart = function() {
	// 渲染购物车列表中的单个商品
	// ES6 中的方法
	var str = 
			`<div class="cart-info" data-itemid="${this.id}">
				<span class="cart-desc">${this.description}</span>
				<span class="cart-price"><i>¥</i>${this.price}</span>
				<span class="minus operation">-</span>
				<span class="num">${this.num}</span>
				<span class="plus operation">+</span>
			</div>`;
	return str;
}