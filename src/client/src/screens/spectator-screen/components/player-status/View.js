/* @flow */
import React from 'react';
import type { ComponentType } from 'react';
import styled, { keyframes } from 'styled-components';

import TranslatedPlayerName from '../../../../components/translated-player-name';

type Props = {
  moved: boolean,
  name: string,
  badge?: ComponentType<*>,
  avatar: Object,
};

const Rainbow = keyframes`
  0% { background-position:0% 82%; }
  50% { background-position:100% 19%; }
  100% { background-position:0% 82%; }
`;

const Container = styled.div`
  background-color: #ffb758;
  border-radius: 20px;
  height: 24vmin;
  width: 24vmin;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  transition: opacity 1s linear;
  opacity: ${props => (props.moved ? '1' : '0.5')};
  &.moved {
    background: linear-gradient(
      124deg,
      #ff2400,
      #e81d1d,
      #e8b71d,
      #e3e81d,
      #1de840,
      #1ddde8,
      #2b1de8,
      #dd00f3,
      #dd00f3
    );
    background-size: 1800% 1800%;
    animation: ${Rainbow} 10s ease infinite;
    box-shadow: 0 0 100px #ffffff;
  }
`;

const Title = styled.div`
  margin: 0;
  padding: 5px 0;
  font-size: 1rem;
  color: #20253f;
  text-align: center;
`;

const BadgeContainer = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  position: absolute;
  bottom: -25%;
  left: -25%;
  opacity: 0.7;
`;

const View = ({ moved, name, badge, avatar }: Props) => {
  return (
    <Container moved={moved} className={moved ? 'moved' : ''}>
      <Title>
        <TranslatedPlayerName playerName={name} />
        <p>{avatar && avatar.name}</p>
      </Title>
      {badge && <BadgeContainer>{badge}</BadgeContainer>}
    </Container>
  );
};

export default View;
