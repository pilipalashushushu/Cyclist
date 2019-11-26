<?php
require_once("../connection.php");

$memNickName = $_POST["memNickName"];
$memId = $_POST["memId"];
$memPsw = $_POST["memPsw"];
$memEmail = $_POST["memEmail"];

echo $memNickName, $memId, $memPsw, $memEmail;

$isMemId = $pdo->prepare("select count(*) from `member` where memId=:memId");
$isMemId->bindValue(":memId", $memId);
$isMemId->execute();
$memIdCount = $isMemId->fetch();

// echo $memIdCount[0];

if($memIdCount[0] != 0){
     echo "帳號已存在";
}else{
     //insert
   $member = $pdo->exec("INSERT INTO `member`(`memNickName`,`memId`,`memPsw`,`memEmail`,`memStat`)VALUES(\"$memNickName\",\"$memId\",\"$memPsw\",\"$memEmail\",\"1\")"                                                                                           

);//執行之
   echo "success";
 }
?>