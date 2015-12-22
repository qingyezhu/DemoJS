;(function(){
	$.fn.TipMessage = function(options){
		var defaults = {
			msg: '提示信息',
			tipMessageCssName: 'tip-message',
			contentCssName: 'tip-message-content',
			msgCssName: 'tip-message-msg',
			autoOpen: false,
			zIndex: 999
		};

		var settings = $.extend({}, defaults, options);

		var methods = {
			init: function(){
				//初始化方法

				//创建消息提示
				methods.createTipMessage.call(this);

				//是否打开消息提示
				if(settings.autoOpen){
					//打开消息提示
					methods.openTipMessage.call(this);
				}
				return this;
			},
			createTipMessage: function(){
				//创建消息提示
				var that = this;

				that.prop('class', settings.tipMessageCssName).css('zIndex', settings.zIndex);

				var $msg = $('<span></span>').prop('class', settings.msgCssName).html(settings.msg);

				var $content = $('<div></div>').prop('class', settings.contentCssName);

				$msg.appendTo($content);
				that.append($content).css('display', 'none');

				return that;
			},
			openTipMessage: function(msg){
				//打开消息提示
				var that = this;
				$.fn.TipMessage.showTip.call(that, msg);
				return that;

			},
			closeTipMessage: function(){
				//关闭消息提示
				var that = this;
				$.fn.TipMessage.hideTip.call(that);
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
			$.error('method ' + method + ' does not exist on jQuery.tipMessage');
			return this;
		}
		return method.apply(this, arguments);
	}

	$.fn.TipMessage.showTip = function(msg){
		//打开消息提示
		var that = this;

		//重置消息
		msg && that.find('span').html(msg);

		var height = that.css('height');

		that.css({'opacity': 1, 'display': 'block', 'top': '-' + height.substr(0, height.length - 2) + 'px'});

		that.animate({top: 0}, 'normal');
		return that;
	}

	$.fn.TipMessage.hideTip = function(){
		//关闭消息提示
		var that = this;

		var height = that.css('height');

		that.animate({'opacity': 0, 'top': '-' + height.substr(0, height.length - 2) + 'px'}, 'normal', null, function(){
			that.css({'display': 'none'});
		});
		return that;
	}

})(jQuery);