<?php
  header("Content-Type: application/json");
  header("charset: utf-8");
 
  function getUserIpAddr(){
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        //ip from share internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        //ip pass from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
  }

  function generateLink($N, $S, $P, $E, $DT, $DN, $PH,  $SE, $BD, $SECT){
    $now = new DateTime();
    $now->getTimestamp();  
    $hash = hash_pbkdf2("sha512", strval($now->getTimestamp()) . $N . $S . $P . $E . $DT . $DN . $PH . $SE . $BD . $SECT, 'atlasBusSalt', 10, 32);
    return $hash;
  }
  
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require $_SERVER['DOCUMENT_ROOT']."/php/atlasBusConnect.php";
    $connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    mysqli_set_charset($connection, 'utf8mb4');
    
    $data = json_decode(file_get_contents('php://input'), true);
    $NAME       = $data['name'        ];
    $SURNAME    = $data['surname'     ];   
    $PATRONYMIC = $data['patronymic'  ];  
    $EMAIL      = $data['email'       ];    
    $DOCTYPE    = $data['docType'     ];
    $DOCNUMBER  = $data['docNumber'   ];
    $PHONENUMBER= $data['phoneNumber' ];
    $SEX        = $data['sex'         ];
    $BIRTHDATE  = $data['birthDate'   ];
    $SECTION    = $data['section'     ];

    $USER_ALREADY_EXISTS=False;
    $TEXT_REQUEST= "SELECT ID FROM ATLASBUS WHERE NAME='".$NAME."' AND SURNAME='".$SURNAME. "' AND PATRONYMIC='".$PATRONYMIC."'";
    $result = mysqli_query($connection, $TEXT_REQUEST);
    if ($result==True){  
      if (mysqli_num_rows($result) > 0) {
        $USER_ALREADY_EXISTS=True;
      }
    }

    if ($USER_ALREADY_EXISTS==False){
      $BROWSER  = $_SERVER['HTTP_USER_AGENT'];
      $USER_IP  = getUserIpAddr();
      $IP       = ip2long($USER_IP);

      $name_matches       = preg_match('/[A-Zа-яА-ЯЁё]{2,}/i', $NAME);
      $surname_matches    = preg_match('/[A-Zа-яА-ЯЁё]{2,}/i', $SURNAME);
      $patronymic_matches = preg_match('/[A-Zа-яА-ЯЁё]{2,}/i', $PATRONYMIC);
      $email_matches      = preg_match('/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i', $EMAIL);
      if ($DOCTYPE!==''&&$DOCNUMBER!==''){
        if ($DOCTYPE == 'Паспорт РФ'){
          $DOCTYPE = 'PASSP_RU';
          $docNumber_matches = preg_match('/[A-Z0-9А-Я]{2,}?[ ]?[A-Z0-9А-Я]{2,}?[ ]?[A-Z0-9А-Я]{6,}/i', $DOCNUMBER);
        }
        if ($DOCTYPE == 'Паспорт РБ'){
          $DOCTYPE = 'PASSP_BY';
          $docNumber_matches = preg_match('/[A-ZА-Я]{2,}?[0-9]{7,}/i', $DOCNUMBER);
        }
        if ($DOCTYPE == 'Свидетельство о рождении РФ'){
          $DOCTYPE = 'CERT_OB_RU';
          $docNumber_matches = preg_match('/[A-ZА-Я]{1,}?[-]?[A-ZА-Я]{2,}?[№]?[0-9]{6,}/i', $DOCNUMBER);
        }
        if ($DOCTYPE == 'Свидетельство о рождении РБ'){
          $DOCTYPE = 'CERT_OB_BY';
          $docNumber_matches = preg_match('/[A-ZА-Я]{1,}?[-]?[A-ZА-Я]{2,}?[№]?[0-9]{7,}/i', $DOCNUMBER);
        }
      }
      else{
        $DOCTYPE = 'PASSP_RU';
        $docNumber_matches = True;
      }

      $BIRTHDATE = date("Y-m-d H:i:s", strtotime($BIRTHDATE));
      if($SEX=='М') $SEX='MALE';
      else $SEX='FEMALE';
      if($SECTION=='А') $SECTION='A';
      if($SECTION=='Б') $SECTION='B';
      if($SECTION=='В') $SECTION='C';

      if ($PHONENUMBER!=='')
        $phoneNumber_matches = preg_match('/\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d[- .]?\d\d/', $PHONENUMBER);
      else{
        $phoneNumber_matches = True;
      }

      if($name_matches&&$surname_matches&&$patronymic_matches&&$email_matches&&$docNumber_matches&&$phoneNumber_matches){
        $stmt = $connection->prepare("INSERT INTO ATLASBUS (INSERTED, NAME, SURNAME, PATRONYMIC, EMAIL, DOCTYPE, DOCNUMBER, PHONENUMBER, SEX, BIRTHDATE, SECTION, BROWSER, IPV4, LINK) VALUES(NOW(), ?, ?, ?, ?, ?, ?, ?, ?, DATE(?), ?, ?, ?, ?)") or die(mysql_error());
        $LINK = generateLink($NAME, $SURNAME, $PATRONYMIC, $EMAIL, $DOCTYPE, $DOCNUMBER, $PHONENUMBER,  $SEX, $BIRTHDATE, $SECTION);
        $stmt->bind_param("sssssssssssis", $NAME, $SURNAME, $PATRONYMIC, $EMAIL, $DOCTYPE, $DOCNUMBER, $PHONENUMBER,  $SEX, $BIRTHDATE, $SECTION, $BROWSER, $IP, $LINK);
        $stmt->execute();
        echo json_encode(array('Status' => 'OK', 'Link' => 'http://94.140.216.17:8889/php/atlasBusSelect.php?LINK=' . $LINK));   
      }
      else{
        http_response_code(403);
        echo json_encode(array('Status' => 'NG', 'Message' => 'Проверьте введенные данные!')); 
      }
    }
    else{
      http_response_code(403);
      echo json_encode(array('Status' => 'NG', 'Message' => 'Пользователь уже существует!')); 
    }
  }
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, access-control-allow-origin");
  }
?>