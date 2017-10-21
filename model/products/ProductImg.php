<?php
/**
 * Created by PhpStorm.
 * User: Nini
 * Date: 20.10.2017 г.
 * Time: 18:14 ч.
 */

namespace model\products;

use model\JsonObject;
class ProductImg extends JsonObject
{
    /**
     * @var string
     */
	protected $img_url;
    /**
     * @var string
     */
	protected $alt;
    /**
     * @var string
     */
    /**
     * @var string
     */
    protected $tmpName;
    /**
     * @var integer
     */
    protected $size;
    /**
     * @var string
     */
	protected $fileExtension;
    /**
     * @var string
     */
	protected $fileType;

    /**
     * ProductImg constructor.
     * @param string $alt
     * @param string $img_url
     */
	function __construct($alt, $img_url = null)
	{
        $this->alt = $alt;
	    $this->img_url = $img_url;
	}

    /**
     * @param string $img_url
     */
    public function setImgUrl($img_url)
    {
        $this->img_url = $img_url;
    }

    /**
     * @param string $fileExtension
     */
    public function setFileExtension($fileExtension)
    {
        $this->fileExtension = $fileExtension;
    }

    /**
     * @param string $alt
     */
    public function setAlt($alt)
    {
        $this->alt = $alt;
    }

    /**
     * @param string $fileType
     */
    public function setFileType($fileType)
    {
        $this->fileType = $fileType;
    }

    /**
     * @param int $size
     */
    public function setSize($size)
    {
        $this->size = $size;
    }

    /**
     * @param string $tmpName
     */
    public function setTmpName($tmpName)
    {
        $this->tmpName = $tmpName;
    }
	/**
	 * @return string
	 */
	public function getImgUrl()
	{
		return $this -> img_url;
	}

    /**
     * @return string
     */
    public function getAlt()
    {
        return $this->alt;
    }

    /**
     * @return string
     */
    public function getFileExtension()
    {
        return $this->fileExtension;
    }

    /**
     * @return string
     */
    public function getFileType()
    {
        return $this->fileType;
    }

    /**
     * @return int
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * @return string
     */
    public function getTmpName()
    {
        return $this->tmpName;
    }
}