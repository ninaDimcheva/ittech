<?php

use \model\DataBase\ProductDao;

function __autoload($class_name){
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

if (isset($_GET['getMatchedWords'])){
    $searched = trim(htmlentities($_GET['getMatchedWords']));
    try{
        $matchedProducts = ProductDao::getInstance()->getSearchedMatches($searched);
        foreach ($matchedProducts as $matchedProduct) {
            foreach ($matchedProduct as $item) {
                if (stripos($item,$searched) !== false){
                    $matched[] = $item;
                }
            }
        }
        echo json_encode(array_unique($matched));
    }catch (\PDOException $e){
        http_response_code(500);
    }

}

if (isset($_POST['getSearchedProducts'])){
    $searched = trim(htmlentities($_POST['getSearchedProducts']));
    if (isset($_SESSION['user'])) {
        $isAdmin = $_SESSION['user']->getIsAdmin();
    } else {
        $isAdmin = false;
    }
    try {
        $matchedProducts = ProductDao::getInstance()->search($searched);
        if ($matchedProducts){
            $matchedProducts[] = $isAdmin;
            echo json_encode($matchedProducts);
        }else{
            return false;
        }
    }catch (\PDOException $e){
        http_response_code(500);
    }

}