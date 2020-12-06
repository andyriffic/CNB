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
  color: #000;
  padding: 5px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.small};
  /* text-transform: uppercase; */
`;

const CodeLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.extraSmall};
  text-transform: uppercase;
  color: #666;
  text-align: center;
`;

const Code = styled.div`
  font-size: 2rem;
  color: #000;
  text-align: center;
`;

type Props = {
  code: string;
};

export const QuickReferenceCode = ({ code }: Props) => {
  const springProps = useSpring({
    top: '0%',
    from: { top: '-100%' },
    config: config.default,
  });

  return (
    <Container style={springProps}>
      <Label>cnb.finx-rocks.com/play</Label>
      <CodeLabel>Game code</CodeLabel>
      <Code>{code}</Code>
    </Container>
  );
};
