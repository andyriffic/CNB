import { AnimationName } from './types';
import gsap from 'gsap';

export function generateTimeline(
  animationName: AnimationName,
  classSelector: gsap.TweenTarget,
  tweenVars?: gsap.TweenVars
): gsap.core.Timeline {
  switch (animationName) {
    case 'drop-in': {
      return gsap.timeline().from(classSelector, {
        ...tweenVars,
        ease: 'bounce.out',
        duration: 1.5,
        y: -1000,
      });
    }
    case 'spin': {
      return gsap.timeline().from(classSelector, {
        ...tweenVars,
        rotate: 360,
      });
    }
    case 'appear-standard': {
      return gsap.timeline().from(classSelector, {
        autoAlpha: 0,
        duration: 0.75,
        scale: 0,
        ease: 'bounce.out',
      });
    }
    default: {
      return gsap.timeline().from(classSelector, {
        ...tweenVars,
      });
    }
  }
}
