<?php
$servername = "localhost";
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$dbname = "mycampusrating";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from POST request
$location = $_POST['location'];
$rating = (int)$_POST['rating'];

// Insert rating into database
$sql = "INSERT INTO ratings (location, rating) VALUES ('$location', '$rating')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
