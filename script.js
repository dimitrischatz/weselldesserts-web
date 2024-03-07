
document.getElementById('chat-send').addEventListener('click', function() {
    var inputField = document.getElementById('chat-input');
    var message = inputField.value;
    sendMessage(message);
    inputField.value = ''; // Clear the input field
});




document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action to avoid form submission
        document.getElementById('chat-send').click(); // Trigger the send button click event
    }
});


function sendMessage(message) {
    var messagesContainer = document.getElementById('chat-messages');
    
    // Add user's message to the chat
    messagesContainer.innerHTML += '<div class="user-message">' + message + '</div>';
    
    // Here you would send the message to your backend
    // For example using fetch:
    
    fetch('https://solon-api.onrender.com/webchat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            //userKey: 'USER_UNIQUE_KEY', // You would need to generate or retrieve this
            //sessionID: 'SESSION_ID', // You would need to manage sessions
            user_input: message
        })
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from your backend
        // For example, display the bot's response:
       // messagesContainer.innerHTML += '<div class="bot-message">' + data.response + '</div>';
       // Use a regular expression to find markdown links and replace them with HTML <a> tags
       
       let formattedResponse = data.response.replace(/\[([^\]]+)\]\((http[^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        messagesContainer.innerHTML += '<div class="bot-message">' + formattedResponse + '</div>';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}

/*
function positionChatArea() {
    const button = document.getElementById('chat-toggle');
    const chatArea = document.getElementById('chatbot-container');

    // Calculate button position relative to the viewport
    const buttonRect = button.getBoundingClientRect();
    const buttonTop = buttonRect.top;
    const buttonHeight = buttonRect.height;

    // Set chat area position above the button with padding to prevent overlap
    chatArea.style.bottom = `calc(100vh - ${buttonTop- 20}px)`;
}

*/

function positionChatArea() {
    const chatArea = document.getElementById('chatbot-container');

    // Check if on a mobile device based on viewport width
    if (window.innerWidth <= 768) {
        // For mobile devices, set the chat area to full screen
        chatArea.style.width = '100%';

        //Adjust height based on the available space
        const viewportHeight = window.innerHeight;
        chatArea.style.height = viewportHeight + 'px';
        chatArea.style.bottom = '0';
        chatArea.style.right = '0';
        chatArea.style.borderRadius = '0'; // Optional: remove border radius for full screen
    } else {
        const button = document.getElementById('chat-toggle');
        const chatArea = document.getElementById('chatbot-container');

        // Calculate button position relative to the viewport
        const buttonRect = button.getBoundingClientRect();
        const buttonTop = buttonRect.top;
        const buttonHeight = buttonRect.height;

        // Set chat area position above the button with padding to prevent overlap
        chatArea.style.bottom = `calc(100vh - ${buttonTop- 20}px)`;
    }
}

// Adjust the height when the page is resized (e.g., when changing orientation)
window.addEventListener('resize', positionChatArea);


document.getElementById('chat-toggle-small').addEventListener('click', function(event) {
    document.getElementById('chat-toggle').click();
});

document.getElementById('chat-toggle').addEventListener('click', function() {
    var container = document.getElementById('chatbot-container');
    var toggleBtn = document.getElementById('chat-toggle');
    
    if (container.classList.contains('chatbot-closed')) {
        // Open the chatbot
        container.classList.remove('chatbot-closed');
        container.classList.add('chatbot-open');
        toggleBtn.classList.remove('chat-toggle-closed');
        toggleBtn.classList.add('chat-toggle-open');
        positionChatArea();
    } else {
        // Close the chatbot
        container.classList.remove('chatbot-open');
        container.classList.add('chatbot-closed');
        toggleBtn.classList.remove('chat-toggle-open');
        toggleBtn.classList.add('chat-toggle-closed');
    }
});




