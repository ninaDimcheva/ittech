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
            foreach ($product->getSpecifications() as $spec_name => $spec_value) {
                $stm->execute(array(str_replace('_',' ', $spec_name)));
                $spec_id = $stm->fetch(\PDO::FETCH_ASSOC)['spec_id'];
                $specifications[$spec_id] = $spec_value;
            }

            $product->setSpecifications($specifications);


            $stm = $this->pdo->prepare("INSERT INTO `products` (`type_id`, `brand_id`, `model`, `price`, `quontity`) VALUES (?, ?, ?, ?, ?)");
            $stm->execute(array($product->getTypeId(), $product->getBrandId(), $product->getModel(),$product->getPrice(),$product->getQuontity()));
            $product->setProductId($this->pdo->lastInsertId());

            $stm = $this->pdo->prepare("INSERT INTO `products_specifications` (`product_id`, `spec_id`, `value`) VALUES (?, ?, ?)");
            foreach ($product->getSpecifications() as $spec_id => $value) {
                $stm-> execute(array($product->getProductId(),$spec_id,$value));
            }

            foreach ($product->getImgUrls() as $imgFileExtension) {
                $imgUrls[] = 'assets/uploads/' . $product->getProductId() . $imgFileExtension;
            }
            $product->setImgUrls($imgUrls);
            $stm = $this->pdo->prepare("INSERT INTO `products_urls` (`product_id`, `img_url`) VALUES (?, ?)");
            foreach ($product->getImgUrls() as $img_url) {
                $stm-> execute(array($product->getProductId(),$img_url));
            }

            $this->pdo->commit();
            return $product->getImgUrls();
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
	 * @return array
	 */
    public function getAllProducts(){
        $stm = $this->pdo->prepare("SELECT  P.`product_id`, T.`type`, B.`brand`, P.`model`, P.`price`, P.`quontity` 
                                              FROM `products` as P
                                              JOIN `types` as T ON P.`type_id` = T.`type_id`
                                              JOIN `brands` as B ON P.`brand_id` = B.`brand_id`
                                              WHERE P.`archive` is null");
        $stm->execute();
//        if($stm->rowCount() == 0){
//        	return false;
//        }
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
    
    
}