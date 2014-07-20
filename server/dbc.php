<?php

require_once('dbc_params.php');

class DBC {

    function __construct() {
    }

    public function insertIntoActiveUsers($username) {
        try {
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("INSERT INTO users(username) VALUES (:username)");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function getOnlineUsers() {
        try {
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("SELECT * FROM users");
            $stmt->execute();

            $onlineUsers = array();

            $dataPull = $stmt->fetchAll();

            for($i=0; $i < count($dataPull); $i++) {
                $onlineUsers[$i] = $dataPull[$i]['username'];
            }

            return $onlineUsers;

        } catch(PDOException $e) {
            return $e->getMessage();
        }
    }

    public function removeFromActiveUsers($username) {
        try {
            $db = new PDO('mysql:host=localhost;port=3306;dbname=paguiarc_dev_chatroom', DB_USERNAME, DB_PASSWORD);
            $stmt = $db->prepare("DELETE FROM users WHERE username = :username");
            $stmt->bindParam(':username', $username);
            $stmt->execute();

        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
}