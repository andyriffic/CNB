import React, { useContext, useEffect, useState, CSSProperties } from 'react';
import styled from 'styled-components';

import grungeImage from './grunge.png';
import { stampAnimation } from '../animations';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { SoundService } from '../../contexts/types';
import { SOUND_KEYS } from '../../../sounds/SoundService';

type StyleType = 'success' | 'average' | 'jungle';

type Style = {
  color: string;
};

type StampTextProps = {
  text: string | React.ReactNode;
  show: boolean;
  style?: StyleType;
};

const styles: { [styleName: string]: CSSProperties } = {
  success: { color: '#0a9928' },
  average: { color: '#FFC105' },
  jungle: { color: '#EAECEE', borderWidth: '4px', fontSize: '0.4rem' },
};

const Container = styled.div``;

const Text = styled.p<{ customStyle: CSSProperties }>`
  animation: ${stampAnimation} 500ms ease-in 1s 1 both;
  transform: rotate(12deg);
  font-size: 1.2rem;
  font-weight: 700;
  display: inline-block;
  padding: 0.25rem 1rem;
  text-transform: uppercase;
  font-family: 'Courier';
  text-align: center;
  mask-image: url(${grungeImage});
  mask-size: 944px 604px;
  mix-blend-mode: multiply;

  color: ${props => props.customStyle.color};
  border: 10px solid ${props => props.customStyle.color};
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
      {show && (
        <Text style={styles[style]} customStyle={styles[style]}>
          {text}
        </Text>
      )}
    </Container>
  );
};
