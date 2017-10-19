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
    try{
        if(ProductDao ::getInstance() -> getAllProducts()){
            print_r(ProductDao ::getInstance() -> getAllProducts());
        }
        else{
//            TODO    header('Location:../?page=error');
        }
    }catch (\PDOException $e){
//            TODO    header('Location:../?page=error');
    }

$products = ProductDao::getInstance()->getAllProducts();
//for($i = 0; $i < count($products); $i++){
//	echo $products[$i]->getProductId();
//	echo $products[$i]->getPrice();
//}
//var_dump($products);
	if($products){
	echo json_encode($products, JSON_UNESCAPED_SLASHES);
	}
	else{
		header("Location:?page=error");
	}



