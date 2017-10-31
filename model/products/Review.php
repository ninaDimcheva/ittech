<?php
/**
 * Created by PhpStorm.
 * User: shogy
 * Date: 30-Oct-17
 * Time: 20:06
 */

namespace model\products;
use model\JsonObject;

class Review extends JsonObject{
    /**
     * @var int
     */
    protected $review_id;
    /**
     * @var int
     */
    protected $product_id;
    /**
     * @var int
     */
    protected $user_id;
    /**
     * @var int
     */
    protected $rating;
    /**
     * @var string
     */
    protected $review;
    /**
     * @var string (YEAR-MONTH-DAY)
     */
    protected $reviewDate;
    /**
     * @var string
     */
    protected $fullName;

    /**
     * Review constructor.
     * @param int $product_id
     * @param int $user_id
     * @param int $rating
     * @param string $review
     */
    public function __construct($product_id, $user_id, $rating, $review){
        $this->product_id = $product_id;
        $this->user_id = $user_id;
        $this->rating = $rating;
        $this->review = $review;
    }

    /**
     * @param int $review_id
     */
    public function setReviewId($review_id){
        $this->review_id = $review_id;
    }

    /**
     * @param string $review_date
     */
    public function setReviewDate($reviewDate)
    {
        $this->reviewDate = $reviewDate;
    }

    /**
     * @param string $name
     */
    public function setFullName($fullName)
    {
        $this->fullName = $fullName;
    }

    /**
     * @return int
     */
    public function getProductId()
    {
        return $this->product_id;
    }

    /**
     * @return int
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * @return int
     */
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * @return string
     */
    public function getReview()
    {
        return $this->review;
    }

    /**
     * @return string
     */
    public function getReviewDate()
    {
        return $this->review_date;
    }

}