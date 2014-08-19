/** TODO:Must make all validations to check if the browser supports html5 */

// Scroll related variables
var myScroll, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset, generatedCount = 0;

var imageLocation = "images/";

// Default is set to all
var userSelectedTab = 3;

$(window).load(function(){
  $('.loader').fadeOut(1000);
});

var scrollPrefixes = ['recents-', 'nearby-', 'favs-', 'all-'];
var pullUpEls = [];
var scrolls = [];
var catBtnsClicked = [false, false, false, false];
// --------------------------------------

function createScroll(srollPrefix) {
	//var pullUpOffset = pullUpEl.offsetHeight;
	var scroll = new iScroll(
			srollPrefix+'wrapper',
			{
				//For now getting stores in one query, not supporting any pagination, 
				//will have to consider if we have more than 100 stores

				/*useTransition : true,
				onRefresh : function() {
					if (pullUpEl.className.match('loading')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
					}
				},
				onScrollMove : function() {
					if (this.y < (this.maxScrollY - 5)
							&& !pullUpEl.className.match('flip')) {
						pullUpEl.className = 'flip';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
						this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 5)
							&& pullUpEl.className.match('flip')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
						this.maxScrollY = pullUpOffset;
					}
				},
				onScrollEnd : function() {
					if (pullUpEl.className.match('flip')) {
						pullUpEl.className = 'loading';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
						getStores(true);
					}
				}*/
			});
	setTimeout(function() {
		document.getElementById(srollPrefix+'wrapper').style.left = '0';
	}, 800);

	return scroll;
}

function loadScrolls() {
	var pullUpOffsets = [];
	for(var i=0;i<scrollPrefixes.length;i++) {
		//pullUpEls[i] = document.getElementById(scrollPrefixes[i]+'pullUp');	
		scrolls[i] = createScroll(scrollPrefixes[i]);
	}

	// Loading stores
	getStores();
}



function addStoreBtnEvents() {
	// for search
	var searchBtn = document.getElementById("searchBtn");
	searchBtn.addEventListener("click", function() {
		addClass(this, "hide");
		addClass(document.getElementById("searchContainer"), "search-clicked");
	});

	var searchContainerBtn = document.getElementById("searchContainerBtn");
	searchContainerBtn.addEventListener("click", function(e) {
		userSelectedTab = "search";
		getStores(false);
	});

	$(".storeslist").each(function(index, e) {
	var that = e;
	$(e).bind("click", function(e) {
			var storeEntry = $(e.target).closest('li').find('.storeEntry');
			var clickedStoreId = storeEntry.attr('storeid');
			var recentStoreHTML = $(e.target).closest('li').wrapAll('<div></div>').parent().html();		
			if(typeof(localStorage) !== undefined) {
				if(localStorage.getItem("recentStores") == 'undefined' || localStorage.getItem("recentStores") == null) {
					var recentStoreItem = {"clickedStoreId" : recentStoreHTML};
					localStorage.setItem("recentStores", JSON.stringify(recentStoreItem));
				} else {
					var recentStoresArr = JSON.parse(localStorage.getItem("recentStores"));
					delete recentStoresArr["clickedStoreId"];
					recentStoresArr[clickedStoreId] = recentStoreHTML; 
					localStorage.recentStores = JSON.stringify(recentStoresArr);
				}
			}
			window.location.href = Global.base_url+"/deals.html?storeId="+clickedStoreId;
		});
	});

	//Btn events for all, recent, nearby, favs
	$(".storeBtn").each(function(index, e) {
		var that = e;
		$(e).bind("click", function(e) {
			e.preventDefault();
			$(".storeBtn").removeClass("storeBtnSelected");
			$(".stores-wrapper").addClass("hide");
			$(that).addClass("storeBtnSelected");
			userSelectedTab = $(this).attr("category");
			$("#"+scrollPrefixes[userSelectedTab]+"wrapper").removeClass("hide");
			//Refreshing the scroll
			scrolls[userSelectedTab].refresh();
			if(catBtnsClicked[userSelectedTab] != true) {
				getStores();	
			}
			
		});
	});
}

function getStores() {
	var params;

	if (userSelectedTab === "1") {
		getNeabyStores();
	} else if (userSelectedTab === "2") {
		params = {
			type : "favs",
		};
		loadStoresFromServices(params);
	} else if (userSelectedTab == "0") {
		getRecentStores();
	} else if (userSelectedTab == "search") {
		/*if (searchEnded === true) {
			addClass(document.getElementById("pullUp"), "hide");
			return;
		}*/
		var searchText = document.getElementById("searchTxt").value;
		var params = {
			"search-param" : searchText
		};
		loadStoresFromServices(params);
	} else {
		params = {
		};
		loadStoresFromServices(params, scrollPrefixes[userSelectedTab]);
	}
	// Hiding pull up as none of the above cases met.
}

function getNeabyStores() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(storeLocation, storeError, {
            							enableHighAccuracy : true,
            							timeout : 10000, // 10s
          							});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}


function storeLocation(position) {
		// Storing location details in the local cache.
	if (typeof (Storage) !== "undefined") {
		var latLng = {
			lat : position.coords.latitude,
			lng : position.coords.longitude
		};
		localStorage.setItem("latLng", JSON.stringify(latLng));
	}
	loadNeabyStores(latLng);
}

function storeError(error) {
	if(localStorage.latLng == null) {
	switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      alert("Near by list cannot be populated as location is not shared.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      //x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    }
		$('.loader').fadeOut(1000);
	} else {
		//loading from last stored location, as the user did not share the location
		loadNeabyStores(JSON.parse(localStorage.latLng));
	}
}


function loadNeabyStores(latLng) {
//Ask for user location only when user clicks on nearby tab.
		params = {
			lat : latLng.lat,
			lng : latLng.lng
		};
		loadStoresFromServices(params, scrollPrefixes[userSelectedTab]);
}


function getRecentStores() {
	$('.loader').fadeOut(1000);
	var recentStoresStr = localStorage.recentStores;
	if(localStorage.recentStores == null || localStorage.recentStores == undefined) {
		$('#storeslist').html('No recent Stores available');	
	} else {
		var storeListHTML = "";
		var recentStores = JSON.parse(recentStoresStr);
		$.each(recentStores, function(key, value) {
			storeListHTML = storeListHTML+value;
		});
		$("#recents-storeslist").html(storeListHTML);
	}
	
	scrolls[userSelectedTab].refresh();
}

// Adding functions in jquery
function loadStoresFromServices(params, prefix) {
	var currentTime = new Date();
	var currentTimeStr = currentTime.toString().split(' ').join('+');
	//console.log("sessionKey :"+localStorage.session_key);
	//console.log("signature :"+ CryptoJS.SHA1(localStorage.session_secret+currentTimeStr));
	//console.log("currentTime :"+currentTimeStr);
	$.ajax({
		headers : {
			sessionKey : localStorage.session_key,
			signature : CryptoJS.SHA1(localStorage.session_secret+currentTimeStr),
			currentTime: currentTimeStr
		},
		type : 'GET',
		dataType : "json",
		url : Global.serice_url+"/stores",
		data : params,
		success : function(response) {
			var storeList = response.storeList;
			if(storeList == undefined) {
				alert("No stores");
				return;
			}
			storesCount = storeList.length;
			for ( var i = 0; i < storesCount; i++) {
				var li = $("<li></li>");
				li.addClass("pointer");
				var storeContainer = $("<div class='storeEntry'></div>");
				storeContainer.attr('storeId', storeList[i].idstore);
				var img = $("<img src='" + imageLocation + "storesIcon.png"
						+ "'/>");
				var imgWrapper = $("<div class='storeLogoContainer'></div>")
						.append(img);

				// creating a button element
				var listCaret = document.createElement("DIV");
				listCaret.style.backgroundImage = "url('"+imageLocation+"list-arrow.png')";
				listCaret.setAttribute("class", "storeInfoButton");
			
				storeContainer.append(imgWrapper);

				storeContainer.append("<span>" + storeList[i].store_title
						+ "</span>");
				storeContainer.append(listCaret);
				li.append(storeContainer);
				$('#'+prefix+'storeslist').append(li);
			}
			scrolls[userSelectedTab].refresh();
		},
		error : function(xhr, status, error) {
			if(xhr.status === 401) {
				alert("Please login, Click OK to redirect you to login page ...");
				window.location=Global.base_url+"/index.html";
			}
		}
	});
	//Setting the selected tab as true
	catBtnsClicked[userSelectedTab] = true;
	$('.loader').fadeOut(1000);
}


function postFavs(params) {
	$.ajax({
		headers : {
		
			"Content-Type" : "application/x-www-form-urlencoded"	
		},
		type : 'POST',
		dataType : "json",
		url : Global.serice_url+"/stores/favs",
		data : params,
		success : function(response) {
			
		},
		error : function(xhr, status, error) {
			if(xhr.status == 201) {
				alert("Added to favs");
				return;
			}
			alert("Error in adding store to favs");
		}
	});
}

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', function() {
	setTimeout(function() {
		loadScrolls();
		addStoreBtnEvents();
	}, 200);
}, false);
