import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimelineMax, TweenMax } from 'gsap/all';

const Container = styled.div`
  min-width: ${props => `${props.minDimensions.width}px`};
  min-height: ${props => `${props.minDimensions.height}px`};
`;

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
    setPreviousShowIndex(showIndex);
  }, [showIndex]);

  return (
    <Container ref={setRef}>
      {children.map((child, index) => {
        return (
          <div key={index} ref={el => (refs[index] = el)}>
            {child}
          </div>
        );
      })}
    </Container>
  );
};

export default View;
