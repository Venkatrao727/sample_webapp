    //https://www.googleapis.com/plus/v1/people/me?access_token=ya29.1.AADtN_XPDflnjzxou33jGphVxKyD3zB-L6YMcfhwsCigQFd7FGhhhcja-Ic5GF0 to get all the details ...
        var GG_OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
        var GG_VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
        var GG_SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile';
        var GG_CLIENTID    =   '888135867731-dmp0of1khlilt1dtprnc1cnscv8diqqo.apps.googleusercontent.com';
        var GG_REDIRECT    =   Global.base_url+'/defaultRedirect.html'
        var GG_TYPE        =   'token';
        var GG_url        =   GG_OAUTHURL + 'scope=' + GG_SCOPE + '&client_id=' + GG_CLIENTID + '&redirect_uri=' + GG_REDIRECT + '&response_type=' + GG_TYPE;
        var GG_acToken;
        var GG_tokenType;
        var GG_expiresIn;
        var GG_user;
        var GG_loggedIn    =   false;

        function googlePlusLogin() {
            var win         =   window.open(GG_url, "windowname1", 'width=800, height=600'); 

            var pollTimer   =   window.setInterval(function() { 
                try {
                    if (win.document.URL.indexOf(GG_REDIRECT) != -1) {
                        window.clearInterval(pollTimer);
                        var url =   win.document.URL.replace("#", "&");
                        GG_acToken =   gup(url, 'access_token');
                        getSessionWithGooglePlusToken(GG_acToken);
                        GG_tokenType = gup(url, 'token_type');
                        GG_expiresIn = gup(url, 'expires_in');
                        win.close();
                    }
                } catch(e) {
                }
            }, 500);
        }

        function getSessionWithGooglePlusToken(accessToken) {
           $.ajax({
            type : 'GET',
            url : Global.base_url+"/auth.php",
            data : {access_token: accessToken,
            "type":"google"},
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

      /*  
      function getUserInfo() {
            $.ajax({
                url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + GG_acToken,
                data: null,
                success: function(resp) {
                    GG_user    =   resp;
                    console.log(GG_user);
                    $('#uName').text('Welcome ' + GG_user.name);
                    $('#imgHolder').attr('src', GG_user.picture);
                },
                dataType: "jsonp"
            });
        }
        */
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

       /* function startLogoutPolling() {
            $('#loginText').show();
            $('#logoutText').hide();
            GG_loggedIn = false;
            $('#uName').text('Welcome ');
            //$('#imgHolder').attr('src', 'none.jpg');
        }
        */