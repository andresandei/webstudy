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
$itemImage = $_POST['itemImage'];
$itemTono = $_POST['itemTono'];

$lastsql = "SELECT id from musicas ORDER BY id DESC LIMIT 1;";
$lastresult = $conn->query($lastsql);
$row=mysqli_fetch_row($lastresult);


// Handle image upload
$summed = $row[0]+1;
$target_dir = "../../img/cifras/"; // Create an "uploads" folder in your project
$target_file = $target_dir . basename($_FILES[$itemImage][$filenameR]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$filenameR = "img". $summed . "-" . "0" . $imageFileType;
$targetFile = $target_dir . $filenameR . ".jpeg"; // Unique file name



// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES[$itemImage][$filenameR]);
  if($check !== false) {
    echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
  echo "Sorry, file already exists.";
  $uploadOk = 0;
}

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
  echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES[$itemImage][$filenameR], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}

//move_uploaded_file($_FILES["itemImage"]["tmp_name"], $targetFile);

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