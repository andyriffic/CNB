import React from 'react';
import { animated, useSpring, config } from 'react-spring';
import styled from 'styled-components';
import playUrlQrCodeImage from '../assets/play-url-qr-code.png';

const Container = styled(animated.div)`
  position: absolute;
  left: 45%;
`;

const QrCodeImage = styled.img`
  width: 100px;
  height: 100px;
`;

export const PlayQrCode = () => {
  const springProps = useSpring({
    top: 0,
    from: { top: -100 },
    config: config.gentle,
  });

  return (
    <Container style={springProps}>
      <QrCodeImage src={playUrlQrCodeImage} />
    </Container>
  );
};
