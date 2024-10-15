import React, { useState, useEffect } from 'react';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';

function Chat() {
  const [userData, setUserData] = useState({ username: '', secret: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const UserName = localStorage.getItem('user');
    const secret = UserName + "@123";

    setUserData({
      username: UserName,
      secret: secret
    });

    setLoading(false); // Set loading to false after setting user data
  }, []);

  // Handle creating a new chat or accessing an existing one
  const handleCreateChat = (chatAppState) => {
    getOrCreateChat(
      chatAppState,
      {
        is_direct_chat: true,
        usernames: [userData.username] // Create a direct chat with the current user
      },
      () => console.log('Chat created or retrieved!')
    );
  };

  // Render a loading state while fetching data
  if (loading) {
    return <div>Loading Chat...</div>;
  }

  return (
    <div style={{ height: "50vh", width: "76vw", backgroundColor: "#f0f0f0" }}>
      <ChatEngine
        projectID="aa671825-d010-47c0-94f8-5311db3035fd"
        userName={userData.username} // Pass the username from state
        userSecret={userData.secret} // Pass the secret from state
        onNewChat={handleCreateChat} // Optional: handle new chat creation
        height="80vh" // Occupy full screen height
        width="100vw" // Occupy full screen width
      />
    </div>
  );
}

export default Chat;
