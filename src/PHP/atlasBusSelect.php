<?php
  header("Content-Type: application/json");
  header("charset: utf-8");
  require $_SERVER['DOCUMENT_ROOT']."/php/atlasBusConnect.php";
  $connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
  $response = array();

  $LINK = $_GET['LINK'];
  $TEXT_REQUEST="SELECT * FROM ATLASBUS WHERE LINK='".$LINK."'";

  $result = mysqli_query($connection, $TEXT_REQUEST) or die(mysql_error()); 
  if ($result==True){
    if (mysqli_num_rows($result) > 0) {   
      while ($row = mysqli_fetch_assoc($result)) {
        $res_row = array();
        $res_row ["ID"]             = $row["ID"];
        $res_row ["NAME"]           = $row["NAME"];
        $res_row ["SURNAME"]        = $row["SURNAME"];
        $res_row ["PATRONYMIC"]     = $row["PATRONYMIC"];
        $res_row ["DOCNUMBER"]      = $row["DOCNUMBER"];
        array_push($response, $res_row);
      }
      echo json_encode($response);
    }
  }else{
    echo 'no records';
  }
?>