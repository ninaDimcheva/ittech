<?php
session_start();
require_once 'view/header.html';
//if (isset($_SESSION['isLogged']) && $_SESSION['isLogged']){
//    require_once 'view/main.html';
//}else{
//    require_once 'view/login.html';
//}
require_once 'view/login.html';

include_once 'view/footer.html';