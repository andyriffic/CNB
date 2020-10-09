import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid red;
  width: 20px;
  height: 20px;
`;

type Props = {
  tags: string[];
};

export const PlayerBadges = ({ tags }: Props) => {
  return <Container />;
};
