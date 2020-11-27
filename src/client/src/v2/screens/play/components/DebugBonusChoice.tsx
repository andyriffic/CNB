import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MoveSummary } from './MoveSummary';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import bombBackground from './bomb-1.gif';
import { shakeAnimationLeft } from '../../../../uplift/components/animations';
import { Player } from '../../../providers/PlayersProvider';
import { useMoveThemeProvider } from '../../../providers/MoveThemeProvider';
import { useMatchupProvider } from '../../../providers/MatchupProvider';
import { Heading } from '../../../../components/form/radio-select/styles';
import { PowerupSelector } from './PowerupSelector';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { getPlayerPowerups } from '../../../../uplift/utils/player';
import { Button } from '../../../components/ui/buttons';
import { useThemeComponents } from '../../../providers/hooks/useThemeComponents';
import { MoveKeys } from '../../../themes';
import {
  usePlayerChoiceForPlayer,
  usePlayerChoiceProvider,
} from '../../../providers/PlayerChoiceProvider';

const JigglyBombIndicator = styled.div<{
  holdingBomb: boolean;
  intensity: number;
}>`
  background-color: transparent;
  transition: background-color 2s ease-in-out;
  ${props =>
    props.holdingBomb &&
    css`
      background: transparent url(${bombBackground}) no-repeat center center;
      animation: ${shakeAnimationLeft} ${5 / props.intensity}s ease-in-out
        infinite;
    `}
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

type Props = {
  playerId: string;
};

export const DebugBonusChoice = ({ playerId }: Props) => {
  const { createChoice } = usePlayerChoiceProvider();

  return (
    <button
      onClick={() => {
        createChoice({
          playerId,
          choices: [
            { id: 'A', label: 'Option 1' },
            { id: 'B', label: 'Option 2' },
            { id: 'C', label: 'Option 3' },
          ],
        });
      }}
    >
      Create choice for {playerId}
    </button>
  );
};
