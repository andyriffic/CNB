import { keyframes, css } from 'styled-components';

export const rubberBandAnimation = keyframes`
  0% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  30% {
    -webkit-transform: scaleX(1.25) scaleY(0.75);
    -ms-transform: scaleX(1.25) scaleY(0.75);
    transform: scaleX(1.25) scaleY(0.75);
  }

  40% {
    -webkit-transform: scaleX(0.75) scaleY(1.25);
    -ms-transform: scaleX(0.75) scaleY(1.25);
    transform: scaleX(0.75) scaleY(1.25);
  }

  60% {
    -webkit-transform: scaleX(1.15) scaleY(0.85);
    -ms-transform: scaleX(1.15) scaleY(0.85);
    transform: scaleX(1.15) scaleY(0.85);
  }

  100% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }
`;

export const fadeInAnimation = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

export const pulseAnimation = keyframes`
  0% {transform: scale(1);}
  20% {transform: scale(1.4); }
  50% {transform: scale(.9);}
  80% {transform: scale(1.2);}
  100% {transform: scale(1);}
`;

// export const Pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.1); }
//   100% { transform: scale(1); }
// `;

export const growAnimation = keyframes`
  0% { transform: scale(0.2); }
  100% { transform: scale(1); }
`;

export const rotateAnimation = keyframes`
  0% { transform: rotate3d(0); }
  100% { transform: rotate(360deg); }
`;

export const stampAnimation = keyframes`
  0%{
    opacity: 0;
  }
  10%{
    opacity:.50;
    transform-origin: 50% 50%;
    transform: rotate(-2deg) scale(5);
    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  }
  100%{
    opacity:1;
    transform: rotate(-15deg) scale(1);
  }
`;

export const shakeAnimationLeft = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

export const shakeAnimationRight = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg) scaleX(-1); }
  10% { transform: translate(-1px, -2px) rotate(-1deg) scaleX(-1); }
  20% { transform: translate(-3px, 0px) rotate(1deg) scaleX(-1); }
  30% { transform: translate(3px, 2px) rotate(0deg) scaleX(-1); }
  40% { transform: translate(1px, -1px) rotate(1deg) scaleX(-1); }
  50% { transform: translate(-1px, 2px) rotate(-1deg) scaleX(-1); }
  60% { transform: translate(-3px, 1px) rotate(0deg) scaleX(-1); }
  70% { transform: translate(3px, 1px) rotate(-1deg) scaleX(-1); }
  80% { transform: translate(-1px, -1px) rotate(1deg) scaleX(-1); }
  90% { transform: translate(1px, 2px) rotate(0deg) scaleX(-1); }
  100% { transform: translate(1px, -2px) rotate(-1deg) scaleX(-1); }
`;

export const spinAwayAnimationRight = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(800px, 0) rotate(1080deg); }
`;

export const spinAwayAnimationLeft = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(-800px, 0) rotate(-1080deg); }
`;

export const spinAwayAnimationUp = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(0, -1000px) rotate(-1080deg); }
`;

export const fallOverAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-90deg); }
`;

export const hadoukenAnimation = keyframes`
  0% { transform: translateX(0); opacity: 0; }
  40% { transform: translateX(400px); opacity: 1; }
  60% { transform: translateX(600px); opacity: 1; }
  100% { transform: translateX(800px); opacity: 0; }
`;

export const bounceInAnimation = keyframes`
  from,
  20%,
  53%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -7px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

export const fadeOutDownAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
`;

export const fadeInDownAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeInLeftAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const fadeInRightAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
