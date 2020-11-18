<?php
// Enable CORS policy
header("Access-Control-Allow-Origin: https://www.ukrgasbank.com");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: X-Requested-With");

$name = $email = $tel = $company = $suggestions = '';

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  exit( 'Wrong request' );
}

$name = test_input( $_POST["name"] );
if ( $name == '' ) {
  http_response_code(400);
  header('Content-type: application/json');
  exit(json_encode("Ім'я є обов'язковим полем"));
}

$email = test_input($_POST["email"]);

$tel = test_input($_POST["tel"]);

if ($tel == '') {
  http_response_code(400);
  header('Content-type: application/json');
  exit(json_encode("Номер телефону є обов'язковим полем"));
}

$comment = test_input( $_POST['message'] );

$to = 'cc_deposits@ukrgasbank.com, okliapko@ukrgasbank.com';
$from = "no-reply@ukrgasbank.com";
$subjectText = "Кредити на придбання авто";
$subject = "=?UTF-8?B?".base64_encode($subjectText)."?=";

$headers   = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: Ukrgasbank <$from>";
$headers[] = "X-Mailer: PHP/".phpversion();

$message  = "<html><body>";
$message .= "<table rules=\"all\" style=\"border-color: #666;\" cellpadding=\"10\">";
$message .=    "<tr>";
$message .=       "<td><strong>Ім'я':</strong></td><td>". $name ."</td>";
$message .=    "</tr>";
$message .=    "<tr>";
$message .=       "<td><strong>Email:</strong></td><td>". $email ."</td>";
$message .=    "</tr>";
$message .=    "<tr>";
$message .=       "<td><strong>Телефон:</strong></td><td>". $tel ."</td>";
$message .=    "</tr>";
$message .=    "<tr>";
$message .=       "<td><strong>Коментар:</strong></td><td>". $comment ."</td>";
$message .=    "</tr>";
$message .= "</table";
$message .= "</body></html>";

$retval = mail($to, $subject, $message, implode("\r\n", $headers));

exit;

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);

  return $data;
}
