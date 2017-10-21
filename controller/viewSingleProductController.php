<?php
session_start();
if(isset($_POST['getObject']) && isset($_SESSION['viewProduct'])) {
	$viewObjectProduct = $_SESSION['viewProduct'];
	echo json_encode($viewObjectProduct, JSON_UNESCAPED_SLASHES);
}