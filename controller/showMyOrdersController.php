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


if(isset($_POST['getOrdersUser'])){
	$user = $_SESSION['user'];
	try{
        $orders = OrderDao::getInstance()->getOrders($user);
        echo json_encode($orders, JSON_UNESCAPED_SLASHES);
    }catch (\PDOException $e){
        http_response_code(500);
    }

}

