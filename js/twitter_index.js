var REDIRECT    =   'http://vvr.slocamo.com/stores'
var TYPE        =   'token';
var TWITTER_url =   Global.base_url+'/php/twitterAuthenticate.php';
var TWITTER_REDIRECT    =   Global.base_url+'/defaultRedirect.html'
var oauthToken;
var oauth_verifier;
var loggedIn    =   false;

function twitterLogin() {
    var win         =   window.open(TWITTER_url, "windowname1", 'width=800, height=600'); 

    var pollTimer   =   window.setInterval(function() { 
        try {
            console.log(win.document.URL);
            if (win.document.URL.indexOf(TWITTER_REDIRECT) != -1) {
                window.clearInterval(pollTimer);
                var url =   win.document.URL.replace("?", "&");
                oauthToken =   gup(url, 'oauth_token');
                oauth_verifier = gup(url, 'oauth_verifier');
                console.log("oauthToken: "+oauthToken+ " oauth_verifier: "+oauth_verifier);
                getSessionWithTwitterAuthDetails(oauthToken, oauth_verifier);
                win.close();
            }
        } catch(e) {
        }
    }, 500);
}

function getSessionWithTwitterAuthDetails(oauthToken , oauth_verifier) {
      $.ajax({
            type : 'GET',
            url : Global.base_url+"/auth.php",
            data : {access_token: oauth_verifier,
            "type":"twitter"},
            success : function(response) {
                console.log(response);
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

function twitterGetUserInfo() {
    $.ajax({
        url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
        data: null,
        success: function(resp) {
            user    =   resp;
            console.log(user);
            $('#uName').text('Welcome ' + user.name);
            $('#imgHolder').attr('src', user.picture);
        },
        dataType: "jsonp"
    });
}

function gup(url, name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\#&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    if( results == null )
        return "";
    else
        return results[1];
}

function twitterStartLogoutPolling() {
    $('#loginText').show();
    $('#logoutText').hide();
    loggedIn = false;
    $('#uName').text('Welcome ');
    //$('#imgHolder').attr('src', 'none.jpg');
}