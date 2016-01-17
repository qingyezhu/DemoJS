;(function($){
	//1)、获取$.ajax对象
	var _ajax = $.ajax;

	$.ajax = function(options){
		
		//2)、重写error处理方法
		var fn = {
			error: function(XMLHttpRequest, textStatus, errorThrown){
				var $tipMessage = window['$tipMessage'];
				console.log($tipMessage);
				$tipMessage.TipMessage('openTipMessage', 'ajax请求异常');
			}
		};

		//3)、如果没有调用时没有error的处理方法，则使用默认error处理方法
		if(options.error){
			fn.error = options.error;
		}

		//4)、扩展原生的$.ajax方法，返回最新的参数
		var _options = $.extend(options, {
			error: function(XMLHttpRequest, textStatus, errorThrown){
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			}
		});

		//5)、将最新参数传回ajax对象
		_ajax(_options);
	};

})(jQuery);