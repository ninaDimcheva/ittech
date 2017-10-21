<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 19.10.2017 г.
 * Time: 14:54 ч.
 */

namespace model\products;


use model\JsonObject;

class ProductSpec extends JsonObject
{
	protected $name;
	protected $value;
	protected $specId;
	
	function __construct($name, $value)
	{
		$this->name = $name;
		$this->value = $value;
	}
	
	/**
	 * @return mixed
	 */
	public function getName()
	{
		return $this -> name;
	}
	
	/**
	 * @return mixed
	 */
	public function getValue()
	{
		return $this -> value;
	}

    /**
     * @param integer $specId
     */
    public function setSpecId($specId)
    {
        $this->specId = $specId;
    }

    /**
     * @return integer
     */
    public function getSpecId()
    {
        return $this->specId;
    }
}