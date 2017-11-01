<?php

use \model\orders\Order;
use\model\orders\OrderProducts;
use \model\products\Product;
use \model\users\User;
use \model\DataBase\DBManager;
use \model\DataBase\OrderDao;
use \model\DataBase\ProductDao;
use \model\DataBase\UserDao;

function __autoload($class_name)
{
	$class_name = '..\\' . $class_name;
	$class_name = str_replace("\\", "/", $class_name);
	require_once $class_name . '.php';
}

session_start();

// TODO rethink about this script very carefully !!!!!!!!!!!!!!!!!!!!!!!

if (isset($_POST['confirmedOrder']) && isset($_SESSION['isLogged']) && $_SESSION['isLogged']) {
	$arrayCartObjects = array();
	$userId = $_SESSION['user'] -> getUserId();
	$orderDate = date("Y-m-d");
	$status = trim(htmlentities('Confirmed'));
	$totalOrder = 0;
	for ($i = 0; $i < count($_SESSION['cart']); $i ++) {

		$productId = $_SESSION['cart'][$i] -> product_id;
		$productQuantityDB = $_SESSION['cart'][$i] -> quontity;
		$priceSingleProduct = $_SESSION['cart'][$i] -> price;
		$quantityProductOrdered = $_SESSION['cart'][$i] -> orderedQuantity;

		$objectProductCart = new OrderProducts($productId, $quantityProductOrdered);
		$arrayCartObjects[] = $objectProductCart;
		$totalOrder += $quantityProductOrdered * $priceSingleProduct;
		$newQuantityAfterOrderDB = $productQuantityDB - $quantityProductOrdered;
		$updateProductQuantityDB = ProductDao ::getInstance() -> editProductQuantity($newQuantityAfterOrderDB, $productId);
	}
	$orderAddress = trim(htmlentities($_POST['confirmedOrder']));
	$newOrder = new Order($userId, $totalOrder, $orderDate, $status, $arrayCartObjects, $orderAddress);
	$newOrderId = OrderDao ::getInstance() -> insertOrder($newOrder);
	unset($_SESSION['cart']);
	$detailesNewOrder = array();
	$detailesNewOrder['newOrderId'] = $newOrderId;
	$detailesNewOrder['status'] = $status;
	$detailesNewOrder['addressDelivery'] = $orderAddress;
	echo json_encode($detailesNewOrder, JSON_UNESCAPED_SLASHES);
}
