<?php

use model\users\User;
require_once 'model/JsonObject.php';
require_once 'model/users/User.php';
require_once 'view/header.html';

session_start();

if (isset($_SESSION['user']) && $_SESSION['user'] -> getIsAdmin()){
    if (isset($_GET['page'])){
        switch ($_GET['page']){
	        case 'myProfile' : require_once 'view/myProfile.html';
		        break;
            case 'login' : require_once 'view/main.html';
                break;
            case 'addProduct' : require_once 'view/addProduct.html';
                break;
            case 'editProduct' : require_once 'view/editProduct.html';
                break;
            case 'addPromoProduct' : require_once 'view/addPromoProduct.html';
                break;
            case 'editUserPrivilege' : require_once 'view/editUserPrivilege.html';
                break;
            case 'main' : require_once 'view/main.html';
                break;
            case  'contactITTech' : require_once 'view/contactITTech.html';
                break;
            case 'productsOnPromotions' : require_once 'view/productsOnPromotions.html';
                break;
            case 'shops' : require_once 'view/shops.html';
                break;
            case 'terms' : require_once 'view/termsForOnlineShopping.html';
                break;
            case 'viewSingleProduct' : require_once 'view/viewSingleProduct.html';
                break;
            case 'removePromoProduct' : require_once 'view/removePromoProduct.html';
                break;
            default : require_once 'view/error.html';
        }
    }else{
        require_once 'view/main.html';
    }
}else{
    if (isset($_SESSION['isLogged']) && $_SESSION['isLogged']){
        if (isset($_GET['page'])){
            switch ($_GET['page']){
                case 'login' : require_once 'view/main.html';
                    break;
                case 'myProfile' : require_once 'view/myProfile.html';
                    break;
                case 'myOrders' : require_once 'view/myOrders.html';
                    break;
	            case 'myFavorites' : require_once 'view/myFavorites.html';
		            break;
                case 'main' : require_once 'view/main.html';
                    break;
                case  'contactITTech' : require_once 'view/contactITTech.html';
                    break;
                case 'productsOnPromotions' : require_once 'view/productsOnPromotions.html';
                    break;
                case 'shops' : require_once 'view/shops.html';
                    break;
                case 'terms' : require_once 'view/termsForOnlineShopping.html';
                    break;
                case 'userCart' : require_once 'view/userCart.html';
                    break;
	            case 'viewSingleProduct' : require_once 'view/viewSingleProduct.html';
		            break;
	            case 'confirmOrder' : require_once 'view/confirmationOrder.html';
		            break;
                default : require_once 'view/error.html';
            }
        }else{
            require_once 'view/main.html';
        }
    }else{
        if (isset($_GET['page'])){
            switch ($_GET['page']){
                case 'login' : require_once 'view/login.html';
                    break;
                case 'register' : require_once 'view/register.html';
                    break;
                case 'main' : require_once 'view/main.html';
                    break;
                case  'contactITTech' : require_once 'view/contactITTech.html';
                    break;
                case 'productsOnPromotions' : require_once 'view/productsOnPromotions.html';
                    break;
                case 'shops' : require_once 'view/shops.html';
                    break;
                case 'terms' : require_once 'view/termsForOnlineShopping.html';
                    break;
                case 'userCart' : require_once 'view/userCart.html';
                    break;
	            case 'viewSingleProduct' : require_once 'view/viewSingleProduct.html';
		            break;
	            case 'confirmOrder' : require_once 'view/confirmationOrder.html';
		            break;
                default : require_once 'view/error.html';
            }
        }else{
            require_once 'view/main.html';
        }
    }

}

include_once 'view/footer.html';