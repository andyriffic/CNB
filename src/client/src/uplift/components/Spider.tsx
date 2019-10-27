import React from 'react';
import styled, { keyframes } from 'styled-components';

const lookAnimation = keyframes`
  0%,
  40%,
  100% {
    transform: translateX(0);
  }

  45%,
  95% {
    transform: translateX(-110%);
  }
  `;

const swingAnimation = keyframes`
   0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
  `;

const Container = styled.div`
  /* 4. Animatie */
  animation: ${swingAnimation} 2s infinite;
  transform-origin: top;

  /* Bonus */
  transition: 0.8s ease-in-out;
}

.spider .spiderweb {
  width: 2px;
  height: 250px;
  margin-left: 49%;
  background: rgba(255, 255, 255, 0.7);
}

.spider .body {
  width: 60px;
  height: 40px;
  background: #222;
  position: relative;
  top: -25px;
  border-radius: 50%;
}

.spider .body .eye {
  width: 12px;
  height: 12px;
  position: absolute;
  bottom: 10px;
  background: #fff;
  border-radius: 50%;
}

.spider .body .eye.left {
  left: 14px;
}

.spider .body .eye.right {
  right: 14px;
}

.spider .body .eye:after {
  background: #222;
  width: 4px;
  height: 4px;
  content: "";
  display: block;
  margin: 55%;
  border-radius: 50%;

  /* 3. Animatie */
  animation: ${lookAnimation} 4s infinite;
}

.spider .legs .leg {
  width: 60px;
  height: 30px;
  margin-top: -20px;
  border: 5px solid transparent;
  border-top-color: #969696;
  border-radius: 40px 40px 0 0;
}

.spider .legs {
  position: absolute;
  bottom: -2px;
  z-index: -1;
}

.spider .legs.left {
  left: -70%;
}
.spider .legs.right {
  right: -60%;
}

.legs.left .leg:nth-child(1) {
  transform: rotate(10deg);
  margin-left: 10px;
}
.legs.right .leg:nth-child(1) {
  transform: rotate(-10deg);
  margin-left: -10px;
}

.legs.left .leg:nth-child(2) {
  transform: rotate(-20deg);
  margin-left: 20px;
}
.legs.right .leg:nth-child(2) {
  transform: rotate(20deg);
  margin-left: -20px;
}

.legs.left .leg:nth-child(3) {
  transform: rotate(-50deg);
  margin-left: 30px;
}
.legs.right .leg:nth-child(3) {
  transform: rotate(50deg);
  margin-left: -30px;
}
`;

export const Spider = () => {
  return (
    <Container>
      <div className="spider">
        <div className="spiderweb"></div>
        <div className="body">
          <div className="eye left"></div>
          <div className="eye right"></div>
        </div>
        <div className="legs left">
          <div className="leg"></div>
          <div className="leg"></div>
          <div className="leg"></div>
        </div>
        <div className="legs right">
          <div className="leg"></div>
          <div className="leg"></div>
          <div className="leg"></div>
        </div>
      </div>
    </Container>
  );
};
