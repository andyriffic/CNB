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
  const q = useRef(gsap.utils.selector(el));
  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    tl.current = generateTimeline(
      animationName,
      q.current(`.${ITEM_CLASS_NAME}`),
      options
    );

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
