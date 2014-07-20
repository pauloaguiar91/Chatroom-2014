<?php
//Functional programming style for simple ajax
include_once 'ChatController.php';
$return = array();
$user = $_POST['user'];
$action = $_POST['action'];
$controller = new ChatController();

switch($action) {
    case 'login':
        $onlineUsers = $controller->login($user);
        break;

    case 'logout':
        $controller->logout($user);
        break;

    case 'update':
        $updateInfo = $controller->update();
        $return['update'] = $updateInfo;
        break;

    case 'sendMainChat':
        $message = $_POST['message'];
        $controller->sendMainChat($user, $message);
        break;
    default:
        break;
}

$return['action'] = $action;

echo json_encode($return);