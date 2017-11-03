<?php

use \model\DataBase\PromotionDao;
use \model\promotions\Promotion;
use \model\DataBase\ProductDao;
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
        $emails = PromotionDao::getInstance()->insertPromotion($promoProduct);
        foreach ($emails as $email) {
            $to      = $email['email'];
            $subject = 'New promotion';
            $message = "<h1>New product in promotion!!!</h1>
            <img src='http://abcwindowstoledo.com/wp-content/uploads/2016/01/AbcWindowsSpecialOffer.jpg' alt='Promotion'>
            <h1>Big discount!</h1>
            <a href=''><h3>More information on ItTech.bg</h3></a>";

            $headers = 'From: ittech.eshop@egmail.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion() . "\r\n" .
                "MIME-Version: 1.0 ". "\r\n" .
                "Content-Type: text/html; charset=ISO-8859-1" . "\r\n";
            mail($to, $subject, $message, $headers);
        }

    } catch (\PDOException $e) {
        http_response_code(500);
    }
}

if (isset($_GET['removePromoProduct'])){
    $productId =  $_GET['removePromoProduct'];
    try{
        if (PromotionDao::getInstance()->deletePromotion($productId)){
            http_response_code(200);
        }else{
            http_response_code(500);
        }
    }catch (\PDOException $e){
        http_response_code(500);
    }

}

if (isset($_POST['getPromoProducts'])){
    if (isset($_SESSION['user'])) {
        $isAdmin = $_SESSION['user']->getIsAdmin();
    } else {
        $isAdmin = false;
    }
    try {
        $orderBy = trim(htmlentities($_POST['getPromoProducts']));
        $promoProducts = ProductDao::getInstance()->getProductsInPromo($orderBy);
        if ($promoProducts){
            $promoProducts[] = $isAdmin;
            echo json_encode($promoProducts);
        }else {
            echo false;
        }
    }catch (\PDOException $e){
        http_response_code(500);
    }

}

