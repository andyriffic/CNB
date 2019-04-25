/* @flow */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  text-shadow: 0 0 5px #000, 0 0 5px #000, 0 0 5px #000, 0 0 5px #000;
  color: white;
  font-size: 0.6rem;
  text-transform: uppercase;
  opacity: 0.7;
`;

type Props = {
  avatar: Object,
};

const View = ({ avatar }: Props) => {
  if (!(avatar && avatar.imageName)) return null;
  return (
    <Container>
      <img
        src={`./avatars/${avatar.imageName}.png`}
        alt={`${avatar.imageName} image`}
      />
      <Name>{avatar.name}</Name>
    </Container>
  );
};

export default View;
