<?php
use \model\orders\Order;
use \model\products\Product;
use \model\users\User;
use \model\DataBase\DBManager;
use \model\DataBase\OrderDao;
use \model\DataBase\ProductDao;
use \model\DataBase\UserDao;

//require_once '../model/DataBase/ProductDao.php';
//require_once '../model/DataBase/DBManager.php';

function __autoload($class_name)
{
	$class_name = '..\\' . $class_name;
	$class_name = str_replace("\\", "/", $class_name);
	require_once $class_name . '.php';
}

session_start();

if (isset($_GET['isLogged'])){
    if (isset($_SESSION['user'])){
        echo json_encode($_SESSION['user'], JSON_UNESCAPED_SLASHES);
    }else{
        echo false;
    }
}

if(isset($_GET['isSetUser']) && isset($_SESSION['isLogged']) && $_SESSION['isLogged']){
	$email = $_SESSION['user']->getEmail();
	echo $email;
}



