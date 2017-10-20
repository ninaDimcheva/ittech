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
		$promotion->setPromotionId($this->pdo->lastInsertId());
		return $promotion->getPromotionId();
	}

    /**
     * @param Promotion $promotion
     */
	public function deletePromotion(Promotion $promotion){
		$stm = $this->pdo->prepare("DELETE FROM promotions WHERE promotion_id = ?");
		$stm->execute(array($promotion->getPromotionId()));
	}
	
}