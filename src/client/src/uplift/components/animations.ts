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

export const bounceOutUpAnimation = keyframes`
  20% {
    transform: translate3d(0, -10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, 20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0) scaleY(3);
  }
`;

export const zoomOutUpAnimation = keyframes`
40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;

export const fadeOutUpAnimation = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -200%, 0);
  }
`;

export const slowFadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const squashedAnimation = keyframes`
  0% {
    height: 200px;
    transform: skew(0);
  }
  100% {
    height: 50px;
    transform: skew(-25deg);
  }
`;

export const fadeInAnimation = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

export const rainbowAnimation = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

export const inOutAnimation = keyframes`
  0% {opacity: 0; transform: scale(0)}
  20% {opacity: 1; transform: scale(1)}
  80% {opacity: 1; transform: scale(1)}
  100% {opacity: 0; transform: scale(0)}
`;

export const flashAnimation = keyframes`
from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
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

export const explodeAnimation = keyframes`
 0% { opacity: 1; }
 100% { opacity: 0; transform: scale(3) rotate(10deg); }
`;

export const shakeAndGrowAnimation = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg) scale(1); }
  10% { transform: translate(-1px, -2px) rotate(-1deg) scale(1.1); }
  20% { transform: translate(-3px, 0px) rotate(1deg) scale(1.2); }
  30% { transform: translate(3px, 2px) rotate(0deg) scale(1.1); }
  40% { transform: translate(1px, -1px) rotate(1deg) scale(1.2); }
  50% { transform: translate(-1px, 2px) rotate(-1deg) scale(1); }
  60% { transform: translate(-3px, 1px) rotate(0deg) scale(1); }
  70% { transform: translate(3px, 1px) rotate(-1deg) scale(1); }
  80% { transform: translate(-1px, -1px) rotate(1deg) scale(1); }
  90% { transform: translate(1px, 2px) rotate(0deg) scale(1); }
  100% { transform: translate(1px, -2px) rotate(-1deg) scale(1); }
`;

export const shakeExtremeAnimation = keyframes`
  0% { transform: translate(2px, 2px) rotate(0deg); }
  10% { transform: translate(-2px, -4px) rotate(-3deg); }
  20% { transform: translate(-6px, 0px) rotate(3deg); }
  30% { transform: translate(6px, 4px) rotate(0deg); }
  40% { transform: translate(2px, -2px) rotate(3deg); }
  50% { transform: translate(-2px, 4px) rotate(-3deg); }
  60% { transform: translate(-6px, 2px) rotate(0deg); }
  70% { transform: translate(6px, 2px) rotate(-3deg); }
  80% { transform: translate(-2px, -2px) rotate(3deg); }
  90% { transform: translate(2px, 4px) rotate(1deg); }
  100% { transform: translate(2px, 2px) rotate(0deg); }
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

export const jackInTheBoxAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.1) rotate(30deg);
    transform-origin: center bottom;
  }

  50% {
    transform: rotate(-10deg);
  }

  70% {
    transform: rotate(3deg);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const superSaiyanAnimation = keyframes`
  from {
    filter: saturate(0) hue-rotate(0);
    /* transform: translate3d(0, 2px, 0); */
  }

  30% {
    filter: saturate(4) hue-rotate(-0.25turn);
    /* transform: translate3d(0, -1px, 0); */
  }

  60% {
    filter: saturate(4) hue-rotate(0.25turn);
    /* transform: translate3d(0, 1px, 0); */
  }

  to {
    filter: saturate(0) hue-rotate(0);
    /* transform: translate3d(0, -2px, 0); */
  }
`;

export const bounceAnimation = keyframes`
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
`;

export const intoWormholeAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); opacity: 1; }
  100% { transform: rotate(-1080deg) scale(0.2); opacity: 0; }
`;

export const outOfWormholeAnimation = keyframes`
  0% { transform: rotate(-1080deg) scale(0.2); opacity: 0; }
  100% { transform: rotate(0deg) scale(1); opacity: 1; }
`;

export const outOfWormholeAnimationFacingLeft = keyframes`
  0% { transform: rotate(-1080deg) scale(0.2) scaleX(-1); opacity: 0; }
  100% { transform: rotate(0deg) scale(1) scaleX(-1); opacity: 1; }
`;

export const hingeAnimation = keyframes`
  0% {
    animation-timing-function: ease-in-out;
  }

  20%,
  60% {
    transform: rotate3d(0, 0, 1, 80deg);
    animation-timing-function: ease-in-out;
  }

  40%,
  80% {
    transform: rotate3d(0, 0, 1, 60deg);
    animation-timing-function: ease-in-out;
  }

  to {
    transform: translate3d(0, 100%, 0) rotate3d(0, 0, 1, 60deg);
  }
  `;

export const hingeOutAnimation = keyframes`
  0% {
    animation-timing-function: ease-in-out;
  }

  20%,
  60% {
    transform: rotate3d(0, 0, 1, 80deg);
    animation-timing-function: ease-in-out;
  }

  40%,
  80% {
    transform: rotate3d(0, 0, 1, 60deg);
    animation-timing-function: ease-in-out;
    opacity: 1;
  }

  to {
    transform: translate3d(0, 100vh, 0);
    opacity: 0;
  }`;

export const enterTopAnimation = keyframes`
  0% {
    transform: translateY(-1200px) scale(0.7);
    opacity: 0.7;
  }

  80% {
    transform: translateY(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-1080deg); }
`;

export const backOutRightAnimation = keyframes`
0% {
    transform: scale(1);
    opacity: 1;
  }

  20% {
    transform: translateX(0px) scale(0.7);
    opacity: 0.7;
  }

  100% {
    transform: translateX(2000px) scale(0.7);
    opacity: 0.7;
  }
  `;

export const slideInUpAnimation = keyframes`
  from {
    transform: translate3d(0, 120%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;
