import React from 'react';
import styled from 'styled-components';
import { rotateAnimation } from '../../../uplift/components/animations';
import vortexImage from '../../screens/snakes-and-ladders/assets/vortex.png';

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

const RotatingVortex = styled.img`
  width: 95%;
  height: 95%;
  animation: ${rotateAnimation} 5s linear infinite;
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
      {tags.includes('badge:portal_winner') && (
        <BadgeEmoji
          title="Won Portal Snakes and Ladders"
          style={{ backgroundColor: 'lightblue' }}
        >
          <RotatingVortex src={vortexImage} alt="Vortex" />
        </BadgeEmoji>
      )}
      {tags.includes('badge:chinese_new_year_snakes_and_ladders_winner') && (
        <BadgeEmoji
          title="Won Chinese New Year Snakes and Ladders"
          style={{ borderColor: '#E40010', backgroundColor: '#FFD84B' }}
        >
          🏮
        </BadgeEmoji>
      )}
      {tags.includes('badge:donkey_kong_winner') && (
        <BadgeEmoji
          title="Won very first Donkey Kong game!"
          style={{ borderColor: '#000', backgroundColor: '#2A3492' }}
        >
          🍒
        </BadgeEmoji>
      )}
    </Container>
  );
};
