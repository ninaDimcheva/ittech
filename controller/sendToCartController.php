<?php
session_start();
if(isset($_POST['object']) && isset($_SESSION['isLogged']) && isset($_SESSION['user'])){
		$_SESSION['productToCart'] = json_decode($_POST['object']);
}

if(isset($_POST['getProductObject']) && isset($_SESSION['isLogged']) && isset($_SESSION['user'])){
	echo json_encode($_SESSION['productToCart'], JSON_UNESCAPED_SLASHES);
}




