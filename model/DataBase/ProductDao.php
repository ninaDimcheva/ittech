<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 18:56
 */

namespace model\DataBase;

use model\products\Product;
use model\products\ProductSpec;
use model\products\ProductImg;

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
     * @return array $imgUrls
     */
    public function insertProduct(Product $product){
        try{
            $this->pdo->beginTransaction();
            $stm = $this->pdo->prepare ("SELECT `type_id` FROM `types` WHERE `type` = ?");
            $stm->execute(array($product->getType()));
            $product->setTypeId($stm->fetch(\PDO::FETCH_ASSOC)['type_id']);

            $stm = $this->pdo->prepare ("SELECT `brand_id` FROM `brands` WHERE `brand` = ?");
            $stm->execute(array($product->getBrand()));
            $product->setBrandId($stm->fetch(\PDO::FETCH_ASSOC)['brand_id']);

            $stm = $this->pdo->prepare ("SELECT `spec_id` FROM `specifications` WHERE `name` = ?");
            $specifications = array();
            foreach ($product->getSpecifications() as $spec) {
                $stm->execute(array(str_replace('_',' ', $spec->getName())));
                $spec_id = $stm->fetch(\PDO::FETCH_ASSOC)['spec_id'];
                $spec->setSpecId($spec_id);
                $specifications[] = $spec;
            }

            $product->setSpecifications($specifications);


            $stm = $this->pdo->prepare("INSERT INTO `products` (`type_id`, `brand_id`, `model`, `price`, `quontity`) VALUES (?, ?, ?, ?, ?)");
            $stm->execute(array($product->getTypeId(), $product->getBrandId(), $product->getModel(),$product->getPrice(),$product->getQuontity()));
            $product->setProductId($this->pdo->lastInsertId());

            $stm = $this->pdo->prepare("INSERT INTO `products_specifications` (`product_id`, `spec_id`, `value`) VALUES (?, ?, ?)");
            foreach ($product->getSpecifications() as $spec) {
                $stm-> execute(array($product->getProductId(),$spec->getSpecId(),$spec->getValue()));
            }

            foreach ($product->getImgs() as $key => $img) {
                $img->setImgUrl('assets/uploads/' . $product->getProductId() . '_' .  $key . '.' . $img->getFileExtension());
                $imgs[] = $img;

            }
            $product->setImgs($imgs);
            $stm = $this->pdo->prepare("INSERT INTO `products_imgs` (`product_id`, `img_url`, `alt`) VALUES (?, ?, ?)");
            foreach ($product->getImgs() as $img) {
                $stm-> execute(array($product->getProductId(),$img->getImgUrl(), $img->getAlt()));
            }
            $this->pdo->commit();
            return $product->getImgs();
        }catch (\PDOException $e){
            $this->pdo->rollBack();
            throw new \PDOException($e->getMessage(),$e->getCode());
        }
    }

    /**
     * @param $produvt_id
     * @param $quantity
     */
    public function editProductQuantity($produvt_id,$quantity){
        $stm = $this->pdo->prepare("UPDATE `products` SET `quontity` = ? WHERE `product_id` = ?");
        $stm->execute(array($quantity,$produvt_id));
    }

	/**
	 * @return array with product objects
	 */
    public function getAllProducts($searched){
        if ($searched == "null"){

            $stm = $this->pdo->prepare("SELECT  P.`product_id`, T.`type`, B.`brand`, P.`model`, P.`price`, P.`quontity` 
                                              FROM `products` as P
                                              JOIN `types` as T ON P.`type_id` = T.`type_id`
                                              JOIN `brands` as B ON P.`brand_id` = B.`brand_id`
                                              WHERE P.`archive` is null");
            $stm->execute();
            $result = $stm -> fetchAll(\PDO::FETCH_ASSOC);
        }else{

            $stm = $this->pdo->prepare("SELECT  P.`product_id`, T.`type`, B.`brand`, P.`model`, P.`price`, P.`quontity` 
                                              FROM `products` as P
                                              JOIN `types` as T ON P.`type_id` = T.`type_id`
                                              JOIN `brands` as B ON P.`brand_id` = B.`brand_id`
                                              WHERE T.`type` LIKE ? OR B.`brand` LIKE ? OR P.`model` LIKE ? AND P.`archive` is null");
            $stm->execute(array("%$searched%","%$searched%","%$searched%"));
            if ($stm->rowCount() > 0){
                $result = $stm -> fetchAll(\PDO::FETCH_ASSOC);
            }else{
                return $searched;
            }
        }
        foreach ($result as $row) {
            $product = new Product($row['type'], $row['brand'], $row['model'], $row['price'], $row['quontity'], array(), array());
            $product->setProductId($row['product_id']);
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
            $specifications= array();
            foreach ($result as $row) {
            	$spec = new ProductSpec($row['spec_name'], $row['spec_value']);
            	$specifications[] = $spec;
            }
            $product->setSpecifications($specifications);
        }

        $stm = $this->pdo->prepare("SELECT `img_url`, `alt` FROM `products_imgs` WHERE `product_id` = ? ORDER BY `product_id`");
        foreach ($products as $product){
            $stm->execute(array($product->getProductId()));
            $result =  $stm -> fetchAll(\PDO::FETCH_ASSOC);
            $imgs = array();
            foreach ($result as $row) {
            	$img = new ProductImg($row['alt'],$row['img_url']);
                $imgs[] = $img;
            }
            $product->setImgs($imgs);
        }
        return $products;
    }

    /**
     * @return array with main_types
     */
    public function getMainTypes(){
        $stm = $this->pdo->prepare("SELECT `main_type` FROM `main_types` ");
        $stm->execute();
        return $stm->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * @param $mainTipe
     * @return array with types
     */
    public  function getTypes($mainTipe){
        $stm = $this->pdo->prepare("SELECT `type` FROM `types` JOIN `main_types` using (main_type_id) WHERE main_type = ?");
        $stm->execute(array($mainTipe));
        return $stm->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getSpecifications($type){
        $stm = $this->pdo->prepare("SELECT `name` FROM `specifications` 
                                              JOIN `type_specifications` using (`spec_id`)
                                              JOIN `types` USING (`type_id`)
                                               WHERE `type` = ?; ");
        $stm->execute(array($type));
        return $stm->fetchAll(\PDO::FETCH_ASSOC);
    }
    public function getBrands(){
        $stm = $this->pdo->prepare("SELECT `brand` FROM `brands` ");
        $stm->execute();
        return $stm->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function search($searched){
        $stm = $this->pdo->prepare("SELECT  P.`product_id`
                                              FROM `products` as P
                                              JOIN `types` as T ON P.`type_id` = T.`type_id`
                                              JOIN `brands` as B ON P.`brand_id` = B.`brand_id`
                                              WHERE T.`type` LIKE ? OR B.`brand` LIKE ? OR P.`model` LIKE ? AND P.`archive` is null");
        $stm->execute(array("%$searched%", "%$searched%", "%$searched%"));

        if ($stm->rowCount() > 0) {
            return  $stm->fetchAll(\PDO::FETCH_ASSOC);

        }else{
            return false;
        }
    }
}