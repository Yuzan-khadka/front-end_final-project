<?php
// Function to establish a database connection
function connectToDatabase()
{
    $host = "localhost";
    $username = "root"; 
    $password = ""; 
    $dbname = "front_end_db";

    // Create a new mysqli object to connect to the database
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check the connection and display an error message if it fails
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Return the database connection object
    return $conn;
}

// Call the connectToDatabase() function to establish the database connection
$conn = connectToDatabase();
?>
