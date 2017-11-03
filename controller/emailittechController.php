<?php
if (isset($_POST['contactUs'])) {
    $name = trim(htmlentities($_POST['name']));
    $familyName = trim(htmlentities($_POST['familyName']));
    $email = trim(htmlentities($_POST['email']));
    $atSignPos = strpos($email, '@');
    $phoneNumber = trim(htmlentities($_POST['phoneNumber']));
    $message = trim(htmlentities($_POST['message']));
    $error = false;

    if (strlen($name) == 0 || strlen($name) > 45 || is_numeric($name)) {
        $error = true;
    }
    if (strlen($familyName) == 0 || strlen($familyName) > 45 || is_numeric($familyName)) {
        $error = true;
    }
    if (strlen($email) == 0 || strlen($email) > 45 || $atSignPos < 1) {
        $error = true;
    }
    if (strlen($phoneNumber) < 9 || strlen($phoneNumber) > 45) {
        $error = true;
    }
    if (strlen($message) == 0 || strlen($message) > 500) {
        $error = true;
    }
	
    if (!$error) {
        $to = 'ittech.eshop@egmail.com';
        $subject = 'Form submission';
        $message = $name . " " . $familyName . " with email:" . $email . " and PhoneNumber:" . $phoneNumber . " wrote the following:" . "\n\n" . $message;
        $headers = 'From: ittech.eshop@egmail.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
        if (mail($to, $subject, $message, $headers)) {
            echo  "Mail Sent successfully. Thank you " . $name . " " . $familyName . ", we will contact you shortly.";
            header("Location:../");
        } else {
            header("Location:../?page=error500");
        }
    }else {
        header("Location:../?page=error400");
    }
}

