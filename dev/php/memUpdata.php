<?php 
ob_start();
session_start();
$memNo=$_SESSION["memNo"];
$errMsg ="";
try {
	require_once("../connection.php");

	//$sql ="UPDATE `member` SET memNickName='$_REQUEST[memNickName]',memId='$_REQUEST[memId]',memPsw='$_REQUEST[memPsw]',memName='$_REQUEST[memName]',memEmail='$_REQUEST[memEmail]',memAddr='$_REQUEST[memAddr]',tel='$_REQUEST[tel]' WHERE memNo='$_SESSION[memNo]'";
	//$sql ="UPDATE `member` SET memNickName='$_REQUEST[memNickName]',memId='$_REQUEST[memId]',memPsw='$_REQUEST[memPsw]',memName='$_REQUEST[memName]',memEmail='$_REQUEST[memEmail]',memAddr='$_REQUEST[memAddr]',tel='$_REQUEST[tel]' WHERE memNo='$_SESSION[memNo]'";
	$sql ="UPDATE `member` SET memNickName='$_REQUEST[memNickName]',memId='$_REQUEST[memId]',memPsw='$_REQUEST[memPsw]',memName='$_REQUEST[memName]',memEmail='$_REQUEST[memEmail]',memAddr='$_REQUEST[memAddr]',tel='$_REQUEST[tel]' WHERE memNo=$memNo";

    $member = $pdo->prepare($sql);
	$member->execute();


} catch (PDOException $e) {
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
  	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
  	echo $errMsg;
}
?>    