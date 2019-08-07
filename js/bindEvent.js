function bindEvent(dom, type, fn) {

	// 判断type的类型
	if (type === 'mousewheel') {
		// 判断浏览器的信息
		var isFF = window.navigator.userAgent.indexOf('Firefox') >= 0 ? true : false;

		if (isFF) {
			// 说明是火狐浏览器
			dom.addEventListener('DOMMouseScroll', fn, {passive: false});
			return;
		}
	}

	// 利用能力检测
	if (dom.addEventListener) {
		// 这里说明是高级浏览器
		dom.addEventListener(type, fn, {passive: false});
	} else if (dom.attachEvent) {
		// 说明是IE浏览器
		dom.attachEvent('on' + type, fn);
	} else {
		// 一些不知名的浏览器
		dom['on' + type] = fn;
	}

}