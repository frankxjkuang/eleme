function calSize() {
	var clientWidth = window.innerWidth || document.documentElement.ClientWidth;
	document.documentElement.style.fontSize = clientWidth / 3.75 + 'px';
}

calSize();
// 设备变化监听
window.addEventListener('resize', calSize);   