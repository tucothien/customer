var socket = io();
    function submitfunction(){
      console.log("submit function !!!");
      var from = $('#user').val();
      var message = $('#m').val();
      if(message != '') {
      socket.emit('chatMessage', from, message);
    }
    $('#m').val('').focus();
      return false;
    }

    function notifyTyping() {
      console.log("typing");
      var user = $('#user').val();
      socket.emit('notifyUser', user);
    }

    socket.on('chatMessage', function(from, msg){
      var me = $('#user').val();
      var color = (from == me) ? 'green' : '#009afd';
      var from = (from == me) ? 'Me' : from;
      $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
    });

    socket.on('lastMessage', function(chatList){
      for(var i = 0 ; i<chatList.length; i++){
        var from = chatList[i].user;
        var msg = chatList[i].content;
        var color = '#009afd';
        $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
      }
    });

    socket.on('notifyUser', function(user){
      var me = $('#user').val();
      if(user != me) {
        $('#notifyUser').text(user + ' is typing ...');
      }
      setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
    });

    $(document).ready(function(){
      var name = makeid();
      $('#user').val(name);
      socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
    });

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 5; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }