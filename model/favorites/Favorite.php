<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 12.10.2017 г.
 * Time: 22:24 ч.
 */

namespace model\favorites;


class Favorite {
	private $product_id = []; // value = product_id;
	private $user_id;
	
	/**
	 * Favorite constructor.
	 * @param array $product_id
	 * @param $user_id
	 */
	public function __construct(array $product_id, $user_id)
	{
		$this -> product_id = $product_id;
		$this -> user_id = $user_id;
	}
	
	/**
	 * @param array $product_id
	 */
	public function setProductId($product_id)
	{
		$this -> product_id = $product_id;
	}
	
	/**
	 * @param mixed $user_id
	 */
	public function setUserId($user_id)
	{
		$this -> user_id = $user_id;
	}
	
	/**
	 * @return array
	 */
	public function getProductId()
	{
		return $this -> product_id;
	}
	
	/**
	 * @return mixed
	 */
	public function getUserId()
	{
		return $this -> user_id;
	}
	
	
}