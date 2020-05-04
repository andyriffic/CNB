import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../../../screens/styled';
import { MatchupContext } from '../../../contexts/MatchupProvider';
import { MoveSummary } from './MoveSummary';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { GameThemeContext } from '../../../contexts/ThemeProvider';
import { SOCKETS_ENDPOINT } from '../../../../environment';
import { Player } from '../../../contexts/PlayersProvider';
import { shuffle } from '../../../../utils/suffleArray';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { getPlayerPowerups } from '../../../utils/player';
import { PowerupBadge } from '../../../components/PowerupBadge';
import { Heading } from '../../../../components/form/radio-select/styles';
import { PowerupSelector } from './PowerupSelector';
import { isFeatureEnabled } from '../../../../featureToggle';

const powerupsFeatureEnabled = isFeatureEnabled('powerups');

const MoveContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Move = styled.button<{ selected?: boolean }>`
  flex-basis: 25vw;
  margin: 0 5px 5px;
  border: 2px solid
    ${props =>
      props.selected
        ? props.theme.featureBackgroundColor
        : props.theme.primaryTextColor};
  color: white;
  background-color: ${props =>
    props.selected ? props.theme.featureBackgroundColor : 'transparent'};
  padding: 10px;
  font-size: 1.8rem;
  cursor: pointer;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`;

type MakeMoveProps = {
  matchupId: string;
  teamId: string;
  player: Player;
};

export const SelectMove = ({ matchupId, teamId, player }: MakeMoveProps) => {
  const {
    theme: { moves: themedMoves },
  } = useContext(GameThemeContext);
  const { makeMove, currentMatchup } = useContext(MatchupContext);
  const [selectedMoveId, setSelectedMoveId] = useState<string>();
  const [selectedPowerupName, setSelectedPowerupName] = useState('NONE');
  const [moveMade, setMoveMade] = useState(false);
  const [randomMoveOrder, setRandomMoveOrder] = useState<string[]>();

  useEffect(() => {
    if (themedMoves && !randomMoveOrder) {
      setRandomMoveOrder(shuffle(Object.keys(themedMoves)));
    }
  }, [themedMoves]);

  if (!currentMatchup) {
    return <LoadingSpinner text="Checking current game..." />;
  }

  if (currentMatchup && currentMatchup.gameInProgress) {
    const teamIndex = currentMatchup.teams.findIndex(t => t.id === teamId);
    if (
      teamIndex > -1 &&
      currentMatchup.gameInProgress.moves[teamIndex].moved
    ) {
      return (
        <MoveSummary move={currentMatchup.gameInProgress.moves[teamIndex]} />
      );
    }
  }

  return (
    <div>
      {powerupsFeatureEnabled && (
        <>
          <Heading>Select your powerup</Heading>
          <div className="margins-off">
            <PowerupSelector
              availablePowerups={getPlayerPowerups(player.tags)}
              selectedPowerupName={selectedPowerupName}
              onPowerupSelected={powerupName =>
                setSelectedPowerupName(powerupName)
              }
            />
          </div>
        </>
      )}
      <div>
        <Heading>Make your move</Heading>
        <MoveContainer className="margins-off" style={{ marginBottom: '20px' }}>
          {randomMoveOrder &&
            randomMoveOrder.map(moveId => (
              <Move
                key={moveId}
                selected={selectedMoveId === moveId}
                onClick={() => !moveMade && setSelectedMoveId(moveId)}
              >
                <img
                  src={`${SOCKETS_ENDPOINT}${themedMoves[moveId].imageUrl}`}
                  style={{ width: '100%', height: '100%' }}
                />
              </Move>
            ))}
        </MoveContainer>
        <PrimaryButton
          type="button"
          disabled={!selectedMoveId}
          className={!!selectedMoveId && !moveMade ? 'radioactive' : ''}
          style={{ display: 'block', width: '100%' }}
          onClick={() => {
            !moveMade &&
              selectedMoveId &&
              makeMove(matchupId, teamId, {
                playerId: player.id,
                moveId: selectedMoveId,
                powerUpId: selectedPowerupName,
              });
            setMoveMade(true);
          }}
        >
          Select
        </PrimaryButton>
      </div>
    </div>
  );
};
