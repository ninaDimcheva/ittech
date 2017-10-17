<?php
session_start();

use \model\DataBase\UserDao;
use \model\users\User;

function __autoload($class_name)
{
	$class_name = '..\\' . $class_name;
	$class_name = str_replace("\\", "/", $class_name);
	require_once $class_name . '.php';
}

if (isset($_POST['login'])) {
	$email = trim(htmlentities($_POST['email']));
	$password = sha1(trim(htmlentities($_POST['password'])));
	
	if (UserDao ::getInstance() -> loginValidate($email, $password)) {
		$userObject = UserDao ::getInstance() -> loginValidate($email, $password);
		
		$_SESSION['isLogged'] = true;
		$_SESSION['user'] = $user['user_id'];
		$_SESSION['name'] = $user['name'];
		$_SESSION['familyName'] = $user['family_name'];
		$_SESSION['email'] = $user['email'];
		$_SESSION['password'] = $user['password'];
		$_SESSION['gender'] = $user['gender'];
		$_SESSION['birthday'] = $user['birthday'];
		$_SESSION['notifications'] = $user['notifications'];
		$_SESSION['is_admin'] = $user['is_admin'];
		unset($_SESSION["invalidUser"]);
		header('Location:../?page=main');
	}
	else{
		$_SESSION["invalidUser"] = true;
		header("Location:../?page=login");
	}
}

if (isset($_GET['loginValidation'])) {
    if (isset($_SESSION["invalidUser"])) {
        echo $_SESSION["invalidUser"];
    }
}






