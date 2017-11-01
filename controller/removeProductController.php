<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 31-Oct-17
 * Time: 19:12
 */

use \model\DataBase\ProductDao;

function __autoload($class_name)
{
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

session_start();

if (isset($_GET['removeProduct'])) {
    $productId = $_GET['removeProduct'];
    try {
        if (ProductDao::getInstance()->removeProduct($productId)) {
            http_response_code(200);
        } else {
            http_response_code(500);
        }
    } catch (\PDOException $e) {
        http_response_code(500);
    }

}