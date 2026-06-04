
jQuery(document).ready(function ($) {
		
		
	$("[class*='dtb-overlay-']").each(function(){
		$(this).wrap('<div class="dtb-overlay-wrapper"><div class="dtb-inner-wrapper"><div>');
		if ($(this).find('.dtb-close').length == 0) {
			$(this).closest('.dtb-overlay-wrapper').append('<span class="dtb-default-close"></span>');
		}
	});
	$('[class*=dtb-show-]').off().click(function(e){
		e.preventDefault();
		var num = $(this).attr('class').match(/dtb-show-(\d+)/)[1]
		var numToolboxOverlay = $('.dtb-overlay-'+num);
		var numToolboxOverlayWrapper = numToolboxOverlay.closest('.dtb-overlay-wrapper');
		var numToolboxVideoOverlayInside = numToolboxOverlay.find('.et_pb_video_overlay');
		
		numToolboxVideoOverlayInside.each(function(){
			$(this).fadeOut();
			var ToolboxOverlayVideoIframe = $(this).siblings('.et_pb_video_box').find('iframe');
			if (ToolboxOverlayVideoIframe.length !== 0) {
				var ToolboxOverlayVideoSrc = ToolboxOverlayVideoIframe.attr('src').replace('autoplay=0', 'autoplay=1')+"&autoplay=1";
				ToolboxOverlayVideoIframe.attr('src', ToolboxOverlayVideoSrc).attr('autoplay, 1');
			}
			
			var ToolboxOverlayVideoHTML = $(this).siblings('.et_pb_video_box').find('video');
			if (ToolboxOverlayVideoHTML.length !== 0) {
				ToolboxOverlayVideoHTML.delay(1000).queue(function (next) { 
					$(this).trigger('play'); 
					next(); 
				});;
			}
			
		});
		
		
		numToolboxOverlayWrapper.fadeIn('slow').addClass('is-visible');
		numToolboxOverlayWrapper.parents('.et_builder_inner_content').addClass('is-visible');
		$('#main-content').css('z-index', 'unset');

		if ( numToolboxOverlay.length ) {
			$('body').addClass('stopscroll');
		} 
	});
	
	function ToolboxOverlayClose() {
		var thisObj = $(this);
		var ToolboxOverlayWrapper = $(thisObj).closest('.dtb-overlay-wrapper');
		ToolboxOverlayWrapper.fadeOut('slow').removeClass('is-visible');
		$('body').removeClass('stopscroll');
		$('#main-content').css('z-index', '');
		ToolboxOverlayWrapper.parents('.et_builder_inner_content').delay(600).queue(function (next) { 
			$(this).removeClass('is-visible'); 
			next(); 
		});
		
		// if video iframe inside
		var ToolboxOverlayVideoIframe = ToolboxOverlayWrapper.find('.et_pb_video_box iframe');
		ToolboxOverlayVideoIframe.each(function(){
			var ToolboxOverlayVideoSrc = $(this).attr('src').replace('autoplay=1', 'autoplay=0');
			$(this).attr('src', ToolboxOverlayVideoSrc);
		} );
		
		// if video html inside
		var ToolboxOverlayVideoHTML = ToolboxOverlayWrapper.find('.et_pb_video_box video');
		if (ToolboxOverlayVideoHTML.length !== 0) {
			ToolboxOverlayVideoHTML.trigger('pause');
		}
		
	}
	$('.dtb-close').off().click(function(e){
		e.preventDefault();
	});
	$('.dtb-close, .dtb-default-close').on('click', ToolboxOverlayClose);
	
	if ( overlay_values.dtb_overlay_close_esc === '1' ) {
		$(document).on('keyup', function(e) {
		  if (e.key == "Escape") $('.dtb-close, .dtb-default-close').click();
		});
	}
	if ( overlay_values.dtb_overlay_close_click === '1' ) {
		$('.dtb-inner-wrapper > div').on('click', ToolboxOverlayClose).on('click', 'div', function(e) 	{e.stopPropagation();}
		);
	}
	
	

});

