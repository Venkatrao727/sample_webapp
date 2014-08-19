var rangeInMeters = 15000;
var map;
var localStorageUtil = new LocalStorageUtil();
var latLng = "latLng";
var mapStores = new Stores();
var isLoadedOnce = false;
function initialize() {
	var getLastStoredLocation = localStorageUtil.getFromLocalStorage("latLng");
	var lat = 0;
	var lng = 0;
	if(getLastStoredLocation != -1) {
		lat = getLastStoredLocation.lat;
		lng = getLastStoredLocation.lng;
	}

	var mapOptions = {
			center: new google.maps.LatLng(lat, lng),
			zoom: 8
	};

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	//Adding handler if bounds changed
	map.addListener('bounds_changed',  (function () {
    var timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            boundsChangedHandler();
        }, 500);
    }
}()));
	if (!navigator.geolocation) {
		alert("Sorry, your browser does not support geolocation!");
		latitude = "";
		longitude = "";
		// getStores(latitude, longitude);
		executeTimeOut = 0;
		// TODO: Need to display all the stores ?
		return;
	}


	geoLoc = navigator.geolocation;
	var options = {};
	watchID = geoLoc.watchPosition(locationSuccessHandler,
			locationErrorHandler, options);
	/* check for users location in every 10 seconds */
	window.setInterval(function() {
							geoLoc.clearWatch(watchID)
							watchID = geoLoc.watchPosition(locationSuccessHandler,
									locationErrorHandler, options);
						}, 10000);
}


function locationSuccessHandler(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	var previousLatLng = localStorageUtil.getFromLocalStorage("latLng");
	//Preventing unnecessary calls if the user is already at the same location
	if(previousLatLng !== "undefined" && previousLatLng !== null && previousLatLng != -1) {
		if(previousLatLng.lat === lat && previousLatLng.lng === lng && isLoadedOnce) {
			console.log("location not changed");
			return;
		}
	}
	isLoadedOnce = true;
	var latLng = {
			lat : lat,
			lng : lng
	};
	// Storing location details in the local storage.
	localStorageUtil.setToLocalStorage("latLng",latLng);

	var params = {
			lat: lat,
			lng: lng,
			"range-in-meters": rangeInMeters
	};
	mapStores.setParams(params);
	mapStores.getStores();
}

function locationErrorHandler(error) {

}

// A custom successhandler, creates all the markers for the stores
mapStores.successHandler = function(response) {
	var storeList = response.storeList;
	
	if(storeList.length == 0) {
		return;
	}
	
	var i=0;
	var locationsArray = [];

	var infowindow = new google.maps.InfoWindow();

	for(i=0;i < storeList.length;i++) {
		locationsArray[i] = [storeList[i].store_title, storeList[i].location_latitude, storeList[i].location_longitude];
	}
	for (i = 0; i < locationsArray.length; i++) { 
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locationsArray[i][1], locationsArray[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			infowindow.setContent(locationsArray[i][0]);
			infowindow.open(map, marker);
		}
	})(marker, i));
	}
	// TODO: have to check if the location is available, otherwise do some logic
	// like showing all the stores on the map e.t.c
	// TODO: Perform a check if the session details are present

}

function boundsChangedHandler() {
							var currentZoomLevel = map.getZoom();
						//	if (lastZoomLevel != 0) {
								/*
								 * if user has zoomed in then get markers which
								 * will come in bounds
								 */
							//	if (lastZoomLevel > currentZoomLevel) {
									/* get stores as per new zoom level */
									var bounds = map.getBounds();
									var southWest = bounds.getSouthWest();
									var northEast = bounds.getNorthEast();

									var startLat_temp = northEast.lat();
									var endLat_temp = southWest.lat();
									var startLng_temp = northEast.lng();
									var endLng_temp = southWest.lng();

									startLat = startLat_temp;
									endLat = endLat_temp;
									startLng = startLng_temp;
									endLng = endLng_temp;

									if (endLat_temp > startLat_temp) {
										startLat = endLat_temp;
										endLat = startLat_temp;
									}
									if (endLng_temp > startLng_temp) {
										startLng = endLng_temp;
										endLng = startLng_temp;
									}

									var params = {
													'start-lat' : startLat,
													'end-lat' : endLat,
													'start-lng' : startLng,
													'end-lng' : endLng
												};
									mapStores.setParams(params);
									mapStores.getStores();	
								//	createListView();

							//	}
							//}
							//lastZoomLevel = currentZoomLevel;
};

google.maps.event.addDomListener(window, 'load', initialize);
