<?php 
 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\Exception;

 require 'PHPMailer/src/Exception.php';
 require 'PHPMailer/src/PHPMailer.php';

 $mail = new PHPMailer(true);
 $mail ->CharSet = 'UTF-8';
 $mail -> setLanguage('en' ,'PHPMailer/language/');
 $mail -> IsHTML(true);
 
// от кого письмо
$mail -> setFrom('bogdantrach.228@gmail.com' , ' Bogdan');
// komu письмо
$mail -> addAdress("trachbogdan228@gmail.com");
// body письмa
$mail ->Subject = 'Hello, this is test';


// body письмa
$body = '<h1>This is test letter</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Name:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Email:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['age']))){
    $body.='<p><strong>Age:</strong>'.$_POST['age'].'</p>';
}


//FILE ATTACHING
if(!empty($_FILES['image']['tmp_name'])){
    $filePath = 'direction on host'.$_FILES['image']['tmp_name'];
    if(copy($_FILES['image']['tmp_name'],$filePath)){
        $fileAttach = $filePach;
        $filePath.='<p><strong>Photo in app:</strong></p>';
        $mail->addAttachment($fileAttach);
  }
}

$mail ->Body = $body;

//Sending
if(!$mail -> send()){
    $message  = 'Error';
}else{
    $message = 'Succes';
}
$response = ["message" => $message]
?>
 



