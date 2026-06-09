import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  sender: string;
  text: string;
  timestamp: string;
}

interface ChatBoxProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{
      width: '300px',
      background: '#ffffff',
      borderLeft: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #F3F4F6' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>Meeting Chat</h3>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '0.85rem', marginTop: '32px' }}>
            No messages yet. Say hello!
          </div>
        ) : (
          messages.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.8rem', color: '#4F46E5' }}>{m.sender}</span>
                <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{m.timestamp}</span>
              </div>
              <div style={{
                background: '#F3F4F6', padding: '8px 12px', borderRadius: '8px',
                fontSize: '0.875rem', color: '#1F2937', wordBreak: 'break-word'
              }}>
                {m.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB',
            fontSize: '0.875rem', outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px', background: '#6D28D9', color: '#ffffff', border: 'none',
            borderRadius: '6px', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer'
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
