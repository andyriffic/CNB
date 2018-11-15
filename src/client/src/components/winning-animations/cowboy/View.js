/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const move = keyframes`
0% {

  left: 150%;
}

50% {

  left: 50%;
  top: 50%;
}

100% {

  left: 50%;
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
   overflow: hidden;
   position:relative;
   flex: 1;
`;

const Bullet = styled.div`
  position: absolute;
  left: 150%;
  top: 50%;
  height: 50%;
  width: 20%;
  animation: ${move} 6s ease-in ${props=> props.animationDelay}s 1 forwards;
`

const Tip = styled.div`
  border-radius: 50% 0% 0% 50%;
  width: 40%;
  height: 60%;
  background-color: #20253f;
`;

const CowboyBullet = ({animationDelay}) => {
  return (
    <BulletContainer>
      <Bullet animationDelay={animationDelay}>
        <Tip />
      </Bullet>
    </BulletContainer>
  );
}

const View = ({animationDelay}) => {
  return (
    <ViewContainer>
      <CowboyBullet animationDelay={animationDelay}/>
      <CowboyBullet animationDelay={animationDelay+1}/>
      <CowboyBullet animationDelay={animationDelay+2}/>
    </ViewContainer>
  )
}

export default View;
