<?php

include_once 'dbc.php';

private class ChatController {


    public function getOnlineUsers() {
            DB_GET_ACTIVE_USERS();
       }
}