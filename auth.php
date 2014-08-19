<?php
//TODO: handle exceptions by surrounding with a try catch ??
require_once('php/twitteroauth/twitteroauth.php');
require_once('php/config.php');
$googleplus = "google";
$facebook = "facebook";
$twitter = "twitter";
session_start();
if(isset($_GET['access_token']) && isset($_GET['type'])) {
        if(strcmp($_GET['type'], $googleplus) == 0) {
                execGoogleAuth($_GET['access_token']);         
        } else if(strcmp($_GET['type'], $facebook) == 0) {
                execFacebookAuth($_GET['access_token']);
        } else if(strcmp($_GET['type'], $twitter) == 0) {
                execTwitterAuth($_GET['access_token']);
        } else {
             echo('{"error":"Invalid Provider"}');
        }
} else {
        //Insufficient details passed
        echo('{"error":"Invalid Details passed"}');
}

function execGoogleAuth($token) {
        $ch = curl_init("https://www.googleapis.com/oauth2/v1/userinfo?access_token=".$token);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        curl_close($ch);
        $json_response = json_decode($response);
        if(isset($json_response->id) && !isset($json_response->error)) {
                getSession($json_response->id);
        } else {

                throwError(); 
        }
}

function execFacebookAuth($token) {
         $ch = curl_init("https://graph.facebook.com/me?access_token=".$token);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        curl_close($ch);
        $json_response = json_decode($response);
        if(isset($json_response->id) && !isset($json_response->error)) {
                getSession($json_response->id);
        } else {

                throwError(); 
        }
}

function execTwitterAuth($access_token) {
    $connection = $_SESSION['connection'];
    $user = $connection->getAccessToken($access_token);
    $userInfo = $connection->get('account/verify_credentials');
    
    if($userInfo->screen_name != null) {
        getSession($userinfo->screen_name);
    } else {
        throwError();
    }
}

function getSession($networkUniqueId) {
        $requestParams = array('type'=>$_GET['type'],
                               'access-token'=>$_GET['access_token'],
                               'network-unique-id'=> $networkUniqueId
                               );
        $fields_string = "";
        foreach($requestParams as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
        rtrim($fields_string, '&');

        $headers = array('partnerId: 1001',
                'apiKey:'.sha1('d1C24bA4-4BB5-EE8b-ef85-E22ea557CC2A'),
                'Accept: application/json; charset=UTF-8',
                'Content-length: '.strlen($fields_string)
                );

                $ch2 = curl_init("http://localhost:8080/slocamo_svcs/session");
                curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($ch2, CURLOPT_POST, 1);
                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch2 , CURLOPT_POST, count($requestParams));
                curl_setopt($ch2,CURLOPT_POSTFIELDS, $fields_string);
                $response = curl_exec($ch2);
                curl_close($ch2);
                $jsonResponse = json_decode($response);
                $op = '{"session_key":"'.$jsonResponse->{"session_key"}.'", "session_secret":"'.$jsonResponse->{"session_secret"}.'"}';
                echo($op);
}

function throwError() {
        echo('{"error":"InvalidToken"}');
}
?>
