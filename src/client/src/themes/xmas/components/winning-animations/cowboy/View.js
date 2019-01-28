/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveSmallLeft = keyframes`
0% {
  opacity: 1;
  left: 350%;
}

100% {
  opacity: 1;
  left: 60%;
  top: 50%;
}
`;

const moveMediumLeft = keyframes`
0% {
  opacity: 1;
  left: 350%;
}

100% {
  opacity: 1;
  left: 50%;
  top: 50%;
}
`;

const moveHeapsLeft = keyframes`
0% {
  opacity: 1;
  left: 350%;
}

100% {
  opacity: 1;
  left: 40%;
  top: 50%;
}
`;

const moveSmallRight = keyframes`
0% {
  opacity: 1;
  right: 350%;
}

100% {
  opacity: 1;
  right: 60%;
  top: 50%;
}
`;

const moveMediumRight = keyframes`
0% {
  opacity: 1;
  right: 350%;
}

100% {
  opacity: 1;
  right: 50%;
  top: 50%;
}
`;

const moveHeapsRight = keyframes`
0% {
  opacity: 1;
  right: 350%;
}

100% {
  opacity: 1;
  right: 40%;
  top: 50%;
}
`;

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const BulletContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  flex: 1;
`;

const Bullet = styled.div`
  opacity: 0;
  position: absolute;
  ${props => (props.isLeft ? 'left: 150%;' : 'right: 150%;')}
  ${props => (!props.isLeft ? 'transform: scaleX(-1);' : '')}
  top: 50%;
  height: 50%;
  width: 20%;
  animation: ${props => props.keyframes} 1.5s linear
    ${props => props.animationDelay}s 1 forwards;
`;

const Tip = styled.div`
  border-radius: 50% 0% 0% 50%;
  width: 40%;
  height: 60%;
  background-color: white;
  border: 1px solid black;
`;

const CowboyBullet = ({ animationDelay, keyframes, isLeft }) => {
  return (
    <BulletContainer>
      <Bullet
        animationDelay={animationDelay}
        keyframes={keyframes}
        isLeft={isLeft}
      >
        <Tip />
      </Bullet>
    </BulletContainer>
  );
};

type Props = {
  animationDelay: number,
  isLeft: boolean,
};

const View = ({ animationDelay, isLeft }: Props) => {
  const smallKeyframes = isLeft ? moveSmallLeft : moveSmallRight;
  const mediumKeyframes = isLeft ? moveMediumLeft : moveMediumRight;
  const heapsKeyframes = isLeft ? moveHeapsLeft : moveHeapsRight;

  return (
    <ViewContainer>
      <CowboyBullet
        animationDelay={animationDelay}
        keyframes={smallKeyframes}
        isLeft={isLeft}
      />
      <CowboyBullet
        animationDelay={animationDelay + 0.25}
        keyframes={mediumKeyframes}
        isLeft={isLeft}
      />
      <CowboyBullet
        animationDelay={animationDelay + 0.5}
        keyframes={heapsKeyframes}
        isLeft={isLeft}
      />
    </ViewContainer>
  );
};

export default View;
