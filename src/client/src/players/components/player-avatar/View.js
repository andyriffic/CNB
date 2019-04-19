/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const View = ({ avatar }) => {
  if (!(avatar && avatar.imageName)) return null;
  return (
    <Container>
      <img
        src={`./avatars/${avatar.imageName}.png`}
        alt={`${avatar.imageName} image`}
      />
    </Container>
  );
};

export default View;
