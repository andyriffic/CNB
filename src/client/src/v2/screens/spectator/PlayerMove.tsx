import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 5vw;
  height: 5vw;
  background-color: red;
`;

type Props = {
  moveId?: string;
};

export const PlayerMove = ({ moveId }: Props) => {
  return <Container></Container>;
};
