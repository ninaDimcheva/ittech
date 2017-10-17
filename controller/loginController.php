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
	//TODO php validation
	if (UserDao ::getInstance() -> loginValidate($email, $password)) {
		$user = UserDao ::getInstance() -> loginValidate($email, $password);
		$name = $user['name'];
		$familyName = $user['family_name'];
		$email = $user['email'];
		$password = $user['password'];
		$gender = $user['gender'];
		$birthday = $user['birthday'];
		$notifications = $user['notifications'];
		$userObject = new User($name, $familyName, $email, $password, $gender, $birthday, $notifications);
		$userObject->setUserId( $user['user_id']);
		$userObject->setIsAdmin($user['is_admin']);
		$_SESSION['isLogged'] = true;
		unset($_SESSION["invalidUser"]);
		header('Location:../?page=main');
		$_SESSION['user'] = $userObject;

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






