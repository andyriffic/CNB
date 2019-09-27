import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const TeamContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const Bomb = styled.div<{ position: 'LEFT' | 'RIGHT' }>`
  position: relative;
  font-size: 2rem;
  transition: left 1000ms ease-in-out;
  ${props => props.position === 'LEFT' && 'left: -250px;'}
  ${props => props.position === 'RIGHT' && 'left: 250px;'}
`;

export const TimebombStrip = ({
  playerWithTimebombIndex,
}: {
  playerWithTimebombIndex: number;
}) => {
  return (
    <Container className="margins-off">
      <Bomb position={playerWithTimebombIndex === 0 ? 'LEFT' : 'RIGHT'}>
        💣
      </Bomb>
    </Container>
  );
};
