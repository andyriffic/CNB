/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(45deg);
    left: 150%;
  }

  50% {
    transform: rotate(-1395deg);
    left: 50%;
    top: 50%;
  }

  100% {
    transform: rotate(-1395deg);
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

const StarContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  position:relative;
  flex: 1;
`;

const Star = styled.div`
  position: absolute;
  left: 150%;
  animation: ${rotate} 6s ease-in ${props=> props.animationDelay}s 1 forwards;
`;

const Point = styled.div`
  width: 0px;
  height: 0px;

  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 20px solid #20253f;

  display: inline-block;
  position: absolute;

  &:nth-child(1)
  {
    transform: rotate(0deg);
    top: 0px;
    left: -5px;
  }

  &:nth-child(2)
  {
    transform: rotate(90deg);
    bottom: -10px;
    right: 5px;
  }

  &:nth-child(3)
  {
    transform: rotate(180deg);
    bottom: 0px;
    left: -5px;
  }

  &:nth-child(4)
  {
    transform: rotate(270deg);
    bottom: -10px;
    left: 5px;
  }
`;

const Center = styled.div`
  background-color: white;
  width: 5px;
  height: 5px;
  position: absolute;
  border-radius: 50px;
  left: -2.5px;
  top: -2.5px;
`;

const NinjaStar = ({animationDelay}) => {
  return (
    <StarContainer>
      <Star animationDelay={animationDelay}>
        <Point />
        <Point />
        <Point />
        <Point />
        <Center />
      </Star>
    </StarContainer>
  );
}

const View = ({animationDelay}) => {
  return (
    <ViewContainer>
      <NinjaStar animationDelay={animationDelay}/>
      <NinjaStar animationDelay={animationDelay+1}/>
      <NinjaStar animationDelay={animationDelay+2}/>
    </ViewContainer>
  )
}

export default View;
