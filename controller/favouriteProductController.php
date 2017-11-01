<?php

use \model\users\User;
use \model\DataBase\FavouriteDao;
use \model\favorites\Favorite;
use \model\DataBase\ProductDao;

function __autoload($class_name)
{
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

session_start();

if (isset($_GET['infavorites'])) {
    if (isset($_SESSION['user'])) {
        $response['isLogged'] = true;
        $response['isAdmin'] = $_SESSION['user']->getIsAdmin();
        $productId = $_GET['infavorites'];
        $userId = $_SESSION['user']->getUserId();


        $favouriteObject = new Favorite($productId, $userId);

        try {
            $response['inFavorites'] = FavouriteDao::getInstance()->inFavorites($favouriteObject);
            echo json_encode($response);
        } catch (\PDOException $e) {
            http_response_code(500);
        }
    } else {
        $response['isLogged'] = false;
        echo json_encode($response);
    }
}

if (isset($_GET['addFavourite'])) {
    if (isset($_SESSION['user'])) {
        $productId = $_GET['addFavourite'];
        $userId = $_SESSION['user']->getUserId();

        $favouriteObject = new Favorite($productId, $userId);
        try {
            FavouriteDao::getInstance()->addFavourite($favouriteObject);
        }catch (\PDOException $e) {
            http_response_code(500);
        }
    } else {
        http_response_code(401);
    }
}

if (isset($_GET['removeFavourite'])) {
    if (isset($_SESSION['user'])) {
        $productId = $_GET['removeFavourite'];
        $userId = $_SESSION['user']->getUserId();

        $favouriteObject = new Favorite($productId, $userId);
        try {
            FavouriteDao::getInstance()->removeFavorite($favouriteObject);
        }catch (\PDOException $e) {
            http_response_code(500);
        }
    } else {
        http_response_code(401);
    }
}

if (isset($_POST['getFavorites'])){
    if (isset($_SESSION['user'])){
        $userId = $_SESSION['user']->getUserId();
        $isAdmin = $_SESSION['user']->getIsAdmin();
        try{
            $products = ProductDao::getInstance()->getFavorites($userId);
            if ($products){
                $products[] = $isAdmin;
                echo json_encode($products);
            }else{
                echo false;
            }
        }catch (\PDOException $e){
            http_response_code(500);
        }
    }else{
        http_response_code(401);
    }
}