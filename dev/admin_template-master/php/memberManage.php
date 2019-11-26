<?php
try{
    require_once("../../connection.php");
    
    $sql="select * from `member`";
    $member=$pdo->query($sql);
    $memRows = $member->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $memRows);
    // if($member->rowCount()==0){

    // }else{
        
    //   while($result = $member->fetch(PDO::FETCH_ASSOC)){
    //     echo json_encode( $result,JSON_UNESCAPED_UNICODE);
    //   };
       
    // }

}catch(PDOException $e){
    echo $e->getMessage();
  }
?>