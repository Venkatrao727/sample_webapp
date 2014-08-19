<script type="text/javascript">
var url=window.location.href;
if(url.indexOf('#')!=-1){
     if(url.indexOf('?')!=-1) {
          window.location.replace(url.replace('#', '&'));
 }
 else{
      window.location.replace(url.replace('#', '?'));
 }
}
</script>
<?php
include("page.tpl.php");?>
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Slocamo</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width,initial-scale=1">

	<link rel="stylesheet" href="css/styles.css">
	<script data-main="js/main" src="js/libs/require/require.js"></script>
</head>
<body>
  <div class="navbar navbar-static-top headerbg">
  </div>
 <div class="container" id="main">
   <p>Loading ...</p>
</div>
<div id="footer" class="hide"></div>
<!-- <div id="page"></div>-->
<!--<img src="imgs/preloader.gif" class="preloader"/>-->
  </div>

  <div class="row">
	<div class="col-lg-8 col-lg-offset-2">
		<h4 class="center">"A free Social Local Mobile App for users to rate
				satisfaction with merchants, receive best deals from merchants and
				share the best deals with your friends"
		</h4>
	</div>
</div>
<div class="row" style="margin-top: 15%">
	<div class="col-lg-8 col-lg-offset-2">
		<h4 class="center">
			Login into app by:
		</h4>
	</div>
</div>
<div class="row" style="margin-left: 4.66666%">
        <div class="col-xs-3">
                <a data-bypass="1" href="https://www.facebook.com/dialog/oauth?client_id=426268717447484&redirect_uri=http://venkat.slocamo.com/slocamo-webapp/stores&state=fb&scope=publish_stream,user_birthday&response_type=token">
                <img id="fbbtn" src="imgs/facebook.png" class="img-responsive pointer" />
                 </a>
        </div>
        <div class="col-xs-3 col-xs-offset-1">
         <a data-bypass="1" href="localhost/slocamo-webapp/client/twitterLogin">
                <img src="imgs/twitter.png" class="img-responsive pointer" />
                </a>
        </div>
        <div class="col-xs-3  col-xs-offset-1">
        <a data-bypass="1" href="https://accounts.google.com/o/oauth2/auth?response_type=token&client_id=<?php echo GG_CLIENTID; ?>&redirect_uri=http://www.slocamo.com/client&scope=https://www.googleapis.com/auth/userinfo.profile&state=<?php echo $state_google; ?>">
                <img src="imgs/googleplus.png" class="img-responsive pointer" />
                </a>
        </div>
</div>
</div>




</body>
</html>

