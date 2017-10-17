<?php
session_start();

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

$products = ProductDao::getInstance()->getAllProducts();
if($products){
	echo json_encode($products, JSON_UNESCAPED_SLASHES);
}
else{
	header("Location:view/error.html");
}

