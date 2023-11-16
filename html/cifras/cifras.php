<?php

    $servername = "151.106.97.204";
    $username = "u242803527_sandei";
    $password = "@Cifras123";
    $dbname = "u242803527_cifras";

    $conn = new mysqli_connect($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT id, nome, path FROM musicas";
    $result = $conn->query($sql);

    $data = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    $conn->close();

    echo json_encode($data);
?>