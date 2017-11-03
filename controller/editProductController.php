<?php

use \model\DataBase\ProductDao;

function __autoload($class_name)
{
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

session_start();

if (isset($_GET['editProduct'])) {
    $editProduct = json_decode($_GET['editProduct'], true);
    if (strlen($editProduct['quontity']) > 0 && $editProduct['quontity'] > 0 && is_numeric($editProduct['quontity'])) {
        try {
            if (ProductDao::getInstance()->editProductQuantity($editProduct['quontity'], $editProduct['productId'])) {
                http_response_code(200);
            } else {
                http_response_code(500);
            }
        } catch (\PDOException $e) {
            http_response_code(500);
        }
    } else {
        http_response_code(400);
    }
}