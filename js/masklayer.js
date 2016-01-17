;(function($){
	$.fn.MaskLayer = function(options){
		var defaults = {
			msg: '请稍候',
			img: 'waiting.gif',
			body: $(document.body),
			maskLayerCssName: 'mask-layer',
			conentLayerCssName: 'mask-layer-conent',
			msgMaskLayerCssName: 'mask-layer-msg',
			imgMaskLayerCssName: 'mask-layer-img',
			autoOpen: false,
			zIndex: 998
		};
		
		var settings = $.extend({}, defaults, options);

		var methods = {
			init: function(){
				//初始化方法
				var that = this;

				//创建遮罩层
				methods.createMaskLayer.call(that);

				//是否打开遮罩层
				var autoOpen = settings.autoOpen;
				if(autoOpen){
					//打开遮罩层
					methods.openMask.call(that);

				}
				return that;
			},
			createMaskLayer: function(){
				//创建遮罩层方法

				var that = this;
				that.prop('class', settings.maskLayerCssName).css('zIndex', settings.zIndex);
				
				var $msg = $('<span></span>').prop('class', settings.msgMaskLayerCssName).html(settings.msg);

				var $img = $('<img/>').prop('class', settings.imgMaskLayerCssName).prop('src', settings.img);

				var $content = $('<div></div>').prop('class', settings.conentLayerCssName).css({
					left: (Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - 200) / 2 + 'px',
					top: (Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 50) / 2 + 'px'
				});

				$img.appendTo($content);
				$msg.appendTo($content);
				that.append($content).css('display', 'none');

				return that;
			},
			openMask: function(msg){
				//打开遮罩层方法

				var that = this;
				$.fn.MaskLayer.showMask.call(that, msg);
				return that;
			},
			closeMask: function(){
				//关闭遮罩层方法

				var that = this;
				$.fn.MaskLayer.hideMask.call(that);
				return that;
			}

		};

		var method = arguments[0];

		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		}else if(typeof method === 'object' || !method){
			method = methods['init'];
		}else{
			$.error('method ' + method + ' does not exist on jQuery.MaskLayer');
			return this;
		}

		return method.apply(this, arguments);
	};

	$.fn.MaskLayer.showMask = function(msg){
		//重写遮罩层显示方法
		var that = this;

		//重置遮罩提示
		msg && that.find('span').html(msg);

		var height = that.css('height');
		var _scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
		var _scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);

		that.css({'opacity': 0.8, 'display': 'block', 'top': '-' + height.substr(0, height.length - 2) + 'px', 'width': _scrollWidth + 'px', 'height': _scrollHeight + 'px'})

		that.animate({top: 0}, 'normal');
		return that;
	}
	$.fn.MaskLayer.hideMask = function(){
		//重写遮罩层隐藏方法
		var that = this;

		var height = that.css('height');

		that.animate({'opacity': 0, 'top': height.substr(0, height.length - 2) + 'px'}, 'normal', null, function(){
			that.css('display', 'none');
		});
		return that;
	}


})(jQuery);