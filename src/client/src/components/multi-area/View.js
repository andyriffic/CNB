import React, { useState, useEffect } from 'react';
import { CSSPlugin, TimelineMax, TweenMax } from 'gsap/all';

const View = ({ children, setRef, showIndex = 0 }) => {
  const [previousShowIndex, setPreviousShowIndex] = useState(showIndex);
  const [refs] = useState([]);
  const [animationTimeline] = useState(new TimelineMax());

  useEffect(() => {
    refs.forEach((ref, index) => {
      if (index !== showIndex) {
        TweenMax.to(ref, 0, { opacity: 0, y: -50, display: 'none' });
      }
    });
  }, [refs]);

  useEffect(() => {
    if (previousShowIndex === showIndex) {
      return;
    }
    animationTimeline.clear();
    animationTimeline
      .to(refs[previousShowIndex], 0.2, { y: 50, opacity: 0, display: 'none' })
      .to(refs[showIndex], 0.2, { y: 0, opacity: 1, display: 'block' })
      .set(refs[previousShowIndex], { y: -50 });
    animationTimeline.play();
    setPreviousShowIndex(showIndex);
  }, [showIndex]);

  return (
    <div ref={setRef}>
      {children.map((child, index) => {
        return (
          <div key={index} ref={el => (refs[index] = el)}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default View;
