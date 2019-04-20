import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import pokeball from './pokeball.png';
import { CSSPlugin, TimelineLite, TweenLite } from 'gsap/all';

const plugins = [CSSPlugin]; // eslint-disable-line no-unused-vars
CSSPlugin.defaultTransformPerspective = 1000;

const Container = styled.div`
  position: relative;
  z-index: 2;
`;

const AvatarContainer = styled.div`
  width: 25vmin;
  height: 40vmin;
  z-index: 1;
`;

const MoveContainer = styled.div`
  position: absolute;
  width: 10vmin;
  height: 10vmin;
  opacity: 1;
  top: 10vmin;
  ${props => (props.isLeft ? 'right' : 'left')}: -10vmin;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
`;

const Spin = keyframes`
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`;

const PokeBall = styled.img`
  width: 100%;
  height: 100%;
  animation: 1000ms ${Spin} linear 6s;
`;

const CardFront = styled(CardFace)``;

const CardBack = styled(CardFace)``;

export const RevealAnimation = ({
  avatar,
  character,
  revealMove,
  isLeft = false,
}) => {
  const moveEl = useRef(null);
  const cardEl = useRef(null);
  const cardFrontEl = useRef(null);
  const cardBackEl = useRef(null);
  const avatarEl = useRef(null);
  const [moveAnimationTimeline, setMoveAnimationTimeline] = useState(null);

  useEffect(() => {
    if (!moveAnimationTimeline) {
      TweenLite.set(cardBackEl.current, { rotationY: -180 });
      setMoveAnimationTimeline(
        new TimelineLite()
          .from(moveEl.current, 1, {
            x: isLeft ? -200 : 200,
            opacity: 0,
          })
          .to(cardFrontEl.current, 1, { rotationY: 180 })
          .to(cardBackEl.current, 1, { rotationY: 0 }, 1)
          .to(cardEl.current, 0.5, { z: 50 }, 0)
          .to(cardEl.current, 0.5, { z: 0 }, 0.5)
          .delay(6)
      );
    }
  }, []);

  return (
    <Container>
      <AvatarContainer ref={avatarEl}>{avatar}</AvatarContainer>
      <MoveContainer ref={moveEl} isLeft={isLeft}>
        <CardContainer ref={cardEl}>
          <CardFront ref={cardFrontEl}>
            <PokeBall
              src={pokeball}
              alt="pokeball"
              style={{ width: '100%', height: '100%' }}
            />
          </CardFront>
          <CardBack ref={cardBackEl}>{character}</CardBack>
        </CardContainer>
      </MoveContainer>
    </Container>
  );
};
