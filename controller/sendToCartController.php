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
	$newProductId = json_decode($_POST['singleProductToBuy'], true)['product_id'];
	for ($i = 0; $i < count($_SESSION['cart']); $i ++) {
		$array = get_object_vars($_SESSION['cart'][$i]);
		foreach ($array as $key => $value) {
			if ($key == 'product_id') {
				if ($value == $newProductId) {
					$isNewProduct = false;
					break;
				}
			}
		}
		if (!$isNewProduct) {
			break;
		}
	}
	
	if($isNewProduct){
		$_SESSION['cart'][] = json_decode($_POST['singleProductToBuy']);
	}
}

if (isset($_POST['getCartProducts'])) {
	echo json_encode($_SESSION['cart'], JSON_UNESCAPED_SLASHES);
}

if(isset($_GET['deleteProductFromCart'])){
	$deleteProductID = $_GET['deleteProductFromCart'];
	for ($i = 0; $i < count($_SESSION['cart']); $i ++) {
		if($i == $deleteProductID){
			array_splice($_SESSION['cart'], $deleteProductID, 1);
			// array_splice is used on purpose, because the function reindex the array in the $_SESSION['cart'];
		}
	}
	echo "Deleted";
}










