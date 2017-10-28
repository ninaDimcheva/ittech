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
        //TODO error
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
                //TODO error
            }
        } catch (\PDOException $e) {
            //TODO error
        }
    } else {
        //TODO error
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
                    //TODO error
                }
            } catch (\PDOException $e) {
                //TODO error
            }
        } else {
            //TODO error
        }
    } else {
        //TODO error
    }
}

if (isset($_POST['checkPassword'])){
    if (isset($_SESSION['user'])){
        $currentPass = $_SESSION['user']->getPassword();
        $password = trim(htmlentities($_POST['checkPassword']));
        if (strlen($password) > 0 && sha1($password) == $currentPass){
            echo true;
        }else {
            echo false;
        }
    }else{
        //TODO error
    }
}

if (isset($_POST['editPassword'])){
    if (isset($_SESSION['user'])){
        $userId = $_SESSION['user']->getUserId();
        $newPassword = trim(htmlentities($_POST['editPassword']));
        if (strlen($newPassword) > 5){
            $newPassword = sha1($newPassword);
            try{
                $editedPassword = UserDao::getInstance()->editPassword($newPassword, $userId);
                if ($editedPassword){
                    $_SESSION['user']->setPassword($newPassword);
                    echo true;
                }else{
                    //TODO error
                }
            }catch (\PDOException $e){
                //TODO error
            }
        }else {
            //TODO error
        }
    }else{
        //TODO error
    }
}