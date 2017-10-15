<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 18:56
 */

namespace model\DataBase;

//require_once '../products/Product.php';
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

    /**
     * @return object (model\products\Product)
     */
    public function getAllProducts(){
        $stm = $this->pdo->prepare("SELECT  P.`product_id`, T.`type`, B.`brand`, P.`model`, P.`price`, P.`quontity` 
                                              FROM `products` as P
                                              JOIN `types` as T ON P.`type_id` = T.`type_id`
                                              JOIN `brands` as B ON P.`brand_id` = B.`brand_id`
                                              WHERE P.`archive` is null");
        $stm->execute();
        $result = $stm -> fetchAll(\PDO::FETCH_ASSOC);
        foreach ($result as $key => $row) {
            $product = new Product(array(),array());
            $product->setProductId($row['product_id']);
            $product->setType($row['type']);
            $product->setBrand($row['brand']);
            $product->setModel($row['model']);
            $product->setPrice($row['price']);
            $product->setQuontity($row['quontity']);
            $products[] = $product;
            }
        $stm = $this->pdo->prepare("SELECT S.`name` as spec_name, PS.`value` as spec_value
                                              FROM `products_specifications` as PS
                                              JOIN `specifications` as S ON PS.`spec_id` = S.`spec_id`
                                              WHERE `product_id` = ?
                                              order by `product_id`");

        foreach ($products as $product){
            $stm->execute(array($product->getProductId()));
            $result =  $stm -> fetchAll(\PDO::FETCH_ASSOC);
            $specifications=[];
            foreach ($result as $row) {
                $specifications[$row['spec_name']] = $row['spec_value'];
            }
            $product->setSpecifications($specifications);
        }

        $stm = $this->pdo->prepare("SELECT `img_url` FROM `products_urls` WHERE `product_id` = ? ORDER BY `product_id`");
        foreach ($products as $product){
            $stm->execute(array($product->getProductId()));
            $result =  $stm -> fetchAll(\PDO::FETCH_ASSOC);
            $img_urls = [];
            foreach ($result as $row) {
                $img_urls[] = $row['img_url'];
            }
            $product->setImgUrls($img_urls);
        }
        return $products;
    }

    public function getMainTypes(){
        $stm = $this->pdo->prepare("SELECT `main_type` FROM `main_types` ");
        $stm->execute();
        return $stm->fetchAll(\PDO::FETCH_ASSOC);
    }
    public  function getTypes($mainTipe){
        $stm = $this->pdo->prepare("SELECT `type` FROM `types` JOIN `main_types` using (main_type_id) WHERE main_type = ?");
        $stm->execute(array($mainTipe));
        return $stm->fetchAll(\PDO::FETCH_ASSOC);
    }
}