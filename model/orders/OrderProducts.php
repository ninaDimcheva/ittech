<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 27.10.2017 г.
 * Time: 00:00 ч.
 */

namespace model\orders;

class OrderProducts {
	private $order_id;
	protected $product_id;
	protected $quantity;
	
	function __construct($product_id, $quantity)
	{
		$this->product_id = $product_id;
		$this->quantity = $quantity;
	}
	
	/**
	 * @param mixed $order_id
	 */
	public function setOrderId($order_id)
	{
		$this -> order_id = $order_id;
	}
	
	
	/**
	 * @param mixed $product_id
	 */
	public function setProductId($product_id)
	{
		$this -> product_id = $product_id;
	}
	
	/**
	 * @param mixed $quantity
	 */
	public function setQuantity($quantity)
	{
		$this -> quantity = $quantity;
	}
	
	/**
	 * @return mixed
	 */
	public function getOrderId()
	{
		return $this -> order_id;
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
	public function getQuantity()
	{
		return $this -> quantity;
	}
}