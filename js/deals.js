/** deals js*/
var containerDim;
var couponsArray = [];
var currentStoreId = "";
var swiperPrefix = "swiperNested";
var paginationPrefix = "pagination";
var gallery;
$("#showPopUp").click(function(){
	$("#popover").addClass("popover-visible");
});
	
$('#cancelBtn').click(function() {
	$("#popover").removeClass("popover-visible");
});


document.addEventListener("DOMContentLoaded", function() {
	getDeals();
	//TODO: need some refinement here.
	function getDeals() {
		var storeId = window.location.search.replace("?", "").split("=")[1];
		var params = {"store-id": storeId, "currentTime": 1374444444};
		var currentTime = new Date();
		var currentTimeStr = currentTime.toString().split(' ').join('+');
		$.ajax({
		headers : {
			sessionKey : localStorage.session_key,
			signature : CryptoJS.SHA1(localStorage.session_secret+currentTimeStr),
			currentTime: currentTimeStr
		},
		type : 'GET',
		dataType : "json",
		url : Global.serice_url + "/coupons",
		data : params,
		success : function(response) {
			if(response.coupons == undefined || response.coupons.length == 0) {
				alert("No coupons");
				return;
			}
			var length = response.coupons.length;
			var coupons = response.coupons;
			for(var i=0;i<length;i++) {
			var dealsWrapper = $("#deals-wrapper");
			dealsWrapper.append('<div class="swiper-slide"><div class="inner"><img src="'+coupons[i].coupon_image_url+'"/></div></div>');
			}
			//Creating carousel on the above data
			createCarousel();
		},
		error: function(error) {

		}});
	}

	function createCarousel() {$('.swiper-slide').css("width", (document.documentElement.clientWidth)*.8);
	var gallery = $('.swiper-container').swiper({
		slidesPerView:'auto',
		watchActiveIndex: true,
		centeredSlides: true,
		pagination:'.pagination',
		paginationClickable: true,
		resizeReInit: true,
		keyboardControl: true,
		grabCursor: true,
		onImagesReady: function(){
			changeSize()
		}
	})
	}

});


