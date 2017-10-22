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

if (isset($_POST['getPromoProduct'])) {
    if (isset($_SESSION['promoProductObj'])) {
        $promoProduct = $_SESSION['promoProductObj'];
        unset($_SESSION['promoProductObj']);
        echo $promoProduct;
    } else {
        //TODO error
    }
}

if (isset($_POST['promoProduct'])) {
    $promoProduct = json_decode($_POST['promoProduct'], true);
    $startDate = trim(htmlentities($promoProduct['startDate']));
    $endDate = trim(htmlentities($promoProduct['endDate']));
    $discount = trim(htmlentities($promoProduct['discount']));
    $productId = trim(htmlentities($promoProduct['productId']));

    $promoProduct = new Promotion($productId, $startDate, $endDate, $discount);

    try {
        $promoProductId = PromotionDao::getInstance()->insertPromotion($promoProduct);
        echo $promoProductId;
    } catch (\PDOException $e) {
        // TODO error
        echo $e->getMessage();
    }
}