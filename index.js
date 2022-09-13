'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const users = [];
const rooms = [];

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  let currentRoom = 'default';
  socket.join(currentRoom);
  socket.on('setUserName', (username) => {
    users.push({username: username, id: socket.id});
    console.log('users connected:', users);
    socket.emit('response', 'Joined with username ' + username);
  });

  socket.on('join room', (newRoom) => {
    socket.leave(currentRoom);
    socket.join(newRoom);
    currentRoom = newRoom;
    socket.emit('room change', {
        sender: '*Server*',
        content: 'You moved to room ' + newRoom
    });
    
    console.log('A user joined room '+ newRoom);

  });

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
    // TODO: remove user with socket.id form users array
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === socket.id) {
            users.splice(i, 1);
            break;
        }
    }
    console.log('users connected:', users);
  });



  socket.on('chat message', (msg) => {
      let username = 'Anon';
      users.forEach(item => {
        if (socket.id === item.id) {
            username = item.username;
        }
      });
    socket.to(currentRoom).emit('chat message', {
        room: currentRoom,
        sender: username,
        content: msg
    });
    socket.emit('chat message', {
        room: currentRoom,
        sender: username,
        content: msg
    })
    console.log(socket.id + ': ' + msg + ' ' + currentRoom);
  });
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});

