<?php

namespace model\promotions;


class promotion {
    /**
     * @var integer
     */
	private $promotion_id;
    /**
     * @var integer
     */
	private $product_id;
    /**
     * @var string (YEAR-MONTH-DAY)
     */
	private $start_date;
    /**
     * @var string (YEAR-MONTH-DAY)
     */
	private $end_date;
    /**
     * @var double
     */
	private $discount;
	
	/**
	 * promotion constructor.
	 * @param integer $product_id
	 * @param string $start_date (YEAR-MONTH-DAY)
	 * @param string $end_date (YEAR-MONTH-DAY)
	 * @param double $discount
	 */
	public function __construct($product_id, $start_date, $end_date, $discount)
	{
		$this -> product_id = $product_id;
		$this -> start_date = $start_date;
		$this -> end_date = $end_date;
		$this -> discount = $discount;
	}
	
	/**
	 * @param integer $promotion_id
	 */
	public function setPromotionId($promotion_id)
	{
		$this -> promotion_id = $promotion_id;
	}
	
	/**
	 * @param integer $product_id
	 */
	public function setProductId($product_id){
		$this -> product_id = $product_id;
	}
	
	/**
	 * @param string $start_date
	 */
	public function setStartDate($start_date)
	{
		$this -> start_date = $start_date;
	}
	
	/**
	 * @param string $end_date
	 */
	public function setEndDate($end_date)
	{
		$this -> end_date = $end_date;
	}
	
	/**
	 * @param double $discount
	 */
	public function setDiscount($discount)
	{
		$this -> discount = $discount;
	}
	
	/**
	 * @return integer
	 */
	public function getPromotionId()
	{
		return $this -> promotion_id;
	}
	/**
	 * @return integer
	 */
	public function getProductId()
	{
		return $this -> product_id;
	}
	
	/**
	 * @return string
	 */
	public function getStartDate()
	{
		return $this -> start_date;
	}
	
	/**
	 * @return string
	 */
	public function getEndDate()
	{
		return $this -> end_date;
	}
	
	/**
	 * @return double
	 */
	public function getDiscount()
	{
		return $this -> discount;
	}
	
	
	
}