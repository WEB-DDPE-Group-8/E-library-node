<?php

//data.php

$connect = new PDO("mysql:host=localhost;dbname=a2zlibrary", "root", "");

if(isset($_POST["action"]))
{
	if($_POST["action"] == 'fetch')
	{
		$query = "
		SELECT Genre, COUNT(BookID) AS Total 
		FROM books
		GROUP BY Genre
		";

		$result = $connect->query($query);

		$data = array();

		foreach($result as $row)
		{
			$data[] = array(
				'language'		=>	$row["Genre"],
				'total'			=>	$row["Total"],
				'color'			=>	'#' . rand(100000, 999999) . ''
			);
		}

		echo json_encode($data);
    }

        if($_POST["action"] == 'fetch1')
	{
        $query1 = "
		SELECT IsAdmin, COUNT(UserID) AS Total 
		FROM user
		GROUP BY IsAdmin
		";

		$result1 = $connect->query($query1);

		$data1 = array();

		foreach($result1 as $row)
		{
			$data1[] = array(
				'language'		=>	$row["IsAdmin"],
				'total'			=>	$row["Total"],
				'color'			=>	'#' . rand(100000, 999999) . ''
			);
		}

		echo json_encode($data1);
    }

    
    if($_POST["action"] == 'fetchevent')
	{
        $query2 = "
		SELECT Status, COUNT(NAME) AS Total 
		FROM event
		GROUP BY Status
		";

		$result2 = $connect->query($query2);

		$data_e = array();

		foreach($result2 as $row)
		{
			$data_e[] = array(
				'language'		=>	$row["Status"],
				'total'			=>	$row["Total"],
				'color'			=>	'#' . rand(100000, 999999) . ''
			);
		}

		echo json_encode($data_e);
    }
	}



?>