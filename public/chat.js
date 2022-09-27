'use strict';

// localhost for local dev only
const socket = io('http://localhost:3000');
//const socket = io('https://<your-server.xxx>.cloudapp.azure.com');

let chatHidden = true;
const chat = document.getElementById('chat');
const chatButton = document.getElementById('chat-button');
const showChat = () => {
  if (chatHidden) {
    chatButton.innerHTML ='';
    chatHidden = false;
    chat.style.display = 'block';
    chatButton.innerHTML = "Sulje Chat"
  } else {
    chatButton.innerHTML ='';
    chatHidden = true;
    chat.style.display = 'none';
    chatButton.innerHTML = 'Avaa Chat'
  }
}
chatButton.addEventListener("click", (e) => {
  (e).preventDefault();

  showChat();
})
document.querySelector('#msg-input').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  if (inp.value !== '') {
      socket.emit('chat message', inp.value);
  }
  inp.value = '';
});

document.querySelector('#join').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('username');
  socket.emit('setUserName', inp.value);
  inp.value = '';
});

// document.querySelector('#join-room').addEventListener('submit', (event) => {
//     event.preventDefault();
//   const inp = document.getElementById('r');
//   socket.emit('join room', inp.value);
//   inp.value = '';
// });

socket.on('chat message', (msg) => {
    console.log(msg);
    console.log(msg.content);
  const item = document.createElement('li');
  item.innerHTML =msg.sender + ': ' + msg.content ; //+ ' -------- ROOM: ' + msg.room
  const messages = document.getElementById('messages');
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
    
  }
  messages.appendChild(item);
  item.classList.add(

      "w-fit",
      "bg-gm-blood-red",
      "text-white",
      "p-2",
      "rounded",
      "m-2");
  
});

socket.on('response', (msg) => {
  console.log(msg);
});