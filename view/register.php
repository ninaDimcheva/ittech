<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ITTech - online shop</title>
    <link rel="stylesheet" type="text/css" href="../style/css.css">
</head>
<body>
<h2>Registration</h2>
<form method="post" action="../controler/register_controller.php">
    <label>Name *</label>
    <input type="text" size="50" required name="name"><br/>
    <label>Surname *</label>
    <input type="text" size="50" required name="surname"><br/>
    <label>E-mail *</label>
    <input type="email" size="50" required name="e-mail"><br/>
    <label>Password *</label>
    <input type="password" size="50" required name="password"><br/>
    <label>Confirm password *</label>
    <input type="password" size="50" required name="confirmPassword"><br/>
    <label>Gender *</label>
    <input type="radio" name="man" value="m">Man
    <input type="radio" name="woman" value="woman">Woman <br/>
    <label>Date of birth *
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
    <input type="radio" name="notification" value="notifications">I want to receive information about promotions and new products<br/>
    <input type="radio" name="conditions" value="terms" onclick="window.location='conditionsForOnlineShopping.html';">I accept the terms of use<br/>
    <input type="submit" name="register" value="Register">
</form>
</body>
</html>