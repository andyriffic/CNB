import React from 'react';
import styled, { keyframes } from 'styled-components';

const tickSwipe1 = keyframes`
    0% {
		opacity: 0;
    }
    10% {
		opacity: 0.5;
    }
    20% {
		opacity: 1;
    }


    100% {
		opacity: 1;
    	transform: scaleX(1);
    }
`;

const tickSwipe2 = keyframes`
	40% {
		opacity: 0;
	}
    47% {
    	transform: scaleY(0.15);
		opacity: 1;
    }
    100% {
    	transform: scaleY(1);
		opacity: 1;
    }
`;

const circlePulse = keyframes`
0% {transform: scale(1);}
20% {transform: scale(1.2); }
50% {transform: scale(.9);}
80% {transform: scale(1.1);}
100% {transform: scale(1);}
`;

const Container = styled.div`
  width: 60%;
  height: 60%;
  position: relative;
  margin: 0 auto;
  vertical-align: middle;
  text-align: center;

  .circle {
    fill: #60d154;
    animation-fill-mode: forwards;
    animation-name: ${circlePulse};
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  .tick svg {
    position: absolute;
    left: 30%;
    right: 0;
    top: 15px;
    bottom: 0;
    fill: #fff;
    width: 30%;
    height: 60%;
  }

  .tick {
    width: 100%;
    height: 100%;
    transform: rotate(45deg) scale(0.8);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .tick-leg1 {
    fill: #fff;
    animation-fill-mode: forwards;
    animation-name: ${tickSwipe1};
    animation-duration: 1s;
    animation-iteration-count: 1;
    transform: scaleX(0);
    transform-origin: left bottom;
    opacity: 0;
  }

  .tick-leg2 {
    fill: #fff;
    animation-fill-mode: forwards;
    animation-name: ${tickSwipe2};
    animation-duration: 2s;
    animation-iteration-count: 1;
    transform: scaleY(0);
    transform-origin: right bottom;
    opacity: 0;
  }
`;

const View = () => {
  return (
    <Container>
      <svg
        className="circle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>

      <div className="tick">
        <svg
          className="tick-leg1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 52"
        >
          <polygon className="" points="1,41 0,48 25,52 25,45" />
        </svg>
        <svg
          className="tick-leg2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 52"
        >
          <polygon className="" points="18,45 25,47 25,0 18,0" />
        </svg>
      </div>
    </Container>
  );
};

export default View;
