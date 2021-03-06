<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 12.10.2017 г.
 * Time: 22:24 ч.
 */

namespace model\favorites;


class Favorite {
    /**
     * @var array
     */
	private $product_id = []; // value = product_id;
	private $user_id;
	
	/**
	 * Favorite constructor.
	 * @param int $product_id
	 * @param  int $user_id
	 */
	public function __construct($product_id, $user_id)
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
	 * @param integer $user_id
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
	 * @return integer
	 */
	public function getUserId()
	{
		return $this -> user_id;
	}
	
	
}