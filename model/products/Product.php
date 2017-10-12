<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 16:11
 */

namespace model\products;


class Product{
    private $product_id;
    private $type_id;
    private $brand_id;
    private $model;
    private $price;
    private $arhive;
    private $quontity;
    private $img_urls = []; // value = img_url
    private $specifications = []; //key = spec_id, value = spec_value

    /**
     * Product constructor.
     * @param $type_id
     * @param $brand_id
     * @param $model
     * @param $price
     * @param $arhive
     * @param $quontity
     * @param array $img_urls
     * @param array $specifications
     */
    public function __construct($type_id, $brand_id, $model, $price, $quontity, array $img_urls, array $specifications){
        $this->type_id = $type_id;
        $this->brand_id = $brand_id;
        $this->model = $model;
        $this->price = $price;
        $this->quontity = $quontity;
        $this->img_urls = $img_urls;
        $this->specifications = $specifications;
    }

    /**
     * @return mixed
     */
    public function getProductId()
    {
        return $this->product_id;
    }

    /**
     * @return mixed
     */
    public function getTypeId()
    {
        return $this->type_id;
    }

    /**
     * @return mixed
     */
    public function getBrandId()
    {
        return $this->brand_id;
    }

    /**
     * @return mixed
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @return mixed
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
     * @param mixed $product_id
     */
    public function setProductId($product_id)
    {
        $this->product_id = $product_id;
    }

    /**
     * @param mixed $type_id
     */
    public function setTypeId($type_id)
    {
        $this->type_id = $type_id;
    }

    /**
     * @param mixed $brand_id
     */
    public function setBrandId($brand_id)
    {
        $this->brand_id = $brand_id;
    }

    /**
     * @param mixed $model
     */
    public function setModel($model)
    {
        $this->model = $model;
    }

    /**
     * @param mixed $price
     */
    public function setPrice($price)
    {
        $this->price = $price;
    }

    /**
     * @param mixed $arhive
     */
    public function setArhive($arhive)
    {
        $this->arhive = $arhive;
    }

    /**
     * @param mixed $quontity
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