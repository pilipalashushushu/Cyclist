<?php
$adminNo = $_POST["adminNo"];
$adminId = $_POST["adminId"];
$adminPsw = $_POST["adminPsw"];
$adminName = $_POST["adminName"];
// $adminStat = $_POST["adminStat"];


try{
    require_once("../../connection.php");  
    $sql="INSERT INTO `adminster` (`adminNo`, `adminId`, `adminPsw`, `adminName`, `adminDate`, `adminStat`) VALUES ('$adminNo', '$adminId', '$adminPsw', '$adminName', now(), '0');";
    $addAdmin =$pdo->prepare($sql);
    $adminRows = $addAdmin->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($adminRows);
    $addAdmin->execute();

}catch(PDOException $e){
    echo $e->getMessage();
  }


?>