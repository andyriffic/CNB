import React from 'react';
import styled from 'styled-components';
import { SOCKETS_ENDPOINT } from '../../../environment';
import { rotateAnimation } from '../../../uplift/components/animations';
import vortexImage from '../../screens/snakes-and-ladders/assets/vortex.png';

const Container = styled.div`
  width: 50%;
  height: 50%;
`;

const ZodiacImage = styled.img`
  width: 100%;
  height: 100%;
`;

type Props = {
  tags: string[];
};

export const ZodiacSign = ({ tags }: Props) => {
  const zodiacTag = tags.find(t => t.startsWith('chinese_zodiac:'));
  if (!zodiacTag) {
    return null;
  }

  const zodiacSign = zodiacTag.split('chinese_zodiac:')[1];

  return (
    <Container>
      <ZodiacImage
        src={`${SOCKETS_ENDPOINT}/zodiac/disc/${zodiacSign}.png`}
        alt={zodiacSign}
      />
    </Container>
  );
};
