  var socket = io.connect('http://localhost:8081/');

  socket.on('twitter-stream', function(data){

    console.log(data);
  });

socket.on("connected", function(r){
  socket.emit("start tweets");
});
