import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 5vw;
  height: 5vw;
  font-size: 3rem;
`;

type TimebombProps = {
  triggerFuse: boolean;
  triggerExplosion: boolean;
};

export const Timebomb = ({ triggerFuse, triggerExplosion }: TimebombProps) => {
  return (
    <Container>
      💣 {triggerFuse && '⏰'}
      {triggerExplosion && '💥'}
    </Container>
  );
};
