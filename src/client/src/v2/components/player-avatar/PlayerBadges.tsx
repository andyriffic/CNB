import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* width: 20px;
  height: 20px; */
`;

const BadgeEmoji = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: white;
  padding: 0.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #fff;
  font-size: ${({ theme }) => theme.fontSize.large};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

type Props = {
  tags: string[];
};

export const PlayerBadges = ({ tags }: Props) => {
  return (
    <Container>
      {tags.includes('badge:snakes_and_ladders_winner') && (
        <BadgeEmoji
          title="Won Snakes and Ladders"
          style={{ backgroundColor: 'mediumseagreen' }}
        >
          🐍
        </BadgeEmoji>
      )}
      {tags.includes('badge:candyland_winner') && (
        <BadgeEmoji
          title="Won Candyland Snakes and Ladders"
          style={{ backgroundColor: 'pink' }}
        >
          🍭
        </BadgeEmoji>
      )}
    </Container>
  );
};
