<?php

use \model\DataBase\ProductDao;

function __autoload($class_name){
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

if (isset($_GET['getMatchedWords'])){
    $searched = $_GET['getMatchedWords'];
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

//        echo json_encode(ProductDao::getInstance()->getSearchedMatches($_GET['getMatchedWords']));
    }catch (\PDOException $e){
        //TODO error
    }

}