<?php
global $user,$base_url;
global $facebook;
require("settings.php");
require("php/facebook/facebook.php");
$config = array(
		'appId' => FB_APPID,
		'secret'=> FB_APP_SECRET,
);

$facebook = new Facebook($config);
$headers = array('partnerId:1001',
		'apiKey:d1C24bA4-4BB5-EE8b-ef85-E22ea557CC2A',
		'Accept: application/json; charset=UTF-8',
		'Content-length:0'
);

/*facebook login sucessfull*/
if(isset($_GET['access_token']) && isset($_GET['state']) && $_GET['state']=='fb'){
	$ch = curl_init("https://graph.facebook.com/me?access_token=".$_GET['access_token']);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$response = curl_exec($ch);
	curl_close($ch);
	echo $response;
	if($response != null) {		
		$ch2 = curl_init("venkat.slocamo.com/slocamo/session");
		curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch2, CURLOPT_POST, 1);
		curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
		$response = curl_exec($ch2);
var_dump($response);
		header("Location: http://venkat.slocamo.com/slocamo-webapp/stores");/* Redirect browser */
		exit();
	}
}
else {
	if(isset($_GET['fid']) && isset($_GET['fby'])) {
		$r_uri='http://venkat.slocamo.com/slocamo-webapp/projects?fid='.$_GET['fid'].'&fby='.$_GET['fby'];
	} else {
		$r_uri='http://venkat.slocamo.com/slocamo-webapp/stores';
	}
	/*generating login url for facebook*/
	$params = array(
			'scope'=> 'publish_stream,user_birthday',
			'redirect_uri' => $r_uri,
			'response_type'=>'token',
			'state'=>'fb',
	);
	$loginUrl = $facebook->getLoginUrl($params);
}

/*login with google sucessfull*/
if(isset($_GET['state']) && strlen(strstr($_GET['state'],'gg'))>0){

	$state_array=explode('_',$_GET['state']);
	$network_type="google";
	$usersInfo=file_get_contents("https://www.googleapis.com/oauth2/v1/userinfo?access_token=".$_GET['access_token']);
	$usersInfo=json_decode($usersInfo);
	$username="ulogin_google_".$usersInfo->id;
	$additional_params=array();
	if(count($state_array)>1){
		$additional_params[]=$state_array[1];
		$additional_params[]=$state_array[2];
	}
	//loginClientUser($username,$usersInfo,$network_type,$additional_params);
}

if(isset($_GET['fid']) && isset($_GET['fby'])){
	/*sending our custom parameters for forwarded by and forwarded coupon to google login*/
	$state_google='gg_'.$_GET['fid'].'_'.$_GET['fby'];
	/*sending our custom parameters for forwarded by and forwarded coupon to twitter login*/
	$twitter_param='?fid='.$_GET['fid'].'&fby='.$_GET['fby'];
}else{
	$state_google='gg';
	$twitter_param='';
}

?>

