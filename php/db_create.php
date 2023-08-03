<?php 

$host = "localhost";
$username = "root"; 
$password = ""; 

// Create a new mysqli object to connect to the database
$conn = new mysqli($host, $username, $password);

// Check the connection and display an error message if it fails
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sqlScript = file_get_contents("db_scripts/script.sql");

if ($conn->multi_query($sqlScript)) {
    echo "SQL file executed successfully";
} else {
    echo "Error executing SQL file: " . $conn->error;
}

// Close the connection
$conn->close();



?>