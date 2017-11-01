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
        http_response_code(500);
    }

}

if (isset($_GET['editPrivileges'])){
    $toEdit = json_decode($_GET['editPrivileges'],true);
    $email = trim(htmlentities($toEdit['email']));
    $is_admin = trim(htmlentities($toEdit['isAdmin']));
    if ($is_admin){
        $changePrivilege = null;
    }else{
        $changePrivilege = true;
    }
    try{
        if ($email != 'dimov@mail.bg'){
            echo UserDao::getInstance()->editUserPrivilege($changePrivilege, $email);
        }else{
            http_response_code(401);
        }

    }catch (\PDOException $e){
        http_response_code(500);
    }
}