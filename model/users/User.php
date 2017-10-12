<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 12-Oct-17
 * Time: 15:09
 */

namespace model\users;


class User{

    private $user_id;
    private $name;
    private $family_name;
    private $email;
    private $password;
    private $gender;
    private $birthday;
    private $notifications;
    private $is_admin;

    /**
     * User constructor.
     * @param $name
     * @param $family_name
     * @param $email
     * @param $password
     * @param $gender
     * @param $birthday
     * @param $notifications
     * @param $is_admin
     */
    public function __construct($name, $family_name, $email, $password, $gender, $birthday, $notifications, $is_admin)
    {
        $this->name = $name;
        $this->family_name = $family_name;
        $this->email = $email;
        $this->password = $password;
        $this->gender = $gender;
        $this->birthday = $birthday;
        $this->notifications = $notifications;
        $this->is_admin = $is_admin;
    }

    /**
     * @param mixed $user_id
     */
    public function setUserId($user_id){
        $this->user_id = $user_id;
    }
    /**
     * @param mixed $family_name
     */
    public function setFamilyName($family_name){
        $this->family_name = $family_name;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email){
        $this->email = $email;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password){
        $this->password = $password;
    }

    /**
     * @param mixed $notifications
     */
    public function setNotifications($notifications){
        $this->notifications = $notifications;
    }

    /**
     * @return mixed
     */
    public function getName(){
        return $this->name;
    }

    /**
     * @return mixed
     */
    public function getFamilyName(){
        return $this->family_name;
    }

    /**
     * @return mixed
     */
    public function getBirthday(){
        return $this->birthday;
    }

    /**
     * @return mixed
     */
    public function getEmail(){
        return $this->email;
    }

    /**
     * @return mixed
     */
    public function getPassword(){
        return $this->password;
    }
    /**
     * @return mixed
     */
    public function getGender(){
        return $this->gender;
    }

    /**
     * @return mixed
     */
    public function getNotifications(){
        return $this->notifications;
    }

    /**
     * @return mixed
     */
    public function getIsadmin(){
        return $this->is_admin;
    }

    /**
     * @return mixed
     */
    public function getUserId(){
        return $this->user_id;
    }

}