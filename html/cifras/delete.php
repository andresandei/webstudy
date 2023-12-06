<?php
    // delete.php

    $servername = "127.0.0.1:3306";
    $username = "u242803527_sandei";
    $password = "@Cifras123";
    $dbname = "u242803527_cifras";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Handle incoming JSON data
    $data = json_decode(file_get_contents("php://input"), true);

    $itemId = $data['id'];
    $imagePath = $data['path'];

    // Delete the image file from the server
    unlink("../../img/cifras/" . $imagePath);

    // Delete the item from the database
    $sql = "DELETE FROM musicas WHERE id = $itemId";

    if ($conn->query($sql) === TRUE) {
        $response = array("status" => "success", "message" => "Item deleted successfully");
    } else {
        $response = array("status" => "error", "message" => "Error deleting item: " . $conn->error);
    }

    // Close the connection
    $conn->close();

    // Send JSON response to the client
    header('Content-Type: application/json');
    echo json_encode($response);
?>