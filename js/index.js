document.addEventListener("DOMContentLoaded", function() {
	var fbBtn = document.getElementById("fbContainer");
	fbBtn.addEventListener("click", function() {
		fbLogin();
	});

	var googlePlusBtn = document.getElementById("googlePlusContainer");
	googlePlusBtn.addEventListener("click", function() {
		googlePlusLogin();
	});

	var twitterBtn = document.getElementById("twitterContainer");
	twitterBtn.addEventListener("click", function() {
		twitterLogin();
	});

});