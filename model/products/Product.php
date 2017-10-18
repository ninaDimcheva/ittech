<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 16:11
 */

namespace model\products;


class Product{
    /**
     * @var integer
     */
    private $product_id;
    /**
     * @var integer
     */
    private $type_id;
    /**
     * @var string
     */
    private $type;
    /**
     * @var integer
     */
    private $brand_id;
    /**
     * @var string
     */
    private $brand;
    /**
     * @var string
     */
    private $model;
    /**
     * @var double
     */
    private $price;
    /**
     * @var int (arhived = 1, not arhived = NULL)
     */
    private $arhive;
    /**
     * @var integer
     */
    private $quontity;
    /**
     * @var array
     */
    private $img_urls = []; // value = img_url
    /**
     * @var array
     */
    private $specifications = []; //key = spec_id, value = spec_value

    /**
     * Product constructor.
     * @param integer $type_id
     * @param integer $brand_id
     * @param string $model
     * @param double $price
     * @param int $arhive (arhived = 1, not arhived = NULL)
     * @param integer $quontity
     * @param array $img_urls
     * @param array $specifications
     */
    public function __construct(array $img_urls, array $specifications, $type = null, $brand = null, $model = null, $price=null, $quontity=null){
        $this->type = $type;
        $this->brand = $brand;
        $this->model = $model;
        $this->price = $price;
        $this->quontity = $quontity;
        $this->img_urls = $img_urls;
        $this->specifications = $specifications;
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
    public function getImgUrls()
    {
        return $this->img_urls;
    }

    /**
     * @return array
     */
    public function getSpecifications()
    {
        return $this->specifications;
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
     * @param array $img_urls
     */
    public function setImgUrls($img_urls)
    {
        $this->img_urls = $img_urls;
    }

    /**
     * @param array $specifications
     */
    public function setSpecifications($specifications)
    {
        $this->specifications = $specifications;
    }

}