<?php
// register.php

// Assuming you have a MySQL database
$servername = "127.0.0.1:3306";
$username = "u242803527_sandei";
$password = "@Cifras123";
$dbname = "u242803527_cifras";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form data
$itemName = $_POST['itemName'];
$itemTono = $_POST['itemTono'];

$lastsql = "SELECT id from musicas ORDER BY id DESC LIMIT 1;";
$lastresult = $conn->query($lastsql);
$row=mysqli_fetch_row($lastresult);


// Handle image upload
$summed = $row[0]+1;
$filenameR = "img". $summed . "-" . "0";
$targetDir = "../../img/cifras/"; // Create an "uploads" folder in your project
$targetFile = $targetDir . $filenameR . ".jpeg"; // Unique file name

move_uploaded_file($_FILES["itemImage"][$filename], $targetFile);

// Insert data into the database
$sql = "INSERT INTO musicas (nome, path, tom) VALUES ('$filename', '$targetFile', '$itemTono')";

if ($conn->query($sql) === TRUE) {
    $response = array("status" => "success", "message" => "Item registered successfully");
} else {
    $response = array("status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error);
}

// Close the connection
$conn->close();

// Send JSON response to the client
header('Content-Type: application/json');
echo json_encode($response);
?>