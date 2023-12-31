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
$itemImages = $_FILES['itemImages'];
$itemTono = $_POST['itemTono'];

// Handle image upload
$lastsql = "SELECT id from musicas ORDER BY id DESC LIMIT 1;";
$lastresult = $conn->query($lastsql);

// Check if the query was successful and if there are rows in the result set
if ($lastresult && $lastresult->num_rows > 0) {
    $row = mysqli_fetch_row($lastresult);

    // Handle image upload using the fetched value
    $summed = $row[0] + 1;
} else {
    // Handle the case when there are no rows in the result set
    $summed = 1; // Set a default value or take another appropriate action
}

$target_dir = "../../img/cifras/";
$uploadOk = 1;
$imagePaths = array(); // Array to store image paths

// Function to check if the image type is allowed
function isImageTypeAllowed($file) {
    $allowedFormats = ["jpg", "jpeg", "png", "gif", "heif"];
    $imageFileType = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    return in_array($imageFileType, $allowedFormats);
}

// Function to check if the image size is allowed
function isImageSizeAllowed($file) {
    // Adjust the maximum allowed size (in bytes) as needed
    $maxSize = 500000; // 500 KB
    return $file && $file['size'] <= $maxSize;
}

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

    $target_file = $target_dir . basename($currentImage['name']);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $filenameR = "img" . $summed . "-" . $i . "." . $imageFileType;
    $targetFile = $target_dir . $filenameR;

    // Check if file already exists
    if (file_exists($target_file)) {
        echo json_encode(array("status" => "error", "message" => "Sorry, file already exists."));
        exit;
    }

    if (move_uploaded_file($currentImage['tmp_name'], $targetFile)) {
        // File uploaded successfully
        $imagePaths[] = $filenameR; // Store the path in the array
    } else {
        // Error uploading file
        echo json_encode(array("status" => "error", "message" => "Sorry, there was an error uploading your file."));
        exit;
    }
}

// Concatenate the image paths with "*"
$imagePathsString = implode("*", $imagePaths);

// Insert data into the database
$sql = "INSERT INTO musicas (nome, path, tom) VALUES ('$itemName', '$imagePathsString', '$itemTono')";

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