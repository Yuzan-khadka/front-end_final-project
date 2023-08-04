
<!DOCTYPE html>
<html>
<head>
    <title>User Registration</title>
</head>
<body>
    <h1>User Registration</h1>
    <?php
    if (isset($_GET["message"])) {
        echo "<p style='color: green;'>" . $_GET["message"] . "</p>";
    } elseif (isset($_GET["error"])) {
        echo "<p style='color: red;'>" . $_GET["error"] . "</p>";
    }
    ?>
    <form action="/front-end_final-project/php/userRegistration.php" method="post">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div>
            <label for="full_name">Full Name:</label>
            <input type="text" id="full_name" name="full_name" required>
        </div>
        <div>
            <label for="phone_number">Phone Number:</label>
            <input type="tel" id="phone_number" name="phone_number" required>
        </div>
        <div>
            <label for="address">Address:</label>
            <textarea id="address" name="address" required></textarea>
        </div>
        <div>
            <button type="submit">Register</button>
        </div>
    </form>
</body>
</html>