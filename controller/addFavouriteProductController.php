<?php

use \model\products\Product;
use \model\users\User;
use \model\DataBase\DBManager;
use \model\DataBase\FavouriteDao;
use \model\DataBase\ProductDao;
use \model\DataBase\UserDao;
use \model\favorites\Favorite;

function __autoload($class_name)
{
	$class_name = '..\\' . $class_name;
	$class_name = str_replace("\\", "/", $class_name);
	require_once $class_name . '.php';
}
session_start();

if(isset($_POST['product_id'])) {
      if(isset($_SESSION['isLogged']) ){
      	if(isset($_SESSION['user'])){
      		$product_id = $_POST['product_id'];
      		$user_id = $_SESSION['user']->getUserId();
      		$favouriteObject = new Favorite($product_id, $user_id);
	        $favourites = FavouriteDao::getInstance() -> addNewFavorite($favouriteObject);
	        if($favourites){
	        // TODO return status 200;
	        }
	        else{
	        	// TODO return status;
	        }
        }
      }
	
}