(function() {

    function ChatRoom() {
        var nickname;

        function loadRecentHistory() {

        }

        function login() {
            $.post("server/controls.php", {'action': 'login', 'user': nickname });
        }

        function startChat() {
            login();
            updateChat();
        }

        function sendButtonClickHandler() {
            var $textArea = $('#bottomContainer').find('textarea');

            if($textArea.val().length < 1)
                return;

            $.post("server/controls.php", {'action': 'sendMainChat', 'user': nickname, 'message': $textArea.val() });

            $textArea.val("");
        }

        function settingsIconClickHandler() {
            $('#chatHelpContainer').fadeIn();
        }

        function helpIconClickHandler() {
            $('#chatSettingsContainer').fadeIn();
        }

        function loginButtonClickHandler() {
            $('#chatLoginContainer').fadeOut(function() {
                nickname = $('#chatLoginInput').val();
                $('#chatContainer').fadeIn( startChat );
            });

            window.setInterval(updateChat, 3000);
        }

        function typingAreaEventHandler(event) {
            event.which = event.which || event.keyCode;

            //enter button click
            if(event.which == 13) {
                event.preventDefault();

                $('#bottomContainer').find('button').trigger('click');
            }
        }

        function updateChat() {
            $.post("server/controls.php", {'action': 'update', 'user': nickname }, function(e) {
                var json = $.parseJSON(e),
                    $onlineUsersList = $('#chatOnlineUsersList'),
                    $chatMainArea = $('#chatMainArea');

                if(json.update.onlineUsers instanceof Array) {
                    $onlineUsersList.find('li').remove();

                    for(var i=0; i < json.update.onlineUsers.length; i++) {
                        $onlineUsersList.append('<li>'+ json.update.onlineUsers[i] + '</li>');
                    }

                    $('#chatNumUsers').html(json.update.onlineUsers.length);
                    $('#chatMainArea').find('p').remove();

                    json.update.chatHistory.reverse();
                    for(var m=0; m <= json.update.chatHistory.length-1; m++) {
                        $chatMainArea.append('<p>' + json.update.chatHistory[m].username + ': '+ json.update.chatHistory[m].message + '</p>');
                    }

                    $chatMainArea.animate({"scrollTop": $chatMainArea[0].scrollHeight}, "slow");
                }
            });
        }

        function chatSettingsCloseClickHandler() {
            $('#chatSettingsContainer, #chatHelpContainer').fadeOut();
        }

        function setupEvents() {
            $('#bottomContainer').find('button').on('click', sendButtonClickHandler);
            $('#chatSettingsIcon').on('click', settingsIconClickHandler);
            $('#chatHelpIcon').on('click', helpIconClickHandler);
            $('#chatLoginButton').on('click', loginButtonClickHandler);
            $('.chatSettingsClose').on('click', chatSettingsCloseClickHandler);
            $('#bottomContainer').find('textarea').on('keydown', function(event) { typingAreaEventHandler(event) });
        }

        this.init = function() {
            setupEvents();
        }
    }

    var CR = new ChatRoom();
    CR.init();
})();