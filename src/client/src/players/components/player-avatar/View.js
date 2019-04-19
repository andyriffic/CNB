/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  width: 25vmin;
  height: 40vmin;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const View = ({ avatar: { name, imageName } }) => {
  if (!imageName) return null;
  return (
    <Container>
      <img src={`./avatars/${imageName}.png`} alt={`${imageName} image`} />
    </Container>
  );
};

export default View;
