<?php
use \model\orders\Order;
use \model\products\Product;
use \model\users\User;
use \model\DataBase\DBManager;
use \model\DataBase\OrderDao;
use \model\DataBase\ProductDao;
use \model\DataBase\UserDao;

require_once '../model/DataBase/ProductDao.php';
require_once '../model/DataBase/DBManager.php';

function __autoload($class_name)
{
	$class_name = '..\\' . $class_name;
	$class_name = str_replace("\\", "/", $class_name);
	require_once $class_name . '.php';
}

session_start();
if(isset($_GET['islogged'])){
	if (isset($_SESSION['isLogged']) && $_SESSION['isLogged']) {
		echo $_SESSION["user"] -> getName();
	}
	else {
		echo false;
	}
	
}

