function animate(dom, json, time, callBack) {
	/**
	 * 思路:
	 *	我们的编程思路是使用定时器和循环来实现动画函数
	 *	既然是循环动画，那么每一次动画都是一个步长
	 * 	首要的问题是要得到元素的步长值
	 *	步长值 = 总距离 / 总次数
	 *	总距离 = 目标值 - 初始值
	 *  总次数 = 总时间 / 定时器的间隔时间
	 *
	 **/
	// 定义计数器
	var count = 4;
	// 定义定时器的间隔时间
	var intervar = 20;
	// 总次数 = 总时间 / 定时器的间隔时间
	var allCount = time / intervar;

	// 定义一个对象 保存元素的初始值
	var nowJson = {};
	for (var i in json) {
		if (window.getComputedStyle) {
			nowJson[i] = parseInt(getComputedStyle(dom)[i]);
		} else {
			nowJson[i] = parseInt(dom.currentStyle[i]);
		}

	}
	// 循环完毕之后元素的初始值也就得到了
	// console.log(nowJson);

	// 定义对象保存元素的步长值
	var stepJson = {};
	for (var i in json) {
		// 总距离 = 目标值 - 初始值
		// 步长值 = 总距离 / 总次数
		stepJson[i] = (json[i] - nowJson[i]) / allCount;
	}
	// 循环完毕之后元素的步长值也就得到了
	// console.log(stepJson);

	// 开启定时器
	var timer = setInterval(function() {
		// 计数器
		count++;
		// 不断的循环改变元素的状态
		for (var i in json) {
			// 当前值 = 初始值 + 步长值 * 次数
			dom.style[i] = nowJson[i] + stepJson[i] * count + "px";
		}

		// 判断元素是否到达终点
		if (count >= allCount) {
			// 拉终
			for (var i in json) {
				dom.style[i] = json[i] + "px";
			}

			// 停表
			clearInterval(timer);

			// 执行回调函数
			callBack && callBack.call(dom);
		}

	}, intervar)
}