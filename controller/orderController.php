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

if(isset($_POST['confirmedOrder']) && isset($_SESSION['isLogged']) && $_SESSION['isLogged']){
	$userId = $_SESSION['user']->getUserId();
	$dateOrder = $date = date("Y-m-d h:i:sa");
	for($i = 0; )
	$orderAddress = trim(htmlentities($_POST['address']));
	OrderDao::getInstance() -> insertOrder($email, $password);
}