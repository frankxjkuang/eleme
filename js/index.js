// 建立模块与hash之间映射关系表
var HashModuleMap = {
	'address': addressModule,
	'detail': detailModule,
	'rlist': rlistModule,
	'search': searchModule
}

var prevModule = null, // 上一个模块
	currModule = null, // 当前的模块
	ModuleCache = {
		// 用以判断模块是否被初始化
	};

// 路由控制
function routeControl() {
	var khash = '';
	var hash = location.hash.slice(1) || 'address';

	khash = hash;
	if(hash.indexOf('rlist') !== -1) {
		khash = 'rlist';
		rlistModule.loadList(hash, true);
	}

	if(hash.indexOf('detail') !== -1) {
		khash = 'detail';
		detailModule.reset();
		detailModule.loadInfo(hash);
	}

	var module = HashModuleMap[khash]; // 动态获取对象属性

	prevModule = currModule;
	currModule = module;

	if(prevModule) 
		prevModule.leave();

	currModule.enter();

	if (!ModuleCache[khash]) {
		currModule.init(); // 初始化该模块

		// 每个模块只能被初始化一次
		ModuleCache[khash] = true;
	}
	
}

routeControl();

// 路由监听
window.onhashchange = function() {
	routeControl(); 	
}

