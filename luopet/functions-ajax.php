<?php

add_action('wp_ajax_recaptcha',             'recaptcha');
add_action('wp_ajax_nopriv_recaptcha',      'recaptcha');

function recaptcha() {
	$token  = $_POST['token'];
	$secret = '6LdlqLAUAAAAAEciViHbDF3qwPW3-QIsWNL2j4cY';

    $fields = array(
		'response' => $token,
		'secret'   => $secret
    );

    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify'); 
    curl_setopt($ch, CURLOPT_NOBODY, TRUE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE); 
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields); 
    $response = curl_exec($ch); 
 
    curl_close($ch); 

    echo $response;
    exit;
}