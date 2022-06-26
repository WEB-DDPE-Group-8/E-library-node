<?php
    $pdo = new PDO('mysql:host=localhost;dbname=a2zlibrary', 'root');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $user = $_GET['user'] ?? '';
    $event = $_GET['event'] ?? '';
    $book = $_GET['book'] ?? '';

    // $select_users = mysqli_query($db, "SELECT * FROM user") or die("query failed");
    // $select_events = mysqli_query($db, "SELECT * FROM event") or die("query failed");

    if($event){
        $select_events = mysqli_query($db, "SELECT * FROM event WHERE NAME LIKE '%$event%' order by NAME ASC") or die("query failed");
        // $statementsearch = $pdo->prepare("SELECT * FROM event WHERE NAME LIKE :title order by NAME ASC");
        // $statementsearch->bindValue('title',"%$event%");
        // $statementsearch->execute();
        // $books = $statementsearch->fetchAll(PDO::FETCH_ASSOC);
    }
    else if($user){
        $select_users = mysqli_query($db, "SELECT * FROM user WHERE UserName LIKE '%$user%' order by UserName ASC") or die("query failed");
    //   $statement= $pdo->prepare("SELECT * FROM books order by BookID DESC LIMIT $start_from, $record_per_page ");
    //   $statement->execute();
    //   $books = $statement->fetchAll(PDO::FETCH_ASSOC); 
    }
    else if($book){
        $select_books = mysqli_query($db, "SELECT * FROM books WHERE (Title LIKE '%$book%') OR  (Genre LIKE '%$book%') OR (Author LIKE '%$book%') OR (Language LIKE '%$book%') 
         order by Title ASC") or die("query failed");
    //   $statement= $pdo->prepare("SELECT * FROM books order by BookID DESC LIMIT $start_from, $record_per_page ");
    //   $statement->execute();
    //   $books = $statement->fetchAll(PDO::FETCH_ASSOC); 
    }
    else{
        $select_users = mysqli_query($db, "SELECT * FROM user") or die("query failed");
        $select_events = mysqli_query($db, "SELECT * FROM event") or die("query failed");
        $select_books = mysqli_query($db, "SELECT * FROM books") or die("query failed");
    }