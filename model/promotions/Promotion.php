<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 12.10.2017 г.
 * Time: 21:47 ч.
 */

namespace model\promotions;


class promotion {
	private $promotion_id;
	private $product_id;
	private $start_date;
	private $end_date;
	private $discount;
	
	/**
	 * promotion constructor.
	 * @param $product_id
	 * @param $start_date
	 * @param $end_date
	 * @param $discount
	 */
	public function __construct($product_id, $start_date, $end_date, $discount)
	{
		$this -> product_id = $product_id;
		$this -> start_date = $start_date;
		$this -> end_date = $end_date;
		$this -> discount = $discount;
	}
	
	/**
	 * @param mixed $promotion_id
	 */
	public function setPromotionId($promotion_id)
	{
		$this -> promotion_id = $promotion_id;
	}
	
	/**
	 * @param mixed $product_id
	 */
	public function setProductId($product_id){
		$this -> product_id = $product_id;
	}
	
	/**
	 * @param mixed $start_date
	 */
	public function setStartDate($start_date)
	{
		$this -> start_date = $start_date;
	}
	
	/**
	 * @param mixed $end_date
	 */
	public function setEndDate($end_date)
	{
		$this -> end_date = $end_date;
	}
	
	/**
	 * @param mixed $discount
	 */
	public function setDiscount($discount)
	{
		$this -> discount = $discount;
	}
	
	/**
	 * @return mixed
	 */
	public function getPromotionId()
	{
		return $this -> promotion_id;
	}
	/**
	 * @return mixed
	 */
	public function getProductId()
	{
		return $this -> product_id;
	}
	
	/**
	 * @return mixed
	 */
	public function getStartDate()
	{
		return $this -> start_date;
	}
	
	/**
	 * @return mixed
	 */
	public function getEndDate()
	{
		return $this -> end_date;
	}
	
	/**
	 * @return mixed
	 */
	public function getDiscount()
	{
		return $this -> discount;
	}
	
	
	
}