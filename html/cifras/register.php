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

function isImageTypeAllowed($file) {
    $allowedFormats = ["jpg", "jpeg", "png", "gif", "heif"];
    $imageFileType = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    return in_array($imageFileType, $allowedFormats);
}

// Handle form data
$itemName = $_POST['itemName'];
$itemImages = $_FILES['itemImages'];
$itemTono = $_POST['itemTono'];

// Loop through each image
for ($i = 0; $i < count($itemImages['name']); $i++) {
    $currentImage = array(
        'name' => $itemImages['name'][$i],
        'type' => $itemImages['type'][$i],
        'tmp_name' => $itemImages['tmp_name'][$i],
        'error' => $itemImages['error'][$i],
        'size' => $itemImages['size'][$i]
    );

    // Check if image type is allowed
    if (!isImageTypeAllowed($currentImage)) {
        echo json_encode(array("status" => "error", "message" => "Sorry, only JPG, JPEG, PNG, GIF & HEIF files are allowed."));
        exit;
    }

    // Check if image size is within the allowed limit
    if (!isImageSizeAllowed($currentImage)) {
        echo json_encode(array("status" => "error", "message" => "Sorry, your file is too large."));
        exit;
    }

    // Continue with the rest of the processing for this image...
}

// Handle image upload
$lastsql = "SELECT id from musicas ORDER BY id DESC LIMIT 1;";
$lastresult = $conn->query($lastsql);
$row = mysqli_fetch_row($lastresult);

$summed = $row[0] + 1;
$target_dir = "../../img/cifras/";
$uploadOk = 1;

// Loop through each image
for ($i = 0; $i < count($itemImages['name']); $i++) {
    $currentImage = array(
        'name' => $itemImages['name'][$i],
        'type' => $itemImages['type'][$i],
        'tmp_name' => $itemImages['tmp_name'][$i],
        'error' => $itemImages['error'][$i],
        'size' => $itemImages['size'][$i]
    );

    $target_file = $target_dir . basename($currentImage['name']);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $filenameR = "img" . $summed . "-" . $i . "." . $imageFileType;
    $targetFile = $target_dir . $filenameR;

    // Check if file already exists
    if (file_exists($target_file)) {
        echo json_encode(array("status" => "error", "message" => "Sorry, file already exists."));
        exit;
    }

    // Check if image file is a valid image
    $check = getimagesize($currentImage['tmp_name']);
    if ($check === false) {
        echo json_encode(array("status" => "error", "message" => "File is not an image."));
        exit;
    }

    // Check file size
    if ($currentImage['size'] > 500000) {
        echo json_encode(array("status" => "error", "message" => "Sorry, your file is too large."));
        exit;
    }

    // Allow certain file formats
    $allowedFormats = array("jpg", "jpeg", "png", "gif", "heif");
    if (!in_array($imageFileType, $allowedFormats)) {
        echo json_encode(array("status" => "error", "message" => "Sorry, only JPG, JPEG, PNG, GIF & HEIF files are allowed."));
        exit;
    }

    if (move_uploaded_file($currentImage['tmp_name'], $targetFile)) {
        // File uploaded successfully
        $response = array("status" => "success", "message" => "The file " . basename($currentImage['name']) . " has been uploaded.");
    } else {
        // Error uploading file
        $response = array("status" => "error", "message" => "Sorry, there was an error uploading your file.");
        exit;
    }

    // Insert data into the database
    $sql = "INSERT INTO musicas (nome, path, tom) VALUES ('$itemName', '$filenameR', '$itemTono')";

    if ($conn->query($sql) !== TRUE) {
        $response = array("status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error);
        exit;
    }
}

// Close the connection
$conn->close();

// Send JSON response to the client
header('Content-Type: application/json');
echo json_encode($response);
?>