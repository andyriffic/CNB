import { createRef, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { generateTimeline } from './generateTimeline';
import { AnimationName } from './types';

type Props = {
  children: JSX.Element[];
  animationName: AnimationName;
  options?: gsap.TweenVars;
};

const ITEM_CLASS_NAME = 'anim-item';

export function AnimatedItems({
  children,
  animationName,
  options = { delay: 0, stagger: 0.3 },
}: Props): JSX.Element {
  const el = createRef<HTMLDivElement>();
  const q = gsap.utils.selector(el);
  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    tl.current = gsap
      .timeline()
      .from(q(`.${ITEM_CLASS_NAME}`), generateTimeline(animationName, options));

    return () => {
      tl.current?.kill();
    };
  }, [el, q, animationName, options]);

  return (
    <div style={{ display: 'flex' }} ref={el}>
      {children.map((childEl, i) => (
        <div key={i} className={ITEM_CLASS_NAME}>
          {childEl}
        </div>
      ))}
    </div>
  );
}
