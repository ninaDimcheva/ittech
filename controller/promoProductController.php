<?php

use \model\DataBase\PromotionDao;
use \model\promotions\Promotion;
use \model\products\Product;

function __autoload($class_name)
{
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

session_start();


if (isset($_POST['addPromoProduct'])) {
    $promoProduct = json_decode($_POST['addPromoProduct'], true);
    $startDate = trim(htmlentities($promoProduct['startDate']));
    $endDate = trim(htmlentities($promoProduct['endDate']));
    $discount = trim(htmlentities($promoProduct['discount']));
    $productId = trim(htmlentities($promoProduct['productId']));

    $promoProduct = new Promotion($productId, $startDate, $endDate, $discount);

    try {
        if(PromotionDao::getInstance()->insertPromotion($promoProduct)){
            //TODO return status code 200
        }else{
            //TODO propper status code
        }
    } catch (\PDOException $e) {
        // TODO error
        echo $e->getMessage();
    }
}

if (isset($_GET['removePromoProduct'])){
    $productId =  $_GET['removePromoProduct'];
    try{
        if (PromotionDao::getInstance()->deletePromotion($productId)){
            //TODO return status code 200
        }else{
            //TODO propper status code
        }
    }catch (\PDOException $e){
        //TODO error
    }

}

