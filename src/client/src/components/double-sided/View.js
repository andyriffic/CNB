import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CSSPlugin, TimelineLite } from 'gsap/all';

const Container = styled.div``;
const SideContainer = styled.div`
  //display: ${props => (props.show ? 'block' : 'none')};
`;

const View = ({ topSide, bottomSide, setRef, showBottom = false }) => {
  const [previousShowBottom, setPreviousShowBottom] = useState(showBottom);
  const [topRef, setTopRef] = useState(null);
  const [bottomRef, setBottomRef] = useState(null);
  const [animationTimeline, setAnimationTimeline] = useState(null);

  useEffect(() => {
    if (!animationTimeline && topRef && bottomRef) {
      const fromRef = showBottom ? topRef : bottomRef;
      const toRef = showBottom ? bottomRef : topRef;
      setAnimationTimeline(
        new TimelineLite({ paused: true })
          .to(toRef, 1, { rotationX: -360, scale: 0, display: 'none' })
          .from(fromRef, 1, { rotationX: 360, scale: 0, display: 'none' })
      );
    }
  }, [topRef, bottomRef]);

  useEffect(() => {
    if (animationTimeline && previousShowBottom !== showBottom) {
      animationTimeline.play();
    }
    setPreviousShowBottom(showBottom);
  }, [showBottom]);

  return (
    <Container ref={setRef}>
      <SideContainer show={!showBottom} ref={setTopRef}>
        {topSide}
      </SideContainer>
      <SideContainer show={showBottom} ref={setBottomRef}>
        {bottomSide}
      </SideContainer>
    </Container>
  );
};

export default View;
