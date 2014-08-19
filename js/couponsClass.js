function Coupons(params, swiperParent, isPrepend, width, height) {
	this.params = params;
	this.swiperPrefix = "swiper-";
	this.paginationPrefix = "pagination-";
  	this.swiperParent = swiperParent;
  	this.isPrepend = isPrepend;
  	this.width = width;
  	this.height = height;
};


Coupons.prototype.successHandler = function(response, status, xhr) {
	
}

Coupons.prototype.errorHandler = function(error) {

}

function process(response, params, swiperParent, swiperPrefix, paginationPrefix, isPrepend, width, height) {

	var swiperContainerClass = swiperPrefix+params["store-id"];
	var paginationContainerClass = paginationPrefix+params["store-id"];
	
	//Dynamically setting width and heights based on the viewpoint width and height
	var swiperContainer = document.createElement("DIV");
	swiperContainer.className = "swiper-container"+" "+swiperContainerClass;
	swiperContainer.style.width = width+"px";
	swiperContainer.style.height=height+"px";

	var paginationContainer = document.createElement("DIV");
	paginationContainer.className = "pagination"+" "+paginationContainerClass;

	var swiperWrapper = document.createElement("DIV");
	swiperWrapper.className = "swiper-wrapper";
	
	swiperContainer.appendChild(paginationContainer);
  	swiperContainer.appendChild(swiperWrapper);

  	var dealsWrapper = document.getElementById("deals-wrapper");

  	var swiperSlideParent = document.createElement("div");
		swiperSlideParent.className = "swiper-slide";
		swiperSlideParent.style.width = (0.927536232*width)+"px";
		swiperSlideParent.style.height = (0.927536232*height)+"px";
		swiperSlideParent.appendChild(swiperContainer);
  	if(isPrepend) {
  		swiperParent.prependSlide(swiperSlideParent); 		
  	} else {
  		swiperParent.appendSlide(swiperSlideParent);
  	}
  	
  	var swiper = new Swiper("."+swiperContainerClass,{
	    	mode: 'horizontal',
	    	pagination: "."+paginationContainerClass,
	    	paginationClickable: true,
	    	slidesPerView: 'auto',
	    	//cssWidthAndHeight: true
	});

	if(response.coupons.length !== 0) {
		var storeCoupons = response.coupons;
		for(var i=0;i<storeCoupons.length;i++) {
			var couponDivContainer = document.createElement("DIV");
			couponDivContainer.className = "couponDivContainer";
			couponDivContainer.style.position = "relative";
			couponDivContainer.style.width = "96%";
			couponDivContainer.style.height = "96%";
			couponDivContainer.style.left = (0.052484375*width)+"px";
			couponDivContainer.style.top = (0.03125*width)+"px";
			var couponDiv = document.createElement("DIV");
			couponDivContainer.appendChild(couponDiv);
			couponDiv.className= "couponDiv";
			couponDiv.setAttribute("couponid", storeCoupons[i].idcoupons);
			couponDiv.style.width="100%";
			couponDiv.style.height="100%";
			couponDiv.style.position="relative";
		
			var front = document.createElement("DIV");
			front.className = "card front";

			var infoFlip = document.createElement("a");
			infoFlip.className = "info flip";
			infoFlip.innerHTML = "i";
			infoFlip.href = "#";
			var back = document.createElement("DIV");
			back.className = "card back";
			var backFlip = document.createElement("a");
			backFlip.className = "flip";
			backFlip.innerHTML = "Back";
			backFlip.href = "#";

			//front.style.width = back.style.width = '95%';
			//front.style.height = back.style.height = '95%';
			front.style.position = back.style.position = 'absolute';
			//front.style.left = (0.06640625*width)+"px";
			//front.style.top = back.style.top = (0.03125*width)+"px";

			var couponImg = document.createElement("IMG");			
			couponImg.src = storeCoupons[i].coupon_image_url;
			//img.src = Global.base_url+"/images/nodeals.png";
			couponImg.style.display = 'block';
			couponImg.style.width = 'inherit';
			couponImg.style.height = 'inherit';
			//couponImg.style.position='absolute';
			couponImg.style.borderRadius = '20px';
			couponImg.className = "coupon-img";
			//couponImg.style.left = (0.06640625*width)+"px";
			//couponImg.style.top = (0.03125*width)+"px";
		
			var infoImg = document.createElement("IMG");	
			infoImg.src = Global.base_url+"/images/info.png";
			infoImg.style.display = 'block';
			infoImg.style.width = 'inherit';
			infoImg.style.height = 'inherit';
			//infoImg.style.position='absolute';
			infoImg.style.borderRadius = '20px';
			//infoImg.style.left = (0.06640625*width)+"px";
			//infoImg.style.top = (0.03125*width)+"px";
			
			front.appendChild(couponImg);
			front.appendChild(infoFlip);

			back.appendChild(infoImg);
			back.appendChild(backFlip);

			couponDiv.appendChild(front);
			couponDiv.appendChild(back);

			var swiperSlide = document.createElement("div");
			swiperSlide.className = "swiper-slide";
			swiperSlide.style.width = (0.927536232*width)+"px";
			swiperSlide.style.height = (0.927536232*height)+"px";
			swiperSlide.appendChild(couponDivContainer);
			swiper.appendSlide(swiperSlide);
		}
	} else {
		var couponDiv = document.createElement("DIV");
			couponDiv.className= "couponDiv";
			couponDiv.style.width="100%";
			couponDiv.style.height="100%";
			couponDiv.style.position="relative";

			var img = document.createElement("IMG");
			img.src = Global.base_url+"/images/nodeals.png";
			img.style.display = 'block';
			img.style.width = '95%';
			img.style.height = '95%';
			img.style.position='absolute';
			img.style.borderRadius = '20px';
			img.style.left = (0.06640625*width)+"px";
			img.style.top = (0.053333333*height)+"px";
		
			couponDiv.appendChild(img);
			var swiperSlide = document.createElement("div");
			swiperSlide.className = "swiper-slide";
			swiperSlide.style.width = (0.927536232*width)+"px";
			swiperSlide.style.height = (0.927536232*height)+"px";
			swiperSlide.appendChild(couponDiv);
			swiper.appendSlide(swiperSlide);
	}
	//hide the loader
	$('.loader').fadeOut(1000);
	//$(".swiper-container").css({'width': width+"px", 'height': height+"px"});
	//$(".swiper-slide").css({"width": (0.927536232*width)+"px","height": (0.927536232*height)+"px"});
	//$(".swiper-slide img").css({
	//	'display': 'block',
	//	'width': '95%',
	//	'height': '95%',
	//	'left': (0.06640625*width)+"px",
	//	'top':(0.03125*width)+"px",
	//	'position': 'absolute',
	//	'border-radius': '20px'
	//});
	//$(".couponDiv").css({
	//	'width': '100%',
	//	'height': '100%',
	//	'position': 'relative'
	//});
}

Coupons.prototype.getCoupons = function() {
	var paramsBuf=this.params;
	var swiperParent = this.swiperParent;
	var swiperPrefix = this.swiperPrefix;
	var paginationPrefix = this.paginationPrefix;
	var isPrepend = this.isPrepend;
	var width = this.width;
	var height = this.height;

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
		data : this.params,
		success : function(response) {

			process(response,paramsBuf, swiperParent, swiperPrefix, paginationPrefix, isPrepend, width, height);
		},
		error: function(error) {

		}

	});
};
