import React from 'react';
import './Chat.css'; // Імпортуємо стилі

// Видалено всі класи Tailwind
function Chat({
  userId,
  roomId,
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  inviteUser,
  setInviteUser,
  inviteUserToRoom,
  joinRoomId,
  setJoinRoomId,
  joinRoom
}) {
  
  React.useEffect(() => {
    const messagesContainer = document.getElementById('messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-area">
      
      {/* User ID та Room ID */}
      <div className="chat-header">
        <div>
          <span className="font-bold">Your Matrix ID:</span>
          <span className="ml-1">{userId ? userId : 'Loading...'}</span>
        </div>
        <div className="text-right">
          <span className="font-bold">Room ID: </span>
          <span className="room-id">{roomId || 'Not selected'}</span>
        </div>
      </div>

      {/* Список повідомлень */}
      <div id="messages">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map(msg => (
            <div className="message-item" key={msg.id}>
              <strong 
                className={`message-sender ${msg.sender === userId ? 'you' : ''}`}
              >
                {msg.sender === userId ? 'You' : msg.sender.split(':')[0].substring(1)}:
              </strong>
              <span className="message-body">{msg.body}</span>
            </div>
          ))
        )}
      </div>

      {/* Поле для введення повідомлення */}
      <div className="message-input-area">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          className="message-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>
          Send
        </button>
      </div>

      {/* Запрошення та приєднання */}
      <div className="invite-join-area">
        <div>
          <input
            value={inviteUser}
            onChange={(e) => setInviteUser(e.target.value)}
            placeholder="Invite user (e.g., @user:matrix.org)"
          />
          <button
            onClick={inviteUserToRoom}
            className="invite-button"
          >
            Invite
          </button>
        </div>
        <div>
          <input
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            placeholder="Room ID to join (e.g., !roomId:matrix.org)"
          />
          <button
            onClick={joinRoom}
            className="join-button"
          >
            Join Room
          </button>
        </div>
      </div>

    </div>
  );
}

export default Chat;