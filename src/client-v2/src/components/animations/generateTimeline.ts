import { AnimationName } from './types';
import gsap from 'gsap';

export function generateTimeline(
  animationName: AnimationName,
  tweenVars?: gsap.TweenVars
): gsap.TweenVars {
  switch (animationName) {
    case 'drop-in': {
      return {
        ...tweenVars,
        ease: 'bounce.out',
        duration: 1.5,
        y: -1000,
      };
    }
    case 'spin': {
      return {
        ...tweenVars,
        rotate: 360,
      };
    }
    default: {
      return {
        ...tweenVars,
      };
    }
  }
}
