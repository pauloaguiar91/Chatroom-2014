(function() {

    function ChatRoom() {
        var nickname;

        function loadRecentHistory() {

        }

        function loadUsers() {
            $.post("server/controls.php", {'action': 'login', 'user': nickname }, function(e) {
                var json = $.parseJSON(e);

                for(var i=0; i < json.users.length; i++) {
                    $('#chatOnlineUsersList').append('<li>'+ json.users[i] + '</li>');
                }
            });
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

        function typingAreaEventHandler(event) {
            event.which = event.which || event.keyCode;

            //enter button click
            if(event.which == 13) {
                event.preventDefault();
                $('#bottomContainer').find('button').trigger('click');
            }
        }

        function unloadWindowEventHandler() {
            alert('unloading');
            $.post("server/controls.php", {'action': 'logout', 'user': nickname } );
        }

        function updateChat() {
            //this fucntion will update the proper fields every 3 seconds... optimizations will be done if there is little or no conversation
        }

        function setupEvents() {
            $('#bottomContainer').find('button').on('click', sendButtonClickHandler);
            $('#chatSettingsIcon').on('click', settingsIconClickHandler);
            $('#chatHelpIcon').on('click', helpIconClickHandler);
            $('#chatLoginButton').on('click', loginButtonClickHandler);
            $('#bottomContainer').find('textarea').on('keydown', function(event) { typingAreaEventHandler(event) });

            window.onbeforeunload = unloadWindowEventHandler;
            window.setInterval(updateChat, 3000);
        }

        this.init = function() {
            setupEvents();
        }
    }

    var CR = new ChatRoom();
    CR.init();
})();