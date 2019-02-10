import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CSSPlugin, TimelineMax, TweenMax } from 'gsap/all';

const Container = styled.div`
  min-width: ${props => `${props.minDimensions.width}px`};
  min-height: ${props => `${props.minDimensions.height}px`};
`;

const View = ({ children, setRef, showIndex = 0 }) => {
  const [previousShowIndex, setPreviousShowIndex] = useState(showIndex);
  const [refs] = useState([]);
  const [minDimensions, setMinDimensions] = useState({ width: 0, height: 0 });
  const [animationTimeline] = useState(new TimelineMax());

  useEffect(() => {
    let { width, height } = minDimensions;
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

    // let { width, height } = minDimensions;
    // refs.forEach((ref) => {
    //   const rect = ref.getBoundingClientRect();
    //   console.log('Setting min dimensions', rect);
    //   if (rect.width > width) {
    //     width = rect.width;
    //   }
    //   if (rect.height > height) {
    //     height = rect.height;
    //   }
    // });
    // setMinDimensions({ width, height });

    setPreviousShowIndex(showIndex);
  }, [showIndex]);

  return (
    <Container ref={setRef} minDimensions={minDimensions}>
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
