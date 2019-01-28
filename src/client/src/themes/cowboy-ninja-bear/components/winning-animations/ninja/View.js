/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateSmallLeft = keyframes`
  0% {
    opacity: 1;
    transform: rotate(45deg);
    left: 350%;
  }

  100% {
    transform: rotate(-1430deg);
    left: 65%;
    top: 45%;
    opacity: 1;
  }
`;

const rotateMediumLeft = keyframes`
  0% {
    opacity: 1;
    transform: rotate(45deg);
    left: 350%;
  }

  100% {
    transform: rotate(-1430deg);
    left: 65%;
    top: 60%;
    opacity: 1;
  }
`;

const rotateHeapsLeft = keyframes`
  0% {
    opacity: 1;
    transform: rotate(45deg);
    left: 350%;
  }

  100% {
    transform: rotate(-1350deg);
    left: 50%;
    top: 50%;
    opacity: 1;
  }
`;

const rotateSmallRight = keyframes`
  0% {
    opacity: 1;
    transform: rotate(45deg);
    right: 350%;
  }

  100% {
    transform: rotate(-1430deg);
    right: 65%;
    top: 45%;
    opacity: 1;
  }
`;

const rotateMediumRight = keyframes`
  0% {
    opacity: 1;
    transform: rotate(45deg);
    right: 350%;
  }

  100% {
    transform: rotate(-1430deg);
    right: 65%;
    top: 60%;
    opacity: 1;
  }
`;

const rotateHeapsRight = keyframes`
  0% {
    opacity: 1;
    transform: rotate(45deg);
    right: 350%;
  }

  100% {
    transform: rotate(-1350deg);
    right: 50%;
    top: 50%;
    opacity: 1;
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
  position: relative;
  flex: 1;
`;

const Star = styled.div`
  opacity: 0;
  position: absolute;
  ${props => (props.isLeft ? 'left: 150%;' : 'right: 150%;')}
  animation: ${props => props.keyframes} 1.5s linear ${props =>
  props.animationDelay}s 1 forwards;
`;

const Point = styled.div`
  width: 0px;
  height: 0px;

  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 20px solid #20253f;

  display: inline-block;
  position: absolute;

  &:nth-child(1) {
    transform: rotate(0deg);
    top: 0px;
    left: -5px;
  }

  &:nth-child(2) {
    transform: rotate(90deg);
    bottom: -10px;
    right: 5px;
  }

  &:nth-child(3) {
    transform: rotate(180deg);
    bottom: 0px;
    left: -5px;
  }

  &:nth-child(4) {
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

const NinjaStar = ({ animationDelay, keyframes, isLeft }) => {
  return (
    <StarContainer>
      <Star
        animationDelay={animationDelay}
        keyframes={keyframes}
        isLeft={isLeft}
      >
        <Point />
        <Point />
        <Point />
        <Point />
        <Center />
      </Star>
    </StarContainer>
  );
};

type Props = {
  animationDelay: number,
  isLeft: boolean,
};

const View = ({ animationDelay, isLeft }: Props) => {
  const smallKeyframes = isLeft ? rotateSmallLeft : rotateSmallRight;
  const mediumKeyframes = isLeft ? rotateMediumLeft : rotateMediumRight;
  const heapsKeyframes = isLeft ? rotateHeapsLeft : rotateHeapsRight;

  return (
    <ViewContainer>
      <NinjaStar
        animationDelay={animationDelay}
        keyframes={smallKeyframes}
        isLeft={isLeft}
      />
      <NinjaStar
        animationDelay={animationDelay + 0.25}
        keyframes={mediumKeyframes}
        isLeft={isLeft}
      />
      <NinjaStar
        animationDelay={animationDelay + 0.5}
        keyframes={heapsKeyframes}
        isLeft={isLeft}
      />
    </ViewContainer>
  );
};

export default View;
