<?php

include_once 'dbc.php';

class ChatController {

    function __construct() {
    }

    public function login($username) {
        try {
            $DB = new DBC();
            $DB->insertIntoActiveUsers($username);
        } catch(Exception $e) {
            return $e;
        }
       }

    public function logout($username) {
        try {
            $DB = new DBC();
            $DB->removeFromActiveUsers($username);
        } catch(Exception $e) {
           return $e;
        }
    }

    public function update() {
        $updateInfo = array();
        try {
            $DB = new DBC();
            $updateInfo['onlineUsers'] = $DB->getOnlineUsers();
            $updateInfo['chatHistory'] = $DB->getChatHistory();

            return $updateInfo;
        } catch(Exception $e) {
            return $e;
        }
    }

    public function sendMainChat($user, $message) {
        try {
            $DB = new DBC();
            $DB->sendMainChat($user, $message);
        } catch(Exception $e) {
            return $e;
        }
    }
}