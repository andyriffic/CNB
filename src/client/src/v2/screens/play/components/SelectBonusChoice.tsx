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
import { isPersistantFeatureEnabled } from '../../../../featureToggle';
import { SubHeading } from '../../../components/ui/Atoms';
import { ShowThemedVariant } from '../../../components/ShowThemedVariant';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.background02};
  z-index: 20;
`;

const ChoiceList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const ChoiceItem = styled.div`
  width: 30%;
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSize.large};

  button {
    font-size: inherit;
  }
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
      <SubHeading style={{ marginBottom: '30px' }}>
        Make your choice!
      </SubHeading>
      {isPersistantFeatureEnabled('cnb-debug') &&
        JSON.stringify(playersChoice.choices)}
      <ChoiceList>
        {playersChoice.choices.map(choice => (
          <ChoiceItem key={choice.id}>
            <Button onClick={() => selectChoice(playersChoice.id, choice.id)}>
              {playersChoice.maskLabels ? (
                <ShowThemedVariant placement="prizeIcon" />
              ) : (
                choice.label
              )}
            </Button>
          </ChoiceItem>
        ))}
      </ChoiceList>
    </Container>
  );
};
