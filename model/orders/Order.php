<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 15:31
 */

namespace model\orders;


class Order{
    private $order_id;
    private $user_id;
    private $total;
    private $date;
    private $status;
    private $products=[]; //key = product_id, value = quontity

    /**
     * Order constructor.
     * @param $user_id
     * @param $total
     * @param $date
     * @param $status
     * @param array $products
     */
    public function __construct($user_id, $total, $date, $status, array $products){
        $this->user_id = $user_id;
        $this->total = $total;
        $this->date = $date;
        $this->status = $status;
        $this->products = $products;
    } //key=product_id,value=quantity



    /**
     * @return mixed
     */
    public function getUserId(){
        return $this->user_id;
    }

    /**
     * @return mixed
     */
    public function getOrderId(){
        return $this->order_id;
    }

    /**
     * @return mixed
     */
    public function getDate(){
        return $this->date;
    }

    /**
     * @return mixed
     */
    public function getStatus(){
        return $this->status;
    }

    /**
     * @return mixed
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
     * @param mixed $date
     */
    public function setDate($date){
        $this->date = $date;
    }

    /**
     * @param mixed $order_id
     */
    public function setOrderId($order_id){
        $this->order_id = $order_id;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status){
        $this->status = $status;
    }

    /**
     * @param mixed $total
     */
    public function setTotal($total){
        $this->total = $total;
    }

    /**
     * @param mixed $user_id
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