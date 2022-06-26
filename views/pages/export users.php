<?php
include '../config/dbconfig.php';

if(isset($_POST['export_user'])){
   $getusers = "SELECT UserName,Email,PhoneNumber,Status,FirstName,LastName,IsAdmin,Interests,Status FROM user";
   $users =mysqli_query($db,$getusers);
   $report='"No","User Name","Email","Phone","Status","First Name","Last Name","Is Admin","Interests","Status"'."\n";
   $count = 1;
 while ($q = mysqli_fetch_assoc($users)) {
   $report .= $count++.",";
 foreach($q AS $key => $value){
      $report .= '"'.$value.'",';
   }
   $report .= "\n";
 }
 echo $report;
 date_default_timezone_set('Africa/Addis_Ababa');
 $curr_date=date('d-m-y');;
 $fileName="User List Report(".$curr_date.").csv";
 header("Content-type: application/csv");
header("Content-Disposition: attachment; filename=".$fileName);
 exit;
 header("Location:index.php");
}
?>