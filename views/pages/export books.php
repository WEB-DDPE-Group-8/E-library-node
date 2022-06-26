<?php 

if(isset($_POST['export_book'])){
      $getbooks = "SELECT Cover,Book,Title,Downloads,Author,Description,Genre,Language,Price,Likes,Dislikes,Status,Year FROM books";
      $books =mysqli_query($db,$getbooks);
      // $report='"BookID","Cover","Book","Title","Downloads","Author","Description","Genre","Language","Price","Likes","Dislikes","Status","Year"'."\n";
      $count = 1;
      $report="";
      if(mysqli_num_rows($books)>0)
    {
       while ($q = mysqli_fetch_assoc($books)) {
        $report .= $count++.",";
    foreach($q AS $key => $value){
         $report .= '"'.$value.'",';
      }
      $report .= "\n";
    }
   }
    else
    {
       $report='"no file",';
    }
    date_default_timezone_set('Africa/Addis_Ababa');
    $curr_date=date('d-m-y');;
    $fileName="Bsook List Report(".$curr_date.").csv";
    header("Content-type: text/x-csv");
    header("Content-Disposition: attachment; filename=".$fileName);
   echo $report;
    exit;
    header("Location:admin_books.php");
   }
   ?>