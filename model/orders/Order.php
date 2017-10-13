<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 15:31
 */

namespace model\orders;


class Order{
    /**
     * @var integer
     */
    private $order_id;
    /**
     * @var integer
     */
    private $user_id;
    /**
     * @var double
     */
    private $total;
    /**
     * @var string (YEAR-MONTH-DAY)
     */
    private $date;
    /**
     * @var string
     */
    private $status;
    /**
     * @var array
     */
    private $products=[]; //key = product_id, value = quontity

    /**
     * Order constructor.
     * @param integer $user_id
     * @param double $total
     * @param string $date (YEAR-MONTH-DAY)
     * @param string $status
     * @param array $products
     */
    public function __construct($user_id, $total, $date, $status, array $products){
        $this->user_id = $user_id;
        $this->total = $total;
        $this->date = $date;
        $this->status = $status;
        $this->products = $products;
    }

    /**
     * @return integer
     */
    public function getUserId(){
        return $this->user_id;
    }

    /**
     * @return integer
     */
    public function getOrderId(){
        return $this->order_id;
    }

    /**
     * @return string
     */
    public function getDate(){
        return $this->date;
    }

    /**
     * @return string
     */
    public function getStatus(){
        return $this->status;
    }

    /**
     * @return double
     */
    public function getTotal(){
        return $this->total;
    }

    /**
     * @return array
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * @param string $date (YEAR-MONTH-DAY)
     */
    public function setDate($date){
        $this->date = $date;
    }

    /**
     * @param integer $order_id
     */
    public function setOrderId($order_id){
        $this->order_id = $order_id;
    }

    /**
     * @param string $status
     */
    public function setStatus($status){
        $this->status = $status;
    }

    /**
     * @param double $total
     */
    public function setTotal($total){
        $this->total = $total;
    }

    /**
     * @param integer $user_id
     */
    public function setUserId($user_id){
        $this->user_id = $user_id;
    }

    /**
     * @param array $products
     */
    public function setProducts($products)
    {
        $this->products = $products;
    }
}