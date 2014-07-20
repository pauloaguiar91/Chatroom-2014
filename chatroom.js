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

        }

        function helpIconClickHandler() {

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
            $.post("server/controls.php", {'action': 'update'}, function(e) {
                var json = $.parseJSON(e),
                    $onlineUsersList = $('#chatOnlineUsersList'),
                    $chatMainArea = $('#chatMainArea');

                $onlineUsersList.find('li').remove();
                $('#chatMainArea').find('p').remove();

                json.update.chatHistory.reverse();

                for(var i=0; i < json.update.onlineUsers.length; i++) {
                    $onlineUsersList.append('<li>'+ json.update.onlineUsers[i] + '</li>');
                }

                for(var m=0; m <= json.update.chatHistory.length-1; m++) {
                    $chatMainArea.append('<p>' + json.update.chatHistory[m].username + ': '+ json.update.chatHistory[m].message + '</p>');
                }

                $chatMainArea.animate({"scrollTop": $chatMainArea[0].scrollHeight}, "slow");
                $('#chatNumUsers').html(json.update.onlineUsers.length);
            });
        }

        function setupEvents() {
            $('#bottomContainer').find('button').on('click', sendButtonClickHandler);
            $('#chatSettingsIcon').on('click', settingsIconClickHandler);
            $('#chatHelpIcon').on('click', helpIconClickHandler);
            $('#chatLoginButton').on('click', loginButtonClickHandler);
            $('#bottomContainer').find('textarea').on('keydown', function(event) { typingAreaEventHandler(event) });

            window.refresh = $.post("server/controls.php", {'action': 'logout', 'user': nickname } );
            window.onbeforeunload = function() { $.post("server/controls.php", {'action': 'logout', 'user': nickname } ); };
        }

        this.init = function() {
            setupEvents();
        }
    }

    var CR = new ChatRoom();
    CR.init();
})();