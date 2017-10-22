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
if (isset($_GET['getAllProducts'])) {
    if (isset($_SESSION['user'])){
       $isAdmin =  $_SESSION['user']->getIsAdmin();
    }else{
        $isAdmin = false;
    }
	try {
		$products = ProductDao ::getInstance() -> getAllProducts($_GET['getAllProducts']);

		if ($products) {
		    if ($products == $_GET['getAllProducts']){
		        //return the serched word
		        echo $products;
            }else{
		        //add isAdmin value in the last element of the array with products
                $products[] = $isAdmin;
		        //return the searched products or all if there is no search
                echo json_encode($products, JSON_UNESCAPED_SLASHES);
            }

		}
		else {

//            TODO    header('Location:../?page=error');
		}
	}
	catch (\PDOException $e) {
//            TODO    header('Location:../?page=error');
	}
}

// sets in session the product which must be visualized;
if(isset($_POST['object'])){
		$_SESSION['viewProduct'] = json_decode($_POST['object']);
}

if (isset($_POST['promoProductObj'])){
    $_SESSION['promoProductObj'] = $_POST['promoProductObj'];
}


