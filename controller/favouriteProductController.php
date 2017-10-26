<?php

use \model\users\User;
use \model\DataBase\FavouriteDao;
use \model\favorites\Favorite;

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
            //TODO error
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
            //TODO error
        }
    } else {
        //TODO error
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
            //TODO error
        }
    } else {
        //TODO error
    }
}