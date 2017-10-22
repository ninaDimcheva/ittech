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
		$name = $_SESSION["user"] -> getName();
		$admin = $_SESSION["user"] -> getIsAdmin();
		$user = array();
		$user["$name"] = $admin;
		echo json_encode($user, JSON_UNESCAPED_SLASHES);
	}
	else {
		echo false;
	}
	
}

