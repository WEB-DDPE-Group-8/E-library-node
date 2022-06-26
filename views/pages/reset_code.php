<?php
include "../config/dbconfig.php";
include("../lib/db.php");
//include "change_pass.php";

if(isset($_POST['check-reset-otp']) && $_POST['code']){
    $_SESSION['info'] = "";
    $otp_code = $_POST['code'];
    $check_code = "SELECT * FROM user WHERE code = $otp_code";
    $code_res = mysqli_query($db, $check_code);
    if(mysqli_num_rows($code_res) > 0){
        $fetch_data = mysqli_fetch_assoc($code_res);
        $email = $fetch_data['Email'];
        $_SESSION['email'] = $email;
        $info = "Please create a new password that you don't use on any other site.";
        $_SESSION['info'] = $info;
        header('location: new_pass.php');
        exit();
    }else{
        array_push($errors, "You've entered incorrect code!");
    }
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Code Verification</title>
    <link rel="stylesheet" href="../css/register.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/pass.css">
    <script src="../js/toggle.js" defer></script>
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
 
  </head>

  <body>
  <div class="container">
      <div  class="row">
      <div class="col-md-4 offset-md-4 form">
      <?php 
            foreach($errors as $error)
            {
              ?>
          <p class="error"><?php echo $error;
            }
       ?>
            </p>

      <form method = "post" action="reset_code.php">
        <h2 class = "text-center">Enter Verification Code</h3>
        <div class = "form-group">
        <span>Code</span>
        <input name="code" class="form-control" placeholder="enter your Verification Code" id="" />
        </div>
        <div class = "form-group">
        <input name = "check-reset-otp" type="submit" value="Submit Code" class="btn form-control" />
        </div>
      </form>
    </div>
 </div>
</div>


</body>
</html>