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
	private $pdo;
	
	private function __construct() {
		$this->pdo = DBManager::getInstance()->getConnection();
	}
	
	public static function getInstance(){
		if(self::$instance === null){
			self::$instance = new PromotionDao();
		}
		return self::$instance;
	}
	
	//TODO we must think about the product_id, how to find which exactly product_id it is?
	
	public function insertPromotion(Promotion $promotion){
		$stm = $this->pdo->prepare("INSERT INTO promotions (`product_id`, `start_date`, `end_date`, `discount`) VALUES (?, ?, ?, ?)");
		$stm->execute(array($promotion->getProductId(), $promotion->getStartDate(), $promotion->getEndDate(),$promotion->getDiscount()));
		$promotion->setPromotionId($this->pdo->lastInsertId());
	}
	
	public function deletePromotion(Promotion $promotion){
		$stm = $this->pdo->prepare("DELETE FROM promotions WHERE promotion_id = ?");
		$stm->execute(array($promotion->getPromotionId()));
	}
	
}