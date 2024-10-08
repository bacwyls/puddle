import React, { useCallback, useState } from 'react';
import useServiceStore from '../store/service';
import { maybeReplaceWithImage } from '../utils';

interface ChatInputProps {
}

const ChatInput: React.FC<ChatInputProps> = ({  }) => {
  const [chatMessageInputText, setChatMessageInputText] = useState('');
  const {sendChat} = useServiceStore();

  const handleInputChange = (event) => {
    setChatMessageInputText(event.target.value);
  };

  const sendChatCallback = useCallback(
    async (event) => {
      event.preventDefault();
      if (!chatMessageInputText) return;
      let text = maybeReplaceWithImage(chatMessageInputText);
      sendChat(text);
      setChatMessageInputText('');
    },
    [chatMessageInputText]
  );


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height:"100%",
        maxHeight:"100%",
      }}
    >
      <textarea
        className="df"
        style={{
          flexGrow: 1,
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
          marginRight: '0px',
        }}
        id="chat-input"
        value={chatMessageInputText}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendChatCallback(event);
          }
        }}
      />
      <div>
      <button 
        className="df"
        style={{ cursor: 'pointer', height: '100%', borderLeft:"none" }} 
        onClick={sendChatCallback}
      >
        Send
      </button>
      </div>
    </div>
  );
};

export default ChatInput;