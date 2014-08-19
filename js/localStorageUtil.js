function LocalStorageUtil() {

}

LocalStorageUtil.isLocalStorageSupported = function() {
	return (typeof (Storage) !== "undefined");	
}

LocalStorageUtil.setToLocalStorage = function(key,value) {

		if (typeof (Storage) !== "undefined") {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			alert("localStorage is not supported in this browser, This app works only if localStorage is supported");
		}
}


LocalStorageUtil.getFromLocalStorage = function(ele) {
	if (typeof (Storage) !== "undefined") {
		// getting from local storage.
		// TODO: If === -1 should we request user to get location details again
		// ?
		try {
			return JSON.parse(localStorage.getItem(ele));
		} catch(e) {
			return localStorage.getItem(ele);
		}
	}
	return -1;
}


LocalStorageUtil.setTextToLocalStorage = function(key,value) {

		if (typeof (Storage) !== "undefined") {
			localStorage.setItem(key, value);
		} else {
			alert("localStorage is not supported in this browser, This app works only if localStorage is supported");
		}
}


LocalStorageUtil.getTextFromLocalStorage = function(ele) {
	if (typeof (Storage) !== "undefined") {
		// getting from local storage.
		// TODO: If === -1 should we request user to get location details again
		// ?
		return JSON.parse(ele);
	}
	return -1;
}