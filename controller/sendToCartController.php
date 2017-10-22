<?php
session_start();

// this query comes from showAllProductsJS.js -> the button under each panel:

if(isset($_POST['object']) && isset($_SESSION['isLogged']) && isset($_SESSION['user'])){
		$_SESSION['productCart'][] =  json_decode($_POST['object']);
}

// this query comes from viewSingleProductJS.js -> the button in each page, that visualize one product:

if(isset($_POST['singleProductToBuy']) && isset($_SESSION['isLogged']) && isset($_SESSION['user'])){
	$_SESSION['productCart'][] = json_decode($_POST['singleProductToBuy']);
}

if(isset($_POST['getCartProducts'])){
	echo json_encode($_SESSION['productCart'], JSON_UNESCAPED_SLASHES);
}







