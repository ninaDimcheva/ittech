<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 18:56
 */

namespace model\DataBase;


use model\products\Product;

class ProductDao{
    private static $instance;
    /**
     * @var \PDO
     */
    private $pdo;

    /**
     * ProductDao constructor.
     */
    private function __construct() {
        $this->pdo = DBManager::getInstance()->getConnection();
    }

    /**
     * @return ProductDao
     */
    public static function getInstance(){
        if(self::$instance === null){
            self::$instance = new ProductDao();
        }
        return self::$instance;
    }

    /**
     * @param Product $product
     */
    public function insertProduct(Product $product){
        try{
            $this->pdo->beginTransaction();
            $stm = $this->pdo->prepare("INSERT INTO `products` (`type_id`, `brand_id`, `model`, `price`, `quontity`) VALUES (?, ?, ?, ?, ?)");
            $stm->execute(array($product->getTypeId(), $product->getBrandId(), $product->getModel(),$product->getPrice(),$product->getQuontity()));
            $product->setProductId($this->pdo->lastInsertId());
            $stm = $this->pdo->prepare("INSERT INTO `products_urls` (`product_id`, `img_url`) VALUES (?, ?)");
            foreach ($product->getImgUrls() as $img_url) {
                $stm-> execute(array($product->getProductId(),$img_url));
            }
            $stm = $this->pdo->prepare("INSERT INTO `products_specifications` (`product_id`, `spec_id`, `value`) VALUES (?, ?, ?)");
            foreach ($product->getSpecifications() as $spec_id => $value) {
                $stm-> execute(array($product->getProductId(),$spec_id,$value));
            }
            $this->pdo->commit();
        }catch (\PDOException $e){
            $this->pdo->rollBack();
            throw new \PDOException($e->getMessage(),$e->getCode());
        }
    }
    
    // TODO we need to add query to change the quantity of the products;

//    public function getAllProducts(){
//        $stm = $this->pdo->prepare("SELECT ``");
//    }




}