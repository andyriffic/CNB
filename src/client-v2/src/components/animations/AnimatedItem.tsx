import { createRef, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { generateTimeline } from './generateTimeline';
import { AnimationName } from './types';

type Props = {
  children: JSX.Element;
  animationName: AnimationName;
  options?: gsap.TweenVars;
};

const ITEM_CLASS_NAME = 'anim-item';

export function AnimatedItem({
  children,
  animationName,
  options = { delay: 0 },
}: Props): JSX.Element {
  const el = createRef<HTMLDivElement>();
  const q = useRef(gsap.utils.selector(el));
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    tl.current = generateTimeline(
      animationName,
      q.current(`.${ITEM_CLASS_NAME}`),
      options
    );

    return () => {
      // tl.current?.kill();
    };
  }, [el, q, animationName, options]);

  return (
    <div ref={el}>
      <div className={ITEM_CLASS_NAME}>{children}</div>
    </div>
  );
}
