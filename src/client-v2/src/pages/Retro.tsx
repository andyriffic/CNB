import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import styled from 'styled-components';
import RetroColumn from './RetroColumn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = new W3CWebSocket('ws://cnb.finx-rocks.com/');

client.onopen = () => {
  console.log('WebSocket Client Connected');
};

const Row = styled.div`
  display: flex;
  gap: 15px;
  align-items: stretch;
  width: 100%;
`;

type CardType = {
  id: number;
  message: string;
  likes: number;
  column: 'kudos' | 'good' | 'bad' | 'question';
};

const Retro = () => {
  const [messages, setMessages] = useState<any[]>([]);

  client.onmessage = (message: any) => {
    const passedMessage = JSON.parse(message.data);
    if (passedMessage.type !== 'notification') {
      setMessages(passedMessage);
    } else {
      toast(passedMessage.message);
    }
  };

  return (
    <Row>
      <RetroColumn
        title="Kudos"
        columnType="kudos"
        messages={messages}
        client={client}
      />
      <RetroColumn
        title="Went well"
        columnType="good"
        messages={messages}
        client={client}
      />
      <RetroColumn
        title="Could be better"
        columnType="bad"
        messages={messages}
        client={client}
      />
      <RetroColumn
        title="Questions"
        columnType="questions"
        messages={messages}
        client={client}
      />
      <RetroColumn
        title="Actions"
        columnType="actions"
        messages={messages}
        client={client}
      />
      <ToastContainer theme="dark" />
    </Row>
  );
};

export default Retro;
