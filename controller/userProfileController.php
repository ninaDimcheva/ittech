<?php

use \model\users\User;
use \model\DataBase\OrderDao;
use \model\DataBase\UserDao;

function __autoload($class_name)
{
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

session_start();

if (isset($_GET['getUserProfile'])) {
    if (isset($_SESSION['user'])) {
        echo(json_encode($_SESSION['user'], JSON_UNESCAPED_SLASHES));
    } else {
        http_response_code(401);
    }
}

if (isset($_GET['editNotifications'])) {
    if (isset($_SESSION['user'])) {
        $userId = $_SESSION['user']->getUserId();
        if ($_SESSION['user']->getNotifications()) {
            $notification = null;
        } else {
            $notification = true;
        }
        try {
            $editedNotifications = UserDao::getInstance()->editNotifications($notification, $userId);
            if ($editedNotifications) {
                $_SESSION['user']->setNotifications($notification);
                echo $notification;
            } else {
                http_response_code(500);
            }
        } catch (\PDOException $e) {
            http_response_code(500);
        }
    } else {
        http_response_code(401);
    }
}

if (isset($_GET['editFamilyName'])) {
    if (isset($_SESSION['user'])) {
        $userId = $_SESSION['user']->getUserId();
        $userFamilyName = trim(htmlentities($_GET['editFamilyName']));
        if (strlen($userFamilyName) > 0 || !is_numeric($userFamilyName)) {
            try {
                $editedFamilyName = UserDao::getInstance()->editFamilyName($userFamilyName, $userId);
                if ($editedFamilyName) {
                    $_SESSION['user']->setFamilyName($userFamilyName);
                    echo $userFamilyName;
                } else {
                    http_response_code(500);
                }
            } catch (\PDOException $e) {
                http_response_code(500);
            }
        } else {
            http_response_code(400);
        }
    } else {
        http_response_code(401);
    }
}

if (isset($_POST['checkPassword'])) {
    if (isset($_SESSION['user'])) {
        $currentPass = $_SESSION['user']->getPassword();
        $password = trim(htmlentities($_POST['checkPassword']));
        if (strlen($password) > 0 && sha1($password) == $currentPass) {
            echo true;
        } else {
            echo false;
        }
    } else {
        http_response_code(401);
    }
}

if (isset($_POST['editPassword'])) {
    if (isset($_SESSION['user'])) {
        $userId = $_SESSION['user']->getUserId();
        $newPassword = trim(htmlentities($_POST['editPassword']));
        if (strlen($newPassword) > 5) {
            $newPassword = sha1($newPassword);
            try {
                UserDao::getInstance()->editPassword($newPassword, $userId);
                $_SESSION['user']->setPassword($newPassword);
            } catch (\PDOException $e) {
                http_response_code(500);
            }
        } else {
            http_response_code(400);
        }
    } else {
        http_response_code(401);
    }
}