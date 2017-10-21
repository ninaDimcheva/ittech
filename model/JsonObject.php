<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 19.10.2017 г.
 * Time: 14:40 ч.
 */

namespace model;


abstract class JsonObject implements \JsonSerializable{
	public function jsonSerialize(){
		return get_object_vars($this);
	}
}