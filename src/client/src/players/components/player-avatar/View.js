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

const View = ({ username }) => {
  if (!username) return null;
  return (
    <Container>
      <img src={`./avatars/${username}.png`} alt={`${username} image`} />
    </Container>
  );
};

export default View;
