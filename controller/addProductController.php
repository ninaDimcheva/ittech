<?php
session_start();

use \model\DataBase\ProductDao;
use \model\products\Product;
use \model\products\ProductImg;
use \model\products\ProductSpec;

function __autoload($class_name)
{
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

if (isset($_GET['getMainTypes'])) {
    try {
        $result = ProductDao::getInstance()->getMainTypes();
        foreach ($result as $row) {
            $mainTypes[] = $row['main_type'];
        }
        echo json_encode($mainTypes, JSON_UNESCAPED_SLASHES);
    } catch (\PDOException $e) {
        http_response_code(500);
    }
}

if (isset($_GET['getTypes'])) {
    try {
        $mainType = $_GET['getTypes'];
        $result = ProductDao::getInstance()->getTypes($mainType);
        foreach ($result as $row) {
            $types[] = $row['type'];
        }
        echo json_encode($types, JSON_UNESCAPED_SLASHES);
    } catch (\PDOException $e) {
        http_response_code(500);
    }
}

if (isset($_GET['getSpecifications'])) {
    try {
        $type = $_GET['getSpecifications'];
        $result = ProductDao::getInstance()->getSpecifications($type);
        foreach ($result as $row) {
            $specifications[] = $row['name'];
        }
        echo json_encode($specifications, JSON_UNESCAPED_SLASHES);
    } catch (\PDOException $e) {
        http_response_code(500);
    }
}

if (isset($_GET['getBrands'])) {
    try {
        $result = ProductDao::getInstance()->getBrands();
        foreach ($result as $row) {
            $brands[] = $row['brand'];
        }
        echo json_encode($brands, JSON_UNESCAPED_SLASHES);
    } catch (\PDOException $e) {
        http_response_code(500);
    }
}

if (isset($_GET['getBrandsForType'])) {
    $type = $_GET['getBrandsForType'];
    try {
        $result = ProductDao::getInstance()->getBrandsForType($type);
        foreach ($result as $row) {
            $brands[] = $row['brand'];
        }
        echo json_encode($brands, JSON_UNESCAPED_SLASHES);
    } catch (\PDOException $e) {
        http_response_code(500);
    }
}

if (isset($_POST['addProduct'])) {
    $error = false;
    $mainType = trim(htmlentities($_POST['mainType']));
    $type = trim(htmlentities($_POST['type']));
    $brand = trim(htmlentities($_POST['brand']));
    $model = trim(htmlentities($_POST['model']));
    $price = trim(htmlentities($_POST['addPrice']));
    $quontity = trim(htmlentities($_POST['quontity']));
    $imgs = array();
    $specifications = array();

    foreach ($_POST as $key => $value) {
        if ($key != 'mainType' && $key != 'type' && $key != 'brand' && $key != 'model' && $key != 'price' && $key != 'quontity' && $key != 'addProduct') {
            $spec = new ProductSpec($key, trim(htmlentities($value)));
            $specifications[] = $spec;
        }
    }

    for ($i = 1; $i <= 3; $i++) {
        $imgs[$i] = new ProductImg($_FILES["img$i"]['name']);
        $imgType = explode('/', $_FILES["img$i"]['type']);
        $imgs[$i]->setFileType($imgType[0]);
        $imgs[$i]->setFileExtension($imgType[1]);
        $imgs[$i]->setSize($_FILES["img$i"]['size']);
        $imgs[$i]->setTmpName($_FILES["img$i"]['tmp_name']);
    }

    if (strlen($model) == 0 || strlen($model) > 45) {
        $error = true;
    }
    if (strlen($price) == 0 || strlen($price) > 45 || !is_numeric($price)) {
        $error = true;
    }
    if (strlen($quontity) == 0 || strlen($quontity) > 45 || !is_numeric($quontity)) {
        $error = true;
    }
    foreach ($specifications as $spec) {
        if (strlen($spec->getValue()) > 100) {
            $error = true;
        }
    }
    foreach ($imgs as $img) {
        if ($img->getSize() > 2097152 || $img->getFileType() != 'image' || !is_uploaded_file($img->getTmpName())) {
            echo "tmp_name" . $img->getTmpName();
            echo "size " . $img->getSize();
            echo "type " . $img->getFileType();
            var_dump(is_uploaded_file($img->getTmpName()));
            $error = true;
        }
    }

    if (!$error) {
        try {
            $product = new Product($type, $brand, $model, $price, $quontity, $imgs, $specifications);
            $imgs = ProductDao::getInstance()->insertProduct($product);
            foreach ($imgs as $img) {
                move_uploaded_file($img->getTmpName(), "../" . $img->getImgUrl());
            }
            header("Location:../?page=main");
        } catch (\PDOException $e) {
            header("Location:../?page=error500");
        }
    } else {
        header("Location:../?page=error400");
    }
}
