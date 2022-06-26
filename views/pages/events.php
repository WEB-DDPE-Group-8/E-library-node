<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../multimedia/logo.png" type="image/icon type">
  <title>Document</title>
</head>

<body>
  <?php 
include '../config/dbconfig.php';
include("../inc/nav_bar.php") ;
if(isset($_GET['q']))
{
  $events = $_GET['q'];
  $sql = "SELECT * FROM `event` WHERE NAME='$events' ";
  $ev = mysqli_query($db,$sql);
  $event = mysqli_fetch_assoc($ev);
}
 ?>
  <center>
    <img src="<?php  echo $event["IMAGE"]  ?>" alt="event picture" srcset="">

    <h1> <u><?php  echo $event["NAME"]  ?> </u></h1>
  </center>

  <p> <?php  echo $event["DESCRIPTION"]  ?></p>
  <?php 
include("../inc/footer.php");
 ?>
</body>

</html>