<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ITTech - online shop</title>
</head>
<body>
<h2>Registration</h2>
<form method="post" action="../controler/register_controller.php">
    Name *
    <input type="text" size="50" required name="name"><br/>
    Surname *
    <input type="text" size="50" required name="surname"><br/>
    E-mail *
    <input type="email" size="50" required name="e-mail"><br/>
    Password *
    <input type="password" size="50" required name="password"><br/>
    Confirm password *
    <input type="password" size="50" required name="confirmPassword"><br/>
    Gender *
    <input type="radio" name="man" value="m">Man
    <input type="radio" name="woman" value="woman">Woman <br/>
    Date of birth *
    <select name="day">
        <option>Day</option>
        <?php
        for($i = 1; $i <= 31; $i++){
            echo "<option value='$i'>$i</option>";
        }
        ?>
    </select>
    <select name="month">
        <option>Month</option>
		<?php
		for($i = 1; $i <= 12; $i++){
			echo "<option value='$i'>$i</option>";
		}
		?>
    </select>
    <select name="year">
        <option>Year</option>
		<?php
		for($i = 1897; $i <= 2017; $i++){
			echo "<option value='$i'>$i</option>";
		}
		?>
    </select><br/>
    <input type="radio" name="notification" value="I want to receive information about promotions and new products"><br/>
    <input type="radio" name="conditions" value="I accept the terms of use" onclick="window.location='conditionsForOnlineShopping.html'">
</form>
</body>
</html>