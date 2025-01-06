const socket = io();
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
socket.on('chat message', function(msg) {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messageElement.classList.add('message');
    document.getElementById('messages').appendChild(messageElement);
    scrollToBottom();
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    socket.emit('chat message', message);
    
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', 'self');
    document.getElementById('messages').appendChild(messageElement);
    
    messageInput.value = '';
    messageInput.focus();
    scrollToBottom();
}

function scrollToBottom() {
    const messages = document.getElementById('messages');
    messages.scrollTop = messages.scrollHeight;
}
