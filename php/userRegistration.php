<?php
// Include the db_con.php file to get the database connection
require 'db_con.php';

// Function to sanitize and validate input data
function sanitizeInput($input)
{
    return htmlspecialchars(trim($input));
}

// Function to check if a username already exists in the database
function isUsernameExists($conn, $username)
{
    $sql = "SELECT COUNT(*) as count FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['count'] > 0;
}

// Function to register a new user
function registerUser($conn, $username, $email, $password, $full_name, $phone_number, $address)
{
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    echo($username );

    $sql = "INSERT INTO users (username, email, password, full_name, phone_number, address) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $username, $email, $hashedPassword, $full_name, $phone_number, $address);

    if ($stmt->execute()) {
        echo "User registration successful!";
        return true;
    } else {
        echo "User registration failed: " . $stmt->error;
        return false;
    }
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "hello there!!";
    // Sanitize and validate form inputs
    $username = sanitizeInput($_POST["username"]);
    $email = sanitizeInput($_POST["email"]);
    $password = $_POST["password"]; // Password should not be sanitized
    $full_name = sanitizeInput($_POST["full_name"]);
    $phone_number = sanitizeInput($_POST["phone_number"]);
    $address = sanitizeInput($_POST["address"]);

    // Validate username (check if it's not empty and doesn't already exist)
    if (empty($username)) {
        $error = "Username is required.";
        echo( $error );
    } elseif (isUsernameExists($conn, $username)) {
        $error = "Username already exists. Please choose a different username.";
        echo( $error );
    }

    // Validate email (check if it's not empty and has a valid format)
    elseif (empty($email)) {
        $error = "Email is required.";
        echo( $error );
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
        echo( $error );
    }

    // Validate password (check if it's not empty and meets the criteria)
    elseif (empty($password)) {
        $error = "Password is required.";
        echo( $error );
    } elseif (strlen($password) < 8) {
        $error = "Password must be at least 8 characters long.";
        echo( $error );
    }
    // If no errors, proceed with registration
    else {
        if (registerUser($conn, $username, $email, $password, $full_name, $phone_number, $address)) {
            $message = "Registration successful!";
            
        } 
    }
    if($error){
        // Redirect back to the registration page with error message
        header("Location: /front-end_final-project/html/registration.php?error=" . urlencode($error));
        exit(); 
    }else{
        // Redirect back to the registration page with success message
        header("Location: /front-end_final-project/html/registration.php?message=" . urlencode($message));
        exit(); // Make sure to exit after redirecting
    }

}

// Close the database connection
$conn->close();
?>
