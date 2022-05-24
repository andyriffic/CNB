import React from "react";
import styled, { keyframes, css } from "styled-components";
import Card from "./Card";
import { addNameTagsToText } from "../utils/addNameTagsToText";

const grow = keyframes`
  from {
    max-height: 0px;
  }

  to {
    max-height: 500px;
  }
`;

type ContainerProps = {
  liked?: boolean;
};

const Container = styled<ContainerProps & typeof Card>(Card)`
  animation-name: ${grow};
  animation-duration: 2s;

  padding: 0;

  transition: border 0.1s linear;
  border: ${({ liked }) => (liked ? "double 5px transparent" : "none")};
  border-radius: 15px;
  background-image: linear-gradient(white, white),
    linear-gradient(to right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px;

  color: white;
  background-color: black;
`;

const MessageCard = ({
  className,
  message,
  likes,
  onLike,
}: {
  className?: any;
  message: string;
  likes: number;
  onLike?: any;
}) => {
  return (
    <Container className={className} liked={likes > 0}>
      <HorizontalContainer>
        <p>{addNameTagsToText(message)}</p>
        <button onClick={onLike}>like!</button>
      </HorizontalContainer>
    </Container>
  );
};

export default MessageCard;
