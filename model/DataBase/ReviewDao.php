<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 30-Oct-17
 * Time: 20:04
 */

namespace model\DataBase;
use model\products\Review;

class ReviewDao{

    private static $instance;
    /**
     * @var \PDO
     */
    private $pdo;

    /**
     * FavouriteDao constructor.
     */
    private function __construct() {
        $this->pdo = DBManager::getInstance()->getConnection();
    }

    /**
     * @return ReviewDao
     */
    public static function getInstance(){
        if(self::$instance === null){
            self::$instance = new ReviewDao();
        }
        return self::$instance;
    }

    public function insertReview(Review $review){
        $stm = $this->pdo->prepare("INSERT INTO `reviews` (`product_id`, `user_id`, `rating`, `review`, `review_date`) VALUES (?, ?, ?, ?, CURRENT_DATE)");
        $stm-> execute(array($review->getProductId(), $review->getUserId(), $review->getRating(), $review->getReview()));

        $stm = $this->pdo->prepare("SELECT  round(avg(`rating`)) as newRating, count(*) as customerReviewsNum, curdate() as reviewDate  FROM `reviews` WHERE `product_id` = ?");
        $stm-> execute(array($review->getProductId()));
        return $stm->fetch(\PDO::FETCH_ASSOC);
    }


}