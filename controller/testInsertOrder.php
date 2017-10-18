<?php
//use \model\orders\Order;
//use \model\products\Product;
use \model\users\User;
use \model\DataBase\DBManager;
//use \model\DataBase\OrderDao;
//use \model\DataBase\ProductDao;
use \model\DataBase\UserDao;
//
//require_once '../model/DataBase/ProductDao.php';
//require_once '../model/DataBase/DBManager.php';

function __autoload($class_name){
	$class_name = '..\\' . $class_name;
	$class_name = str_replace("\\", "/", $class_name);
	require_once $class_name . '.php';
}

////$ordered_products = [1 => 5, 2 => 3];
////$order = new Order(1,1000,'2017-10-10', 'OK', $ordered_products);
////
////OrderDao::getInstance() -> insertOrder($order);
//
//
//
//
////print_r($product = [0 => ['product_id' => 1, 'type' => 'Television', 'model' => '49LH630V', 'price' => 959, 'quontity' => 3, 'specifications' => ['screen_size' => '49"(123sm)', 'screen_resolution' => 'FULL HD 1920 x 1080', 'screen_technology' => 'LED'], 'images' => ['imq1','img2','img3']]]);
//
//
//$products = ProductDao::getInstance()->getAllProducts();
//echo $products;

session_start();
	if(isset($_SESSION['isLogged']) && $_SESSION['isLogged']){
		echo $_SESSION["user"]->getName();
	}
	else{
		echo false;
	}
