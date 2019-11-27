<?php
try{
    require_once("connect.php");
    
    $sql="SELECT activity.actNo, activity.typeNo, activity.memNo,activity.actName ,activity.actLoc, activity.actStren,activity.actLimit, activity.actTotal,activity.actCancelStat,report.repStat FROM `activity`, `report` WHERE activity.memNo = report.memNo";
    $activity=$pdo->query("select * from `activity`");
    $actRows = $activity->fetchAll(PDO::FETCH_ASSOC);

    $report=$pdo->query( $sql );
    $reportRows = $report->fetchAll(PDO::FETCH_ASSOC);

    // $i = $activity->rowCount();
    // echo $i;
    for($i=0; $i<$activity->rowCount(); $i++){
      for($j=0; $j<$report->rowCount(); $j++)
      if($actRows[$i]["actNo"] == $reportRows[$j]["actNo"]){
        $actRows[$i] = $reportRows[$j];
      }
    }
    // print_r( $actRows );

    echo json_encode( $actRows);
  



}catch(PDOException $e){
    echo $e->getMessage();
  }
?>
