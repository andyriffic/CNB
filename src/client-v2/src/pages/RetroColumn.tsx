import React, { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Input from "../components/Input";
import MessageCard from "../components/MessageCard";

const AddInput = styled(Input)`
  background-color: green;
`;

const Column = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  height: 95vh;
  max-height: 95vh;
  width: 20%;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: scroll;
`;

const ColumnContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
`;

const RetroColumn = ({
  title,
  columnType,
  messages,
  client,
}: {
  title: string;
  columnType: string;
  messages: any[];
  client: any;
}) => {
  const [newMessage, setNewMessage] = useState("");

  return (
    <Column>
      <ColumnContainer>
        <ColumnContainer2>
          <h2 style={{color: 'white'}}>{title}</h2>
          {messages.map((message) => {
            if (message.column === columnType) {
              return (
                <MessageCard
                  key={message.id}
                  message={message.message}
                  likes={message.likes}
                  onLike={() => {
                    client.send(
                      JSON.stringify({
                        data: { id: message.id },
                        type: "addLike",
                      })
                    );
                  }}
                />
              );
            }
          })}
        </ColumnContainer2>
      </ColumnContainer>

      <HorizontalContainer>
        <AddInput
          controlledValue={newMessage}
          onChange={(e: any) => {
            setNewMessage(e);
          }}
        />
        <button
          onClick={() => {
            if (newMessage !== "") {
              client.send(
                JSON.stringify({
                  data: { message: newMessage },
                  type: "addCard",
                  column: columnType,
                })
              );
              setNewMessage("");
            }
          }}
        >
          add card
        </button>
      </HorizontalContainer>
    </Column>
  );
};

export default RetroColumn;
