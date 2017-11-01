<?php

use \model\orders\Order;
use \model\products\Product;
use \model\users\User;
use \model\DataBase\DBManager;
use \model\DataBase\OrderDao;
use \model\DataBase\ProductDao;
use \model\DataBase\UserDao;

require_once '../model/DataBase/ProductDao.php';
require_once '../model/DataBase/DBManager.php';

function __autoload($class_name)
{
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

session_start();

if (isset($_POST['login'])) {
    $email = trim(htmlentities($_POST['email']));
    $password = sha1(trim(htmlentities($_POST['password'])));
    if (strlen(strlen($email) > 0 && strlen($password) > 0)) {
        try {
            if (UserDao::getInstance()->loginValidate($email, $password)) {
                $user = UserDao::getInstance()->loginValidate($email, $password);
                $name = $user['name'];
                $familyName = $user['family_name'];
                $email = $user['email'];
                $password = $user['password'];
                $gender = $user['gender'];
                $birthday = $user['birthday'];
                $notifications = $user['notifications'];
                $userObject = new User($name, $familyName, $email, $password, $gender, $birthday, $notifications);
                $userObject->setUserId($user['user_id']);
                $userObject->setIsAdmin($user['is_admin']);
                $_SESSION['isLogged'] = true;
                $_SESSION['user'] = $userObject;
                unset($_SESSION["invalidUser"]);
                if (count($_SESSION['cart']) == 0) {
                    header('Location:../?page=main');
                } else {
                    header('Location:../?page=confirmOrder');
                }
            } else {
                $_SESSION["invalidUser"] = true;
                header("Location:../?page=login");
            }
        } catch (\PDOException $e) {
            header('Location:../?page=error500');
        }
    }else {
        header('Location:../?page=error400');
    }
}

if (isset($_GET['loginValidation'])) {
    if (isset($_SESSION["invalidUser"])) {
        echo $_SESSION["invalidUser"];
    }
}










