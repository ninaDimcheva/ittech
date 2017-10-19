<?php
use \model\DataBase\UserDao;

function __autoload($class_name){
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}


if (isset($_GET['findUser'])){
    $email = trim(htmlentities($_GET['findUser']));
    try{
        $userToEdit = UserDao::getInstance()->existsUser($email);
        if(is_array($userToEdit)){
            echo json_encode($userToEdit,JSON_UNESCAPED_SLASHES);
        }else{
            echo false;
        }
    }catch (\PDOException $e){
        //TODO header("Location:../?page=error");
    }

}

if (isset($_POST['changeUserPrivilege'])){
    $email = trim(htmlentities($_POST['hiddenEmail']));
    $is_admin = trim(htmlentities($_POST['hiddenIsAdmin']));
    if ($is_admin){
        $changePrivilege = null;
    }else{
        $changePrivilege = true;
    }
    try{
        if ($email != 'dimov@mail.bg'){
            if(UserDao::getInstance()->editUserPrivilege($changePrivilege, $email)){
            header("Location:../?page=editUserPrivilege");
            } else{
//              TODO header("Location:../?page=error");
            }
        }else{
//          TODO header("Location:../?page=error");
        }

    }catch (\PDOException $e){
//         TODO     header("Location:../?page=error");
    }
}