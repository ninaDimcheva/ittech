<?php

use \model\orders\Order;
use\model\orders\OrderProducts;
use \model\products\Product;
use \model\users\User;
use \model\DataBase\DBManager;
use \model\DataBase\OrderDao;
use \model\DataBase\ProductDao;
use \model\DataBase\UserDao;

function __autoload($class_name) {
	$class_name = '..\\' . $class_name;
	$class_name = str_replace("\\", "/", $class_name);
	require_once $class_name . '.php';
}

session_start();


// TODO rethink about this script very carefully !!!!!!!!!!!!!!!!!!!!!!!


if(isset($_POST['confirmedOrder']) && isset($_SESSION['isLogged']) && $_SESSION['isLogged']){
	$arrayCartObjects = array();
	$userId = $_SESSION['user']->getUserId();
	for($i = 0; $i < count($_SESSION['cart']); $i++){
		$productId = $_SESSION['cart'][$i] -> product_id;
		$quantityProductOrdered = $_SESSION['cart'][$i] -> orderedQuantity;
		$objectProductCart = new OrderProducts($productId, $quantityProductOrdered);
		$arrayCartObjects[] = $objectProductCart;
	}
	$orderAddress = trim(htmlentities($_POST['address']));
	OrderDao::getInstance() -> insertOrder($email, $password);
}