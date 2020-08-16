import React from 'react';
import styled, { css } from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Keyframes } from 'react-spring/renderprops';
import { SOCKETS_ENDPOINT } from '../../../environment';
import { superSaiyanAnimation } from '../../../uplift/components/animations';

const PlayerImage = styled.img`
  width: 12vw;
  height: 18vw;
`;

const AnimatedFilter = styled(animated.div)<{ hue: number }>`
  /* filter: ${props => css`hue-rotate(${props.hue}turn)`}; */
    filter: hue-rotate(-0.75turn);

`;

// Will fade children in and out in a loop
const Thing = Keyframes.Spring(async (next: any) => {
  while (true)
    await next({
      opacity: 1,
      hue: -0.75,
      from: { opacity: 0, hue: -0.1 },
      reset: true,
    });
});

type Props = {
  imageUrl: string;
  poweredUp?: boolean;
};

export const GamePlayer = ({ imageUrl, poweredUp = false }: Props) => {
  // const props = useSpring({
  //   hue: 0,
  //   opacity: 1,
  //   from: { opacity: 1, hue: 0 },
  //   to: async (next: (arg0: object) => void) => {
  //     while (1) {
  //       await next({ opacity: 0, hue: poweredUp ? -0.75 : 0 });
  //       await next({ opacity: 1, hue: 0 });
  //     }
  //   },
  //   config: config.wobbly,
  //   delay: 500,
  // });

  return (
    // <animated.div
    //   style={{
    //     filter: props.hue.interpolate(h => `hue-rotate(${h}turn)`),
    //   }}
    // >
      <PlayerImage src={`${SOCKETS_ENDPOINT}/${imageUrl}`} />
    // </animated.div>
  );
};
