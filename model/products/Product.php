<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 16:11
 */

namespace model\products;


use model\JsonObject;

class Product extends JsonObject {
	
	/**
     * @var integer
     */
    protected $product_id;
    /**
     * @var integer
     */
	protected $type_id;
    /**
     * @var string
     */
	protected $type;
    /**
     * @var integer
     */
    protected $brand_id;
    /**
     * @var string
     */
	protected $brand;
    /**
     * @var string
     */
    protected $model;
    /**
     * @var double
     */
	protected $price;
    /**
     * @var int (arhived = 1, not arhived = NULL)
     */
    protected $arhive;
    /**
     * @var integer
     */
    protected $quontity;
    /**
     * @var array
     */
    protected $imgs = []; // array of img objects
    /**
     * @var array
     */
    protected $specifications = []; //array of ProductSpec objects
    /**
     * @var int (inPromo = 1, not inPromo = NULL)
     */
    protected $inPromo;
	/**
	 * @var int (the quantity ordered from the user, default value is 1)
	 */
	protected $orderedQuantity;

    /**
     * Product constructor.
     * @param integer $type_id
     * @param integer $brand_id
     * @param string $model
     * @param double $price
     * @param int $arhive (arhived = 1, not arhived = NULL)
     * @param integer $quontity
     * @param array $imgs
     * @param array $specifications
     */
    public function __construct($type, $brand, $model, $price, $quontity, array $imgs, array $specifications, $orderedQuantity = 1){
        $this->type = $type;
        $this->brand = $brand;
        $this->model = $model;
        $this->price = $price;
        $this->quontity = $quontity;
        $this->imgs = $imgs;
        $this->specifications = $specifications;
        $this->orderedQuantity = $orderedQuantity;
    }
    /**
     * @return integer
     */
    public function getProductId()
    {
        return $this->product_id;
    }

    /**
     * @return integer
     */
    public function getTypeId()
    {
        return $this->type_id;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @return integer
     */
    public function getBrandId()
    {
        return $this->brand_id;
    }

    /**
     * @return string
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @return double
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @return integer
     */
    public function getQuontity()
    {
        return $this->quontity;
    }

    /**
     * @return array
     */
    public function getImgs()
    {
        return $this->imgs;
    }

    /**
     * @return array
     */
    public function getSpecifications()
    {
        return $this->specifications;
    }
	
	/**
	 * @return int
	 */
	public function getOrderedQuantity()
	{
		return $this -> orderedQuantity;
	}
    /**
     * @param integer $product_id
     */
    public function setProductId($product_id)
    {
        $this->product_id = $product_id;
    }

    /**
     * @param integer $type_id
     */
    public function setTypeId($type_id)
    {
        $this->type_id = $type_id;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @param integer $brand_id
     */
    public function setBrandId($brand_id)
    {
        $this->brand_id = $brand_id;
    }

    /**
     * @param string $brand
     */
    public function setBrand($brand)
    {
        $this->brand = $brand;
    }

    /**
     * @param string $model
     */
    public function setModel($model)
    {
        $this->model = $model;
    }

    /**
     * @param double $price
     */
    public function setPrice($price)
    {
        $this->price = $price;
    }

    /**
     * @param int $arhive (arhived = 1, not arhived = NULL)
     */
    public function setArhive($arhive)
    {
        $this->arhive = $arhive;
    }

    /**
     * @param integer $quontity
     */
    public function setQuontity($quontity)
    {
        $this->quontity = $quontity;
    }

    /**
     * @param array $imgs
     */
    public function setImgs($imgs)
    {
        $this->imgs = $imgs;
    }

    /**
     * @param array $specifications
     */
    public function setSpecifications($specifications)
    {
        $this->specifications = $specifications;
    }

    /**
     * @param int $inPromo
     */
    public function setInPromo($inPromo)
    {
        $this->inPromo = $inPromo;
    }
	
	/**
	 * @param int $orderedQuantity
	 */
	public function setOrderedQuantity($orderedQuantity)
	{
		$this -> orderedQuantity = $orderedQuantity;
	}

}