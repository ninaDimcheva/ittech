<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 12.10.2017 г.
 * Time: 21:52 ч.
 */

namespace model\DataBase;

use \model\promotions\Promotion;

class PromotionDao{
	private static $instance;
    /**
     * @var \PDO
     */
	private $pdo;

    /**
     * PromotionDao constructor.
     */
	private function __construct() {
		$this->pdo = DBManager::getInstance()->getConnection();
	}

    /**
     * @return PromotionDao
     */
	public static function getInstance(){
		if(self::$instance === null){
			self::$instance = new PromotionDao();
		}
		return self::$instance;
	}
	
	//TODO we must think about the product_id, how to find which exactly product_id it is?

    /**
     * @param Promotion $promotion
     */
	public function insertPromotion(Promotion $promotion){
		$stm = $this->pdo->prepare("INSERT INTO promotions (`product_id`, `start_date`, `end_date`, `discount`) VALUES (?, ?, ?, ?)");
		$stm->execute(array($promotion->getProductId(), $promotion->getStartDate(), $promotion->getEndDate(),$promotion->getDiscount()));

		$stm = $this->pdo->prepare("SELECT `email` FROM `users`
                                                WHERE notifications = 1
                                                UNION
                                                SELECT `email` FROM `users`
                                                JOIN `favorites` using (user_id)
                                                WHERE product_id = ?");
		$stm->execute(array($promotion->getProductId()));
        return $stm->fetchAll(\PDO::FETCH_ASSOC);
	}

    /**
     * @param Promotion $promotion
     */
	public function deletePromotion($productId){
		$stm = $this->pdo->prepare("UPDATE `promotions` SET `end_date` = curdate() WHERE `product_id` = ?");
		$stm->execute(array($productId));
		return $stm->rowCount() > 0;
	}
	
}