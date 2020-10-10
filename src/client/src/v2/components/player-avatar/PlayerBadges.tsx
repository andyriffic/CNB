import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* width: 20px;
  height: 20px; */
`;

const BadgeEmoji = styled.div`
  background-color: white;
  padding: 0.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  font-size: ${({ theme }) => theme.fontSize.large};
`;

type Props = {
  tags: string[];
};

export const PlayerBadges = ({ tags }: Props) => {
  return (
    <Container>
      {tags.includes('badge:snakes_and_ladders_winner') && (
        <BadgeEmoji>🐍</BadgeEmoji>
      )}
    </Container>
  );
};
