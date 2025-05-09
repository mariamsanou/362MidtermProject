<?php


$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$location_id = $_POST['location_id'];
$name = $_POST['name'];
$comment = $_POST['comment'];
$rating = (int)$_POST['rating'];

$sql = "INSERT INTO ratings (location_id, name, comment, rating) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $location_id, $name, $comment, $rating);

if ($stmt->execute()) {
  echo "Rating successfully submitted.";
} else {
  echo "Error: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
