/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveClaws = keyframes`
  0%, 20% {
    transform: rotate(-40deg);
  }
  30%, 35% {
    transform: translate3d(-6rem, -20rem, 0) rotate(-20deg);
  }
  80%, 90% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(-40deg);
  }
`;

const blurClaws = keyframes`
  0%, 35% {
    filter: none;
  }
  37% {transform: translateX(.1rem); filter: blur(4px); }
  39% {transform: translateX(-.2rem);}
  41% {transform: translateX(.2rem);}
  43% {transform: translateX(-.1rem);}
  45% {transform: translateX(.2rem);}
  47% {transform: translateX(-.2rem);}
  49% {transform: translateX(.1rem);}
  51% {transform: translateX(-.2rem);}
  53% {transform: translateX(.2rem);}
  55% {transform: translateX(-.1rem);}
  57% {transform: translateX(.2rem);}
  59% {transform: translateX(-.2rem);}
  61% {transform: translateX(.2rem);}
  63% {transform: translateX(-.1rem);}
  65% {transform: translateX(.2rem);}
  67% {transform: translateX(-.2rem);}
  69% {transform: translateX(.1rem);}
  71% {transform: translateX(-.2rem);}
  73% {transform: translateX(.2rem);}
  75% {transform: translateX(-.1rem);}
  77% {transform: translateX(.2rem);}
  79% {transform: translateX(-.2rem); filter: blur(0px);}
  80%, 100% {
    transform: none;
  }
`;

const fake = keyframes`
  0%, 35% {
    height: 100%;
  }
  80%, 100% {
    height: 0;
  }
`;

const fake2 = keyframes`
  0%, 40% {
		height: 0;
	}
	100% {
		height: 100%;
	}
`;

const fade = keyframes`
  0%, 30% {
		opacity: 0;
	}
	60%, 100% {
		opacity: 1;
	}
`;

const ViewContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Claws = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  height: 80%;
  width: 25%;
  animation: ${moveClaws} 3s 1 ease-in-out ${props => props.animationDelay}s
    forwards;
`;

const Claw = styled.span`
  display: inline-block;
  background-color: white;
  border-top-left-radius: 100% 100%;
  background-image: linear-gradient(
    to right,
    lightgrey 0%,
    lightgrey 50%,
    white 50%,
    white 100%
  );
  margin: 0 0.1rem;
  animation: ${blurClaws} 3s 1 ease-in-out ${props => props.animationDelay}s
    forwards;
  &:nth-child(1) {
    height: 100%;
    width: 10%;
  }
  &:nth-child(2) {
    height: 98%;
    width: 10%;
  }
  &:nth-child(3) {
    height: 96%;
    width: 10%;
  }
`;

const Trails = styled.div`
  position: absolute;
  z-index: 0;
  top: 20%;
  left: 70%;
  height: 80%;
  width: 25%;
  transform: translate3d(-85%, -85%, 0) rotate(-20deg);
  &::before {
    content: '';
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    height: 0;
    animation: ${fake2} 3s 1 ease-in-out ${props => props.animationDelay}s
      forwards;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    animation: ${fake} 3s 1 ease-in-out ${props => props.animationDelay}s
      forwards;
  }
`;

const Trail = styled.span`
  display: inline-block;
  width: 3%;
  height: 100%;
  background-color: red;
  opacity: 0;
  margin: 0 10%;
  vertical-align: top;
  animation: ${fade} 3s 1 ease-in-out ${props => props.animationDelay}s forwards;
  &:nth-child(1) {
    margin-top: 10%;
    transform: translateX(-1.2rem);
  }
  &:nth-child(2) {
    margin-top: 10%;
    transform: translateX(-1.2rem);
  }
  &:nth-child(3) {
    margin-top: 10%;
    transform: translateX(-1.2rem);
  }
`;

type Props = {
  animationDelay: number,
};

const View = ({ animationDelay }: Props) => {
  return (
    <ViewContainer>
      <Claws animationDelay={animationDelay}>
        <Claw animationDelay={animationDelay} />
        <Claw animationDelay={animationDelay} />
        <Claw animationDelay={animationDelay} />
      </Claws>

      <Trails animationDelay={animationDelay + 1}>
        <Trail animationDelay={animationDelay + 1} />
        <Trail animationDelay={animationDelay + 1} />
        <Trail animationDelay={animationDelay + 1} />
      </Trails>
    </ViewContainer>
  );
};

export default View;
