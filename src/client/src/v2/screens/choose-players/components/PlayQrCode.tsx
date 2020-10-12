import React from 'react';
import { animated, useSpring, config } from 'react-spring';
import styled from 'styled-components';
import playUrlQrCodeImage from '../assets/play-url-qr-code.png';

const Container = styled(animated.div)`
  position: absolute;
  left: 40%;
  background-color: #ffffff;
  padding: 5px;
  border-radius: 0 0 10px 10px;
`;

const Label = styled.div`
  background: #ffffff;
  color: ${({ theme }) => theme.color.text02};
  padding: 5px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  /* text-transform: uppercase; */
`;

const QrCodeImage = styled.img`
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
`;

export const PlayQrCode = () => {
  const springProps = useSpring({
    top: '0%',
    from: { top: '-100%' },
    config: config.default,
  });

  return (
    <Container style={springProps}>
      <Label>cnb.finx-rocks.com/play</Label>
      <QrCodeImage src={playUrlQrCodeImage} />
    </Container>
  );
};
