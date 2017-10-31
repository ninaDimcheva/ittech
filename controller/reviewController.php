<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 30-Oct-17
 * Time: 20:34
 */

use \model\users\User;
use \model\products\Review;
use \model\DataBase\ReviewDao;
function __autoload($class_name)
{
    $class_name = '..\\' . $class_name;
    $class_name = str_replace("\\", "/", $class_name);
    require_once $class_name . '.php';
}

session_start();

if (isset($_GET['addReview'])){
    if (isset($_SESSION['user'])){
        $reviewObj = json_decode($_GET['addReview'], true);
        $userId = $_SESSION['user'] -> getUserId();
        $productId = trim(htmlentities($reviewObj['productId']));
        $review = trim(htmlentities($reviewObj['reviewMessage']));
        $rating = trim(htmlentities($reviewObj['rating']));
        if (strlen($review) < 500 && strlen($rating) > 0 && strlen($rating) < 10 && $rating > 0 && $rating < 6 && is_numeric($rating)){
            $reviewObj = new Review($productId,$userId,$rating,$review);
            try{
                $newRating = ReviewDao::getInstance()->insertReview($reviewObj);
                $fullName =ucfirst($_SESSION['user']->getName()) . " " . ucfirst($_SESSION['user']->getFamilyName());
                $newRating['userName'] = $fullName;

                echo json_encode($newRating);
            }catch (\PDOException $e){
                //TODO db error
            }
        }else{
            //TODO wrong user insertation error
        }

    }else{
        //TODO unauthorized error
    }
}