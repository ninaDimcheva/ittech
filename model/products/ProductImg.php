<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 20.10.2017 г.
 * Time: 18:14 ч.
 */

namespace model\products;

use model\JsonObject;
class ProductImg extends JsonObject
{
	protected $img_url;
	
	function __construct($img_url)
	{
		$this->img_url = $img_url;
	}
	
	/**
	 * @return mixed
	 */
	public function getImgUrl()
	{
		return $this -> img_url;
	}
}