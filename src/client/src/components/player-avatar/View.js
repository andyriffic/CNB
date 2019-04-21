/* @flow */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
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
    </Container>
  );
};

export default View;
