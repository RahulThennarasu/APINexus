<?php
    $api_name = $_POST['api_name'];
    $short_description = $_POST['short_description'];
    $doc_url = $_POST['doc_url'];
    $logo_url = $_POST['logo_url'];

    //Database connection
    $conn = new mysqli('localhost', 'root','', 'test');
    if ($conn->connect_error){
        die('Connection failed : ' .$conn->connect_error);
    } else {
        $stmt = $conn->prepare("insert into api(api_name, short_description, doc_url, logo_url)
            values(?, ?, ?, ?)")
        $stmt->bind_param("ssss", $api_name, $short_description, $doc_url, $logo_url);
        $stmt->execute();
        echo "api successful";
        $stmt->close();
        $conn->close();
    }
?>