import React, { useEffect, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { SoundService } from '../../../contexts/types';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import { SOUND_KEYS } from '../../../../sounds/SoundService';
import {
  pulseAnimation,
  shakeAnimationLeft,
  bounceInAnimation,
} from '../../../components/animations';
import butterflyImage from './butterfly.gif';
import { usePlayer } from '../../play/usePlayer';
import { DynamicUpdatingPoints } from '../../../components/dynamic-updating-points';
import { getPlayerSnakesAndLaddersMoves } from '../../../utils/player';

const Container = styled.div`
  font-size: 1.3rem;
  background-color: #5dade2;
  border-radius: 8px;
  padding: 8px;
  color: #1b4f72;
  text-transform: uppercase;
`;

const ContainerBadge = styled.div``;

type Props = {
  playerId: string | null;
};

export const PlayerSnakesAndLaddersMoves = ({ playerId }: Props) => {
  const player = usePlayer(playerId);

  return (
    <Container>
      {player && (
        <div className="margins-off">
          <div
            style={{
              fontSize: '0.6rem',
            }}
          >
            Moves:
          </div>
          <div>
            <DynamicUpdatingPoints
              value={getPlayerSnakesAndLaddersMoves(player.tags)}
              showPointDiff={true}
            />
          </div>
        </div>
      )}
    </Container>
  );
};
