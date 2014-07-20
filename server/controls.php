<?php
//Functional programming style for simple ajax
include_once 'ChatController.php';
$return = array();
$user = $_POST['user'];
$controller = new ChatController();

switch($_POST['action']) {
    case 'login':
        $onlineUsers = $controller->login($user);
        $return['users'] = $onlineUsers;
        break;

    case 'logout':
        $controller->logout($user);

    default:
        break;
}

$return['action'] = $_POST['action'];

echo json_encode($return);