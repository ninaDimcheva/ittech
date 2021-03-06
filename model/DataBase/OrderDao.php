<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 15:40
 */

namespace model\DataBase;
use model\orders\Order;
use model\users\User;

class OrderDao{
    private static $instance;
    /**
     * @var \PDO
     */
    private $pdo;

    /**
     * OrderDao constructor.
     */
    private function __construct() {
        $this->pdo = DBManager::getInstance()->getConnection();
    }

    /**
     * @return OrderDao
     */
    public static function getInstance(){
        if(self::$instance === null){
            self::$instance = new OrderDao();
        }
        return self::$instance;
    }

    /**
     * @param Order $order
     */
    public function insertOrder(Order $order){
        try{
            $this->pdo->beginTransaction();
            $stm = $this->pdo->prepare("INSERT INTO `orders` (`user_id`, `total`, `date`, `status`, `address`) VALUES (?, ?, ?, ?, ?)");
            $stm->execute(array($order->getUserId(), $order->getTotal(), $order->getDate(),$order->getStatus(), $order->getAddress()));
	        $order->setOrderId($this->pdo->lastInsertId());
            $stm = $this->pdo->prepare("INSERT INTO `ordered_products` (`order_id`, `product_id`, `quantity`) VALUES (?, ?, ?)");
            foreach ($order->getProducts() as $product) {
                    $stm-> execute(array($order->getOrderId(),$product -> getProductId(),$product -> getQuantity()));
            }
            $this->pdo->commit();
            return $order->getOrderId();
        }catch (\PDOException $e){
            $this->pdo->rollBack();
            throw new \PDOException($e->getMessage(),$e->getCode());
        }
    }

    /**
     * @param User $user
     * @return array
     */
    public function getOrders(User $user){
        $stm = $this->pdo->prepare("SELECT `order_id`, `total`, `date`, `status`, `address` FROM `orders` WHERE `user_id` = ?");
        $stm->execute(array($user->getUserId()));
        return $stm->fetchAll(\PDO::FETCH_ASSOC);
    }
}