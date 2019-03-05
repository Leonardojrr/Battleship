const socket = io();

function $(id) {
    return document.getElementById(id);
}
let user;
let listUsername = [];

const message = function() {
    let message = $('message'),
        username = $('username'),
        btnEnter = $('enter'),
        output = $('output'),
        typing = $('typing'),
        listUser = $('listUser');
        chatWindows = $('chat-window');

    function sentMessage() {
        socket.emit('chat message', {
            message: message.value,
            username: user
        });
        message.value="";
        chatWindows.scrollTop = chatWindows.scrollHeight;
    }

    function sentTyping(event) {
        socket.emit('chat typing', user);
        if (event.keyCode === 13){
            sentMessage();
        }
    }

    function getMessage(data) {
        typing.innerHTML = '';
        let p = document.createElement('p');
        let strong = document.createElement('strong');
        strong.innerHTML = data.username;
        p.appendChild(strong);
        p.innerHTML += ": " + data.message;
        output.appendChild(p);
        chatWindows.scrollTop = chatWindows.scrollHeight;
    }

    function getTyping(data) {
        let p = document.createElement('p');
        let em = document.createElement('em');
        em.innerHTML = data + " is typing...";
        p.appendChild(em);
        console.log(p);
        typing.innerHTML = p.innerHTML;
    }

    function setUsername(){
        user = username.value;
        socket.emit('register user',user);
        $('intro').hidden = true;
        $('all').hidden = false;
    }

    function getListUser(data){
        listUsername = data;
        listUser.innerText = "";
        listUsername.forEach(element => {
            listUser.innerText += "-"+element.username+"\n";
        });
    }

    function notName(data){
        user = data;
    }

    btnEnter.addEventListener('click',setUsername,false);
    message.addEventListener('keypress', sentTyping, false);
    socket.on('chat message', getMessage);
    socket.on('chat typing', getTyping);
    socket.on('new user',getListUser);
    socket.on('not name',notName);
}

window.onunload = ()=>{
    if(user!=null)
        socket.emit('disconnected');
}

message();