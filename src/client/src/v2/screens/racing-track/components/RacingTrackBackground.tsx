import React from 'react';
import styled from 'styled-components';
import { RacingTrack } from '../types';

const Container = styled.div<{ img: any }>`
  position: relative;
  border: 1px solid black;
  background-image: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-size: cover;
`;

type Props = {
  racingTrack: RacingTrack;
  children: React.ReactNodeArray | React.ReactNode;
};

export const RacingTrackBackground = ({
  racingTrack,
  children,
}: Props): JSX.Element => {
  return (
    <Container
      img={racingTrack.boardBackgroundImage}
      style={{
        width: `${racingTrack.widthPx}px`,
        height: `${racingTrack.heightPx}px`,
      }}
    >
      {children}
    </Container>
  );
};
