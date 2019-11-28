<?php


$errMsg = "";
try {
  require_once("../connection.php");

	$sql = "select * from `activity`";
    // $activitys = $pdo->prepare($sql);
    // $activitys ->bindValue($sql);
    // $activitys ->execute();
    $activities = $pdo->query($sql);

}catch(PDOException $e){
    $errMsg .= "錯誤訊息: ". $e->getMessage(). "<br>";
	  $errMsg .= "錯誤行號: ". $e->getLine(). "<br>";
	// echo "系統暫時有狀況，請.....";

}

  if($errMsg!==""){
      echo $errMsg;
  }elseif($activities->rowCount()==0){
      echo "活動為空";
    }else{
      $arr=array();
      while($actRow = $activities->fetch(PDO::FETCH_ASSOC)){
        //  echo "<pre>".print_r($actRow)."</pre>";
          array_push($arr,$actRow); 
        }
        // echo "<pre>".print_r($arr)."</pre>";
        // print_r($actRow);
        echo json_encode($arr);
        // print_r($arr);

  }


?>