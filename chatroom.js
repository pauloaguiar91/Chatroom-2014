(function() {

    function ChatRoom() {
        var nickname;

        function loadRecentHistory() {

        }

        function loadUsers() {
            $.getJSON("server/ChatController.php", {}, function(e) {
                //e.returnvalues
            });

            $('#chatOnlineUsersList').append('<li>'+nickname+'</li>');
        }

        function startChat() {
            loadUsers();
            loadRecentHistory();
        }

        function sendButtonClickHandler() {
            var $textArea = $('#bottomContainer').find('textarea');

            $('#chatMainArea').append('<p>'+nickname+": "+$textArea.val());
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
            })
        }

        function setupEvents() {
            $('#bottomContainer').find('button').on('click', sendButtonClickHandler);
            $('#chatSettingsIcon').on('click', settingsIconClickHandler);
            $('#chatHelpIcon').on('click', helpIconClickHandler);
            $('#chatLoginButton').on('click', loginButtonClickHandler);
        }


        this.init = function() {
            setupEvents();
        }
    }

    var CR = new ChatRoom();
    CR.init();
})();