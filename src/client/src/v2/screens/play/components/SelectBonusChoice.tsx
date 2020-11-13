import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Player } from '../../../providers/PlayersProvider';
import { useMoveThemeProvider } from '../../../providers/MoveThemeProvider';
import { useMatchupProvider } from '../../../providers/MatchupProvider';
import { Heading } from '../../../../components/form/radio-select/styles';
import { PowerupSelector } from './PowerupSelector';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { getPlayerPowerups } from '../../../../uplift/utils/player';
import { Button } from '../../../components/ui/buttons';
import {
  usePlayerChoiceForPlayer,
  usePlayerChoiceProvider,
} from '../../../providers/PlayerChoiceProvider';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.background02};
`;

type Props = {
  playerId: string;
};

export const SelectBonusChoice = ({ playerId }: Props) => {
  const playersChoice = usePlayerChoiceForPlayer(playerId);
  const { selectChoice } = usePlayerChoiceProvider();

  if (!playersChoice) {
    return null;
  }

  console.log('Players choice', playersChoice);

  return (
    <Container>
      <h2>YOU HAVE A CHOICE!</h2>
      <div>
        {playersChoice.choices.map(choice => (
          <Button
            onClick={() => selectChoice(playersChoice.id, choice.id)}
            key={choice.id}
          >
            {choice.label}
          </Button>
        ))}
      </div>
    </Container>
  );
};
