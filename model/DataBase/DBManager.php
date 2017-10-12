<?php

namespace model\db;

class DBManager
{
	private static $instance;
	private $pdo;
	const DB_IP   = "93.152.179.240";
	const DB_PORT = "3306";
	const DB_USER = "ittech";
	const DB_PASS = "ittech2017";
	const DB_NAME = "ittech";
	
	private function __construct(){
		try{
			$this->pdo = new \PDO("mysql:host=".self::DB_IP.":".self::DB_PORT.";dbname=".self::DB_NAME, self::DB_USER, self::DB_PASS);
			$this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
			$this->pdo->query("USE " . self::DB_NAME);
		}
		catch (PDOException $e){
			echo "Ops! PDO Problem - " . $e->getMessage();
		}
	}
	
	public static function getInstance(){
		if(self::$instance === null){
			self::$instance = new DBManager();
		}
		return self::$instance;
	}
	
	public function getConnection(){
		return $this->pdo;
	}
}
