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
  font-size: 0.8rem;
  color: #20253f;
`;

const BadgeContainer = styled.div`
  width: 25%;
  height: 25%;
  display: flex;
  opacity: 0.7;
`;

const SpinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningBorderContent = styled.div`
  width: 24vmin;
  height: 24vmin;
  position: relative;
`;

const LoadingCircle = styled.svg`
  z-index: 1;
  animation: ${SpinAnimation} 2s linear infinite;
  #track {
    transition: fill 1s ease-in-out;
    fill: ${props => (props.loaded ? '#4F8A10' : '#BDE5F8')};
  }

  #section {
    transition: fill 1s ease-in-out;
    fill: ${props => (props.loaded ? '#4F8A10' : '#00529B')};
  }
`;

const LoadingContent = styled.div`
  background-color: #FDFDF0;
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 1s ease-in-out 1s;
  text-align: center;
  font-size: 0.5rem;
  /* &.moved {
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
    //box-shadow: 0 0 100px #ffffff;
  } */
`;

const View = ({ moved, name, badge, avatar }: Props) => {
  return (
    // <Container moved={moved} className={moved ? 'moved' : ''}>
    //   <Title>
    //     <TranslatedPlayerName playerName={name} />
    //     <p>{avatar && avatar.name}</p>
    //   </Title>
    //   {badge && <BadgeContainer>{badge}</BadgeContainer>}
    // </Container>
    <SpinningBorderContent loaded={moved}>
      <LoadingContent loaded={moved} className={moved && 'moved'}>
        <Title>
          <TranslatedPlayerName playerName={name} />
        </Title>
        <p style={{ margin: '0', padding: '0' }}>
          {avatar ? `${avatar.name} ✅` : 'Waiting...'}
        </p>
        {badge && <BadgeContainer>{badge}</BadgeContainer>}
      </LoadingContent>
      <LoadingCircle
        loaded={moved}
        id="loading-spinner"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <g fill="none">
          <path
            id="track"
            d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"
          />
          <path
            id="section"
            d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"
          />
        </g>
      </LoadingCircle>
    </SpinningBorderContent>
  );
};

export default View;
