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
$itemImage = $_FILES['itemImage'];
$itemTono = $_POST['itemTono'];

$lastsql = "SELECT id from musicas ORDER BY id DESC LIMIT 1;";
$lastresult = $conn->query($lastsql);
$row = mysqli_fetch_row($lastresult);

// Handle image upload
$summed = $row[0] + 1;
$target_dir = "../../img/cifras/"; // Create an "uploads" folder in your project
$target_file = $target_dir . basename($itemImage['name']);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
$filenameR = "img" . $summed . "-" . "0." . $imageFileType;
$targetFile = $target_dir . $filenameR . ".jpeg"; // Unique file name
$uploadOk = 1;

// Check if image file is a actual image or fake image
$check = getimagesize($itemImage['tmp_name']);
if ($check === false) {
    echo "File is not an image.";
    $uploadOk = 0;
}

// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}

// Check file size
if ($itemImage['size'] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
$allowedFormats = array("jpg", "jpeg", "png", "gif");
if (!in_array($imageFileType, $allowedFormats)) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    $response = array("status" => "error", "message" => "Sorry, your file was not uploaded.");
} else {
    if (move_uploaded_file($itemImage['tmp_name'], $targetFile)) {
        // File uploaded successfully
        $response = array("status" => "success", "message" => "The file " . basename($itemImage['name']) . " has been uploaded.");
    } else {
        // Error uploading file
        $response = array("status" => "error", "message" => "Sorry, there was an error uploading your file.");
    }
}

// Insert data into the database
$sql = "INSERT INTO musicas (nome, path, tom) VALUES ('$itemName', '$filenameR', '$itemTono')";

if ($conn->query($sql) === TRUE) {
    $response = array("status" => "successo", "message" => "Item registered successfully");
} else {
    $response = array("status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error);
}

// Close the connection
$conn->close();

// Send JSON response to the client
header('Content-Type: application/json');
echo json_encode($response);
?>