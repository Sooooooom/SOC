// browser check
var Browser = {chk : navigator.userAgent.toLowerCase()}
Browser = {ie : Browser.chk.indexOf('msie') != -1, ie6 : Browser.chk.indexOf('msie 6') != -1, ie7 : Browser.chk.indexOf('msie 7') != -1, ie8 : Browser.chk.indexOf('msie 8') != -1, ie9 : Browser.chk.indexOf('msie 9') != -1, ie10 : Browser.chk.indexOf('msie 10') != -1, ie11 : Browser.chk.indexOf('trident') != -1, edge : Browser.chk.indexOf('edge') != -1, opera : !!window.opera, safari : Browser.chk.indexOf('safari') != -1, safari3 : Browser.chk.indexOf('applewebkit/5') != -1, mac : Browser.chk.indexOf('mac') != -1, chrome : Browser.chk.indexOf('chrome') != -1, firefox : Browser.chk.indexOf('firefox') != -1}
var responCheck = Browser.ie7 || Browser.ie8;
if (Browser.ie7) {$("html").addClass("ie7");} else if (Browser.ie8) {$("html").addClass("ie8");} else if (Browser.ie9) {$("html").addClass("ie9");} else if (Browser.ie10) {$("html").addClass("ie10");} else if (Browser.ie11) {$("html").addClass("ie11");} else if (Browser.edge) {$("html").addClass("edge");}
if (window.console == undefined) {console={log:function(){}};}

// 호환성보기 테스트
if (navigator.userAgent.indexOf("MSIE 7") > 0 && navigator.userAgent.indexOf("Trident")){
	console.log("호환성테스트");
}
// or
/*if (/MSIE 7.*Trident/.test(navigator.userAgent)){document.getElementsByTagName("html")[0].className+="ie-compatible";}*/

var KDATA = KDATA || {};
var KDATA = {
	init : function() {
		KDATA.searchLayer();
	},
    
    searchLayer : function(ele) {
		var searchLyr = $(ele).next(".gnb-search");
		function close() {
			$(ele).focus().removeClass("active");
			searchLyr.find('input').val('');
			searchLyr.find('.gnb-auto').hide();
			searchLyr.fadeOut(200).removeAttr('tabindex').find('.pop_loop').remove();
			searchLyr.parent('.search_box').removeClass('open');
			$('body').removeAttr('style');
		}
		if ($(ele).hasClass("active")) {
			close();
		} else {
			//if($(".gnb-sec .user_area").hasClass("active")){
				$(".gnb-sec .user_area").removeClass("active").fadeOut(100);//util layer 닫기
				$("#header .menu-toggle a").removeClass("active").html('모든 메뉴 열기');// 햄버거 닫기
				$("#header .all-sec").fadeOut(100);//전체메뉴 닫기
			//}
			$(ele).addClass("active");
			searchLyr.fadeIn(500);
			searchLyr.attr('tabindex', '0').fadeIn("fast").focus().append('<a href="#" class="pop_loop">포커스이동</a>');
			searchLyr.parent('.search_box').addClass('open');
			/* 모바일일때 */
			if($(window).width() < '1280'){
				$('body').css({'overflow':'hidden','height':'100%'});
			}
		}
		//자동완성 입력필드 노출
		searchLyr.find('input').on('propertychange change keyup paste input focusin', function(){
			searchLyr.find('.gnb-auto').fadeIn(300);
		});             
		//$(".gnb-search").on('focusout', function(){
		//	$('.gnb-auto').fadeOut(100);
		//});

		$('.pop_loop').focus(function() {
			searchLyr.attr('tabindex', '0').fadeIn().focus();
		});
		searchLyr.find('.btn-close-srch').click(function() {
			close();
		});
		/* 다른영역 클릭시 닫기*/
		$('html').click(function(e){
			if(!$(e.target).parents().hasClass('search_box') && $(ele).hasClass("active")){
				close();
			}
		});
	},
	// layer popup open [event] [스크립트이관]
	modalLayer : {
		open : function(ele, unique, widNum, flag) {
			var uniqueId = $('#' + unique), that = ele;
			$(that).addClass("layerActive");
			uniqueId.attr('tabindex', '0').fadeIn("fast").focus();
			//2019-10-14	uniqueId.append('<a href="#" class="pop_loop">포커스이동</a>');
			$('.pop_loop').focus(function() {
				uniqueId.attr('tabindex', '0').fadeIn().focus();
			});
			if (widNum) {
				//$('#' + unique).find(".pop-area").width(widNum);
				$('#' + unique).find(".pop-area").css("max-width", widNum);				
			} else {
				// $('#' + unique).find(".pop-area").css("width", "700px");				
			}
			$('body').css({
				'overflow' : 'hidden',
				'height' : '100%'
			});

			var win_h = $(window).height();
			pop_h = uniqueId.find('.pop-area').outerHeight();

			$(window).resize(function() {
				var win_w = $(window).width();
				//var pop_w = uniqueId.find('.pop-area').width();
				var pop_w = uniqueId.find('.pop-area').outerWidth();
				var position_top = (win_h - pop_h) / 2;
				var position_left = (win_w - pop_w) / 2;

				if (position_top <= 0) {
					position_top = 0;
				}
				if (position_left <= 0) {
					position_left = 0;
				}
				uniqueId.find('.pop-area').css({
					'top' : position_top//,
					//'left' : position_left
				});

				var win_h = $(window).height();
				// 20170922 아코디언 포함된 팝업 스타일 아코디언 갯수로 분기 처리
				if (uniqueId.find('.pop-area .acco-type2').length >= 1) {
					uniqueId.find('.pop-area').addClass('scroll').css({
						'margin-top' : '0'
					});
				//}
				//2019.10.14
				} else {
				 	if (pop_h >= win_h) {
				 		uniqueId.find('.pop-area').addClass('scroll').css({
				 		//uniqueId.find('.pop-area').css({
							'top' : '0' 
							,'margin-top' : '0'
							,'margin-left' : -pop_w / 2
				 		});
				 	} else {
				 		uniqueId.find('.pop-area').removeClass('scroll').css({
				 		//uniqueId.find('.pop-area').css({
							'margin-top' : -pop_h / 2
							,'margin-left' : -pop_w / 2
				 		});
				 	}
				}
			}).resize();

			// close [event]
			uniqueId.find('.as-pop-close').click(function(e) {
				e.preventDefault();
				KDATA.ini.popCloseFunc();
			});
		},
		close : function() {
			KDATA.ini.popCloseFunc();
		}
	},
}// last

$(document).ready(function(){

	var cartEvt = function(){
		var $cartBtn = $('.cart a, .cart_pop_wrap'),
			$cartPop = $(".cart_pop_wrap"),
			cartVw = $(".cart_pop_wrap").find('display') == 'block';
			function cartOn(){
				$cartPop.css('display', 'block');
				cartVw =true;
				updateCartTooltipRenew();
			}
			function cartOff(){
				$cartPop.css('display', 'none');
				cartVw = false;
			}
		// $cartBtn.on('mouseenter', function(){
		// 	cartVw == false ? cartOn() : cartOff();
		// });
		$cartBtn.on({
			mouseenter : function(){cartOn();},
			mouseleave : function(){cartOff();}
		});
	}();
	// 전체메뉴열기
	$('#header .menu-toggle a').click(function(){
		var gnb = $('#header .gnb, #header .gnb2, #header .mb_area');	
		if($(this).parent().hasClass('on')){
			$('.gnb_area').removeClass('open');
			gnb.animate({'right':'-90%'});
			$(this).parent().removeClass('on');
			$('body').removeAttr('style');
		}else{
			$('.gnb_area').addClass('open');
			$(this).parent().addClass('on');
			gnb.animate({'right':'0'});
			$('body').css({'overflow':'hidden','height':'100%'});
		}
		
	});
	
});




