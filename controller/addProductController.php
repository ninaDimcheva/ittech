<?php
session_start();

use \model\DataBase\ProductDao;
use \model\products\Product;

function __autoload($class_name){
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

if (isset($_GET['getMainTypes'])){
    try{
        $result = ProductDao::getInstance()->getMainTypes();
        foreach ($result as $row) {
            $mainTypes[] = $row['main_type'];
        }
        echo json_encode($mainTypes,JSON_UNESCAPED_SLASHES);
    }catch (\PDOException $e){
        header("Location:../?page=error");
    }
}

if (isset($_GET['getTypes'])){
    try{
        $mainType = $_GET['getTypes'];
        $result = ProductDao::getInstance()->getTypes($mainType);
        foreach ($result as $row) {
            $types[] = $row['type'];
        }
        echo json_encode($types,JSON_UNESCAPED_SLASHES);
    }catch (\PDOException $e){
        header("Location:../?page=error");
    }
}

if (isset($_GET['getSpecifications'])){
    try{
        $type = $_GET['getSpecifications'];
        $result = ProductDao::getInstance()->getSpecifications($type);
        foreach ($result as $row) {
            $specifications[] = $row['name'];
        }
        echo json_encode($specifications,JSON_UNESCAPED_SLASHES);
    }catch (\PDOException $e){
        header("Location:../?page=error");
    }
}

if (isset($_GET['getBrands'])){
    try{
        $result = ProductDao::getInstance()->getBrands();
        foreach ($result as $row) {
            $brands[] = $row['brand'];
        }
        echo json_encode($brands,JSON_UNESCAPED_SLASHES);
    }catch (\PDOException $e){
        header("Location:../?page=error");
    }
}

if (isset($_POST['addProduct'])){
    $error = false;
    $mainType = trim(htmlentities($_POST['mainType']));
    $type = trim(htmlentities($_POST['type']));
    $brand = trim(htmlentities($_POST['brand']));
    $model = trim(htmlentities($_POST['model']));
    $price = trim(htmlentities($_POST['price']));
    $quontity = trim(htmlentities($_POST['quontity']));
    foreach ($_POST as $key => $value) {
        if ($key != 'mainType' && $key != 'type' && $key != 'brand' && $key != 'model' && $key != 'price' && $key != 'quontity' && $key != 'addProduct'){
            $specifications[$key] = trim(htmlentities($value));
            if (strlen($specifications[$key]) > 100){
                $error = true;
            }
        }
    }

    $img1Size = $_FILES['img1']['size'];
    $tmpImg1Name = $_FILES['img1']['tmp_name'];
    $img1Type = explode('/', $_FILES['img1']['type']);
    $img1FileType = $img1Type[0];
    $img1FileExtension = $img1Type[1];

    $img2Size = $_FILES['img2']['size'];
    $tmpImg2Name = $_FILES['img2']['tmp_name'];
    $img2Type = explode('/', $_FILES['img2']['type']);
    $img2FileType = $img2Type[0];
    $img2FileExtension = $img2Type[1];

    $img3Size = $_FILES['img3']['size'];
    $tmpImg3Name = $_FILES['img3']['tmp_name'];
    $img3Type = explode('/', $_FILES['img3']['type']);
    $img3FileType = $img3Type[0];
    $img3FileExtension = $img3Type[1];


    if (strlen($model) == 0 || strlen($model) > 45){
        $error = true;
    }
    if (strlen($price) == 0 || strlen($price) > 45 ||  !is_numeric($price)){
        $error = true;
    }
    if (strlen($quontity) == 0 || strlen($quontity) > 45 || !is_numeric($quontity)){
        $error = true;
    }
    if ($img1FileType != 'image' || $img1Size > 2097152){
        $error = true;
    }
    if ($img2FileType != 'image' || $img2Size > 2097152){
        $error = true;
    }
    if ($img3FileType != 'image' || $img3Size > 2097152){
        $error = true;
    }


    if(!$error && is_uploaded_file($tmpImg1Name) && is_uploaded_file($tmpImg2Name) && is_uploaded_file($tmpImg3Name)) {
        try{
            $imgsFileExtension[] = '_1.' . $img1FileExtension;
            $imgsFileExtension[] = '_2.' . $img2FileExtension;
            $imgsFileExtension[] = '_3.' . $img3FileExtension;

            $product = new Product($imgsFileExtension, $specifications, $type, $brand, $model, $price, $quontity);
            $imgUrls = ProductDao::getInstance() -> insertProduct($product);

            move_uploaded_file($tmpImg1Name, "../" . $imgUrls['0']);
            move_uploaded_file($tmpImg2Name, "../" . $imgUrls['1']);
            move_uploaded_file($tmpImg3Name, "../" . $imgUrls['2']);
            header("Location:../?page=main");
        }catch (\PDOException $e){
            header("Location:../?page=error");
        }
    }else{
       header("Location:../?page=error");
    }





}
