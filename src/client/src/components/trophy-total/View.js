import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const Trophy = styled.span`
  font-size: 30px;
`;

const generateTrophies = count => {
  const trophies = [];
  for (let i = 0; i < count; i++) {
    trophies.push(<Trophy key={i}>🏆</Trophy>);
  }

  return trophies;
};

const View = ({ total }) => {
  if (!total) {
    return <Container>&nbsp;</Container>;
  }

  return <Container>{generateTrophies(total)}</Container>;
};

export default View;
