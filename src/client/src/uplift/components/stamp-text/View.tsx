import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import grungeImage from './grunge.png';
import { stampAnimation } from '../animations';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SoundService } from '../../contexts/types';
import { SOUND_KEYS } from '../../../sounds/SoundService';

type StyleType = 'success' | 'average';

type Style = {
  color: string;
};

type StampTextProps = {
  text: string | React.ReactNode;
  show: boolean;
  style?: StyleType;
};

const styles: { [styleName: string]: Style } = {
  success: { color: '#0a9928' },
  average: { color: '#FFC105' },
};

const Container = styled.div``;

const Text = styled.p<{ style: Style }>`
  animation: ${stampAnimation} 500ms ease-in 1s 1 both;
  transform: rotate(12deg);
  font-size: 1.2rem;
  font-weight: 700;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  font-family: 'Courier';
  mask-image: url(${grungeImage});
  mask-size: 944px 604px;
  mix-blend-mode: multiply;

  color: ${props => props.style.color};
  border: 10px solid ${props => props.style.color};
  mask-position: 13rem 6rem;
  transform: rotate(-14deg);
`;

export default ({ text, show, style = 'success' }: StampTextProps) => {
  const soundService = useContext<SoundService>(GameSoundContext);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        soundService.play(SOUND_KEYS.STAMP);
      }, 800);
    }
  }, [show]);

  return (
    <Container className="margins-off">
      {show && <Text style={styles[style]}>{text}</Text>}
    </Container>
  );
};
