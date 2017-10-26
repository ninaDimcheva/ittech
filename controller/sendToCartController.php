<?php
use \model\orders\Order;
use \model\products\Product;
use \model\users\User;
use \model\DataBase\DBManager;
use \model\DataBase\OrderDao;
use \model\DataBase\ProductDao;
use \model\DataBase\UserDao;

function __autoload($class_name)
{
	$class_name = '..\\' . $class_name;
	$class_name = str_replace("\\", "/", $class_name);
	require_once $class_name . '.php';
}

session_start();

// this query comes from viewSingleProductJS.js and showAllProductsJS.js

if (isset($_POST['singleProductToBuy'])) {
	$isNewProduct = true;
	$newProductId = json_decode($_POST['singleProductToBuy']) -> product_id;
	for ($i = 0; $i < count($_SESSION['cart']); $i ++) {
		if ($_SESSION['cart'][$i] -> product_id == $newProductId) {
			$isNewProduct = false;
			break;
		}
	}
	if ($isNewProduct) {
		$_SESSION['cart'][] = json_decode($_POST['singleProductToBuy']);
	}
}

if (isset($_POST['getCartProducts'])) {
	echo json_encode($_SESSION['cart'], JSON_UNESCAPED_SLASHES);
}

if(isset($_GET['deleteProductFromCart'])){
	$deleteProductID = $_GET['deleteProductFromCart'];
	array_splice($_SESSION['cart'], $deleteProductID, 1);
	echo "Deleted";
}











