<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $userName = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
        $userEmail = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

        if ($userName && $userEmail && filter_var($userEmail, FILTER_VALIDATE_EMAIL) && $message) {
            $messageSubject = "Message";
            $to = "admin@andyb.tech";
            $body = "";

            $body .= "From: ".$userName."\r\n";
            $body .= "Email: ".$userEmail."\r\n";
            $body .= "Message: ".$message."\r\n";

            mail($to, $messageSubject, $body);
        }
    }
?>