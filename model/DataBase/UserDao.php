<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 13:02
 */

namespace model\DataBase;
use model\users\User;


class UserDao{

    private static $instance;
    /**
     * @var \PDO
     */
    private $pdo;

    /**
     * UserDao constructor.
     */
    private function __construct() {
        $this->pdo = DBManager::getInstance()->getConnection();
    }

    /**
     * @return UserDao
     */
    public static function getInstance(){
        if(self::$instance === null){
            self::$instance = new UserDao();
        }
        return self::$instance;
    }

    /**
     * @param User $user
     * @return bool (if exist return true, if not exist return false)
     */
    public function existsUser(User $user){
        $stm = $this->pdo->prepare("SELECT count(*) as number FROM users WHERE `email` = ?");
        $stm->execute(array($user->getEmail()));
        return $stm->fetch(\PDO::FETCH_ASSOC)["number"] > 0;
    }

    /**
     * @param $email
     * @param $password
     * @return array|bool
     */
    public function loginValidate($email,$password){
        $stm = $this->pdo->prepare("SELECT `user_id`, `name`, `family_name`, `email`, `password`, `gender`, `birthday`, `notifications`,`is_admin` FROM users WHERE `email` = ? AND `password` = ?");
        $stm->execute(array($email,$password));
        if ($stm->rowCount() > 0){
            return $stm->fetch(\PDO::FETCH_ASSOC);
        }else{
            return false;
        }
    }

    /**
     * @param User $user
     */
    public function insertUser(User $user){
        $stm = $this->pdo->prepare("INSERT INTO users (`name`, `family_name`, `email`, `password`, `gender`, `birthday`, `notifications`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stm->execute(array($user->getname(), $user->getFamilyName(), $user->getEmail(),$user->getPassword(),$user->getGender(),$user->getBirthday(),$user->getNotifications()));
        $user->setUserId($this->pdo->lastInsertId());
    }

}