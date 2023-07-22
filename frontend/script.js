const chatBoxWrapper = document.getElementById('chatbox')
const chatBoxTextField = document.getElementById('chatbox-message-field')

chatBoxWrapper.classList.add('show');
const chatBoxTextFieldHeight = chatBoxTextField.clientHeight
chatBoxTextField.addEventListener('keyup', e=>{
    var maxHeight = getComputedStyle(chatBoxTextField).getPropertyValue('--chatbox-max-height')
    chatBoxTextField.removeAttribute('style')
    setTimeout(()=>{
        if(chatBoxTextField.scrollHeight > maxHeight){
            chatBoxTextField.style.height = `${maxHeight}px`
        }else{
            chatBoxTextField.style.height = `${chatBoxTextField.scrollHeight}px`
        }
    },0)
})
const chatBoxSendBtn = document.getElementById('chatbox-send-btn');

function sendMessage() {
    const message = chatBoxTextField.value.trim();
    if (message !== "") {
        const chatBoxBody = document.querySelector('#chatbox .chatbox-body');
        const newMessage = document.createElement('div');
        newMessage.classList.add('chatbox-item');
        newMessage.innerHTML = `<div class="chatbox-user-avatar"><span>U</span></div><div class="chatbox-item-content-wrapper"><div class="chatbox-item-content">${message}</div></div>`;
        chatBoxBody.prepend(newMessage);
        chatBoxTextField.value = "";
        
        // Add a loading icon
        const loading = document.createElement('div');
        loading.classList.add('chatbox-item', 'chatbox-msg-receiver', 'loading-icon');
        loading.innerHTML = `<div class="chatbox-user-avatar"><span>B</span></div><div class="chatbox-item-content-wrapper"><div class="chatbox-item-content">Loading...</div></div>`;
        chatBoxBody.prepend(loading);
        
        // After a delay, remove the loading icon and send a static response
        setTimeout(function() {
            chatBoxBody.removeChild(loading);
            const response = document.createElement('div');
            response.classList.add('chatbox-item', 'chatbox-msg-receiver');
            response.innerHTML = `<div class="chatbox-user-avatar"><span>B</span></div><div class="chatbox-item-content-wrapper"><div class="chatbox-item-content">Sure, got your message. Thank you.</div></div>`;
            chatBoxBody.prepend(response);
        }, 2000);
    }
}

chatBoxSendBtn.addEventListener('click', sendMessage);
chatBoxTextField.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});
