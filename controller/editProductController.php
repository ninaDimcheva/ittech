<?php

use \model\DataBase\ProductDao;

function __autoload($class_name){
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}
session_start();

if (isset($_GET['editProduct'])){
   $editProduct = json_decode($_GET['editProduct'],true);
   try {
       if (ProductDao::getInstance()->editProductQuantity($editProduct['quontity'],$editProduct['productId'])){
           //TODO return status code 200
       }else{
           //TODO return propper status code
       }
   }catch (\PDOException $e){
       //TODO error
   }

}