$(window).load(function(){
  $('.loader').fadeOut(1000);
});

window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '426268717447484',                        // App ID from the app dashboard
      status     : true,
      cookie     : true,                                 // Check Facebook Login status
      xfbml      : true                                  // Look for social plugins on the page
    });

    // Additional initialization code such as adding Event Listeners goes here
  };

  // Load the SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
   
   
   function fbLogout()
   {
		FB.logout(function(response){});
   }   
   function fbLogin()
   {
		FB.login(function(response) {
		if (response.authResponse) {
			 var accessToken =   FB.getAuthResponse()['accessToken'];
			 getSessionWithFacebookToken(accessToken);
			 FB.api('/me', function(response) {
			 });
	   } else {
		 console.log('User cancelled login or did not fully authorize.');
	   }
	}, {scope: 'publish_stream, user_birthday'});
   }
   
   function getFbLoginStatus()
   {
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				var accessToken = response.authResponse.accessToken;
				getSession(accessToken);
			} else if (response.status === 'not_authorized') {
				console.log("the user is logged in to Facebook, \
				 but has not authenticated your app");
			} else {
				console.log("the user isn't logged in to Facebook.");
			}
		});
   }
   
   function postToFbWall()
   {
		// popups / dialogs
		FB.ui(
		{
		   method: 'feed',
		   name: 'The Facebook SDK for Javascript',
		   caption: 'Bringing Facebook to the desktop and mobile web',
		   description: (
			  'A small JavaScript library that allows you to harness ' +
			  'the power of Facebook, bringing the user\'s identity, ' +
			  'social graph and distribution power to your site.'
		   ),
		   link: 'https://developers.facebook.com/docs/reference/javascript/',
		   picture: 'http://www.fbrell.com/public/f8.jpg'
		},
			function(response) {
				if (response && response.post_id) {
				  alert('Post was published.');
				} else {
				  alert('Post was not published.');
				}
			}
		)
   }
   
   function addFbPageTab()
   {
   		FB.ui({
			method: 'pagetab',
			redirect_uri: 'YOUR_URL'
		}, function(response){});
   }  

   function addFbFriend()
   {
		FB.ui({
			method: 'friends',
			id: 'brent'
		}, function(response){});
   }
      
	function sendFbMessage()
	{
		FB.ui({
			method: 'send',
			link: 'http://www.bbc.co.uk',
		});
   }	
   
function getSessionWithFacebookToken(accessToken) {
	$.ajax({
		type : 'GET',
		url : Global.base_url+"/auth.php",
		data : {access_token: accessToken,
			"type":"facebook"},
		success : function(response) {
		var session = JSON.parse(response);
			localStorage.session_key = session.session_key;
			localStorage.session_secret = session.session_secret;
			window.location = Global.base_url+"/stores.html";
		},

		error: function(error) {
			console.log(error);
		}
	});
}


