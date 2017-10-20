<?php

use \model\DataBase\PromotionDao;
use \model\promotions\Promotion;

function __autoload($class_name){
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

session_start();


if (isset($_POST['promoProduct'])){
    $promoProduct = json_decode($_POST['promoProduct'],true);
    $startDate = trim(htmlentities($promoProduct['startDate']));
    $endDate = trim(htmlentities($promoProduct['endDate']));
    $discount = trim(htmlentities($promoProduct['discount']));
//    $productId = trim(htmlentities($promoProduct['productId']));
    //TODO get the right productId
    $productId = 6;

    $promoProduct = new Promotion($productId, $startDate, $endDate, $discount);

    try{
        $promoProductId = PromotionDao::getInstance()->insertPromotion($promoProduct);
        echo $promoProductId;
    }catch (\PDOException $e){
        // TODO error
        echo $e->getMessage();
    }


}