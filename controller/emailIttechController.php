
<!--TODO discuss with Georgi this code-->

<?php
if(isset($_POST['send'])){
	$to = "ittech.eshop@egmail.com"; // this is the receiver's Email address
    $from = $_POST['email']; // this is the sender's Email address
	$firstName = $_POST['name'];
	$phoneNumber = $_POST['phoneNumber'];
	$subject = "Form submission";
	$subject2 = "Copy of your form submission";
	$message = $firstName . " wrote the following:" . "\n\n" . $_POST['message'];
	$message2 = "Here is a copy of your message " . $firstName . "\n\n" . $_POST['message'];
	
	$headers = "From:" . $from;
	$headers2 = "From:" . $to;
	mail($to,$subject,$message,$headers);
	mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
	
	echo "Mail Sent. Thank you " . $firstName . ", we will contact you shortly.";
	// You can also use header('Location: thank_you.php'); to redirect to another page.
}
?>

<?php
//$to      = 'georgi.dimov@onlinedirect.bg';
//$subject = 'Fake sendmail test';
//$message = 'If we can read this, it means that our fake Sendmail setup works!';
//$headers = 'From: ittech.eshop@egmail.com' . "\r\n" .
//    'BCC: shogydimov@gmail.com,ittech.eshop@gmail.com' . "\r\n" .
//    'X-Mailer: PHP/' . phpversion();
//
//if(mail($to, $subject, $message, $headers)) {
//    echo 'Email sent successfully!';
//} else {
//    die('Failure: Email was not sent!');
//}
//?>
