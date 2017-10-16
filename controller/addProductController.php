<?php
session_start();

use \model\DataBase\ProductDao;

function __autoload($class_name){
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

if (isset($_GET['getMainTypes'])){
    $result = ProductDao::getInstance()->getMainTypes();
    foreach ($result as $row) {
        $mainTypes[] = $row['main_type'];
    }
    echo json_encode($mainTypes,JSON_UNESCAPED_SLASHES);
}

if (isset($_GET['getTypes'])){
    $mainType = $_GET['getTypes'];
    $result = ProductDao::getInstance()->getTypes($mainType);
    foreach ($result as $row) {
        $types[] = $row['type'];
    }
    echo json_encode($types,JSON_UNESCAPED_SLASHES);
}

if (isset($_GET['getSpecifications'])){
    $type = $_GET['getSpecifications'];
    $result = ProductDao::getInstance()->getSpecifications($type);
    foreach ($result as $row) {
        $specifications[] = $row['name'];
    }
    echo json_encode($specifications,JSON_UNESCAPED_SLASHES);
}

if (isset($_GET['getBrands'])){
    $result = ProductDao::getInstance()->getBrands();
    foreach ($result as $row) {
        $brands[] = $row['brand'];
    }
    echo json_encode($brands,JSON_UNESCAPED_SLASHES);
}

