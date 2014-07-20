<?php

include_once 'dbc.php';

class ChatController {

    function __construct() {
    }

    public function login($username) {
        try {
            $DB = new DBC();
            $DB->insertIntoActiveUsers($username);
            $onlineUsers =  $DB->getOnlineUsers();
        } catch(Exception $e) {
            return $e;
        }
            return $onlineUsers;
       }

    public function logout($username) {
        try {
            $DB = new DBC();
            $DB->removeFromActiveUsers($username);
        } catch(Exception $e) {
           return $e;
        }

    }
}