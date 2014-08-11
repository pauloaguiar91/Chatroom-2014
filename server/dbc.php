<?php

require_once('dbc_params.php');

class DBC {

    function __construct() {
    }

    public function insertIntoActiveUsers($username) {
        try {
            $timestamp = strtotime("now");
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("INSERT INTO users(username, timestamp) VALUES (:username, :timestamp)");
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':timestamp', $timestamp);
            $stmt->execute();

            $this->sendMainChat('SERVER', $username . ' has come online.');

        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function getOnlineUsers() {
        try {
            $onlineUsers = array();
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("SELECT * FROM users");
            $stmt->execute();
            $dataPull = $stmt->fetchAll();

            for($i = 0; $i < count($dataPull); $i++) {
                $onlineUsers[$i] = $dataPull[$i]['username'];

                //check if timestamp is older than 30 seconds, if so. removeActiveUser with that name;$currentTime
                $tenSecondTimestamp = strtotime("-10 seconds");

                if($dataPull[$i]['timestamp'] < $tenSecondTimestamp) {
                    $this->removeFromActiveUsers($onlineUsers[$i]);
                    array_splice($onlineUsers, $i);
                }
            }

            return $onlineUsers;

        } catch(Exception $e) {
            return $e;
        }
    }

    public function updateTimestamp($username) {
        $date = strtotime("now");

        try {
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("UPDATE users SET timestamp = :timestamp WHERE username = :username");
            $stmt->bindParam(':timestamp', $date);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $values['name'] = $username;
            $values['stamp'] = $date;

            return $values;

        } catch(PDOException $e) {
            return $e;
        }
    }

    public function removeFromActiveUsers($username) {
        if(!$username) {
            return;
        }
        try {
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("DELETE FROM users WHERE username = :username");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            $this->sendMainChat('SERVER:', $username . ' has logged out.');

        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function getChatHistory() {
        try {
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("SELECT * FROM history ORDER BY timestamp DESC LIMIT 50");
            $stmt->execute();
            $messageHistory = $stmt->fetchAll();

            return $messageHistory;

        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }

    public function sendMainChat($user, $message) {
        try {
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("INSERT INTO history(username, message) VALUES(:username, :message)");
            $stmt->bindParam(':username', $user);
            $stmt->bindParam(':message', $message);
            $stmt->execute();

        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }
}