<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 15:09
 */

namespace model\users;


class User{
    /**
     * @var integer
     */
    private $user_id;
    /**
     * @var string
     */
    private $name;
    /**
     * @var string
     */
    private $family_name;
    /**
     * @var string
     */
    private $email;
    /**
     * @var string
     */
    private $password;
    /**
     * @var string
     */
    private $gender;
    /**
     * @var string (YEAR-MONTH-DAY)
     */
    private $birthday;
    /**
     * @var int (get notifications = 1, don't get notifications = 0)
     */
    private $notifications;
    /**
     * @var int (is admin = 1, not admin = 0)
     */
    private $is_admin;

    /**
     * User constructor.
     * @param string $name
     * @param string $family_name
     * @param string $email
     * @param string $password
     * @param string $gender
     * @param string $birthday (YEAR-MONTH-DAY)
     * @param int $notifications (get notifications = 1, don't get notifications = 0)
     * @param int $is_admin (is admin = 1, not admin = 0)
     */
    public function __construct($name, $family_name, $email, $password, $gender, $birthday, $notifications)
    {
        $this->name = $name;
        $this->family_name = $family_name;
        $this->email = $email;
        $this->password = $password;
        $this->gender = $gender;
        $this->birthday = $birthday;
        $this->notifications = $notifications;
    }

    /**
     * @param integer $user_id
     */
    public function setUserId($user_id){
        $this->user_id = $user_id;
    }
    /**
     * @param string $family_name
     */
    public function setFamilyName($family_name){
        $this->family_name = $family_name;
    }

    /**
     * @param string $email
     */
    public function setEmail($email){
        $this->email = $email;
    }

    /**
     * @param string $password
     */
    public function setPassword($password){
        $this->password = $password;
    }

    /**
     * @param int $notifications (get notifications = 1, don't get notifications = 0)
     */
    public function setNotifications($notifications){
        $this->notifications = $notifications;
    }
	
	/**
	 * @param $isAdmin
	 */
	
    public function setIsAdmin($isAdmin){
	   $this->is_admin = $isAdmin;
    }
	
    /**
     * @return string
     */
    public function getName(){
        return $this->name;
    }

    /**
     * @return string
     */
    public function getFamilyName(){
        return $this->family_name;
    }

    /**
     * @return string
     */
    public function getBirthday(){
        return $this->birthday;
    }

    /**
     * @return string
     */
    public function getEmail(){
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPassword(){
        return $this->password;
    }
    /**
     * @return string
     */
    public function getGender(){
        return $this->gender;
    }

    /**
     * @return int
     */
    public function getNotifications(){
        return $this->notifications;
    }

    /**
     * @return int
     */
    public function getIsAdmin(){
        return $this->is_admin;
    }

    /**
     * @return integer
     */
    public function getUserId(){
        return $this->user_id;
    }

}