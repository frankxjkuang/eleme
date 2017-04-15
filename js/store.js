function Store(nameSpace, data) {
	// 对象存储操作

	// 用以实现对象的存取操作
	if(data) { // 存数据
		localStorage.setItem(nameSpace, JSON.stringify(data));
		console.log(data);
		return;
	}
	// 取数据
	return JSON.parse(localStorage.getItem(nameSpace)) || {};
}