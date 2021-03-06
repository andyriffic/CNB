import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
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
import { shakeAnimationLeft } from '../../../components/animations';
import bombBackground from './bomb-1.gif';

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

const MoveContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Move = styled.button<{ selected?: boolean }>`
  flex-basis: 25vw;
  margin: 0 5px 5px;
  border: 5px solid ${props => (props.selected ? 'red' : 'transparent')};
  border-radius: 5px;
  color: white;
  /* background-color: transparent; */
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

  if (!currentMatchup) {
    return <LoadingSpinner text="Checking current game..." />;
  }

  const teamIndex = currentMatchup.teams.findIndex(t => t.id === teamId);
  const holdingBomb =
    !!currentMatchup.gameInProgress &&
    currentMatchup.gameInProgress.attributes.playerIndexHoldingTimebomb ===
      teamIndex;

  const bombIntensity =
    (currentMatchup.gameInProgress &&
      parseInt(currentMatchup.gameInProgress.attributes.gameCount)) ||
    1;

  if (currentMatchup && currentMatchup.gameInProgress) {
    if (
      teamIndex > -1 &&
      currentMatchup.gameInProgress.moves[teamIndex].moved
    ) {
      return (
        <JigglyBombIndicator
          holdingBomb={holdingBomb}
          intensity={bombIntensity}
        >
          <MoveSummary move={currentMatchup.gameInProgress.moves[teamIndex]} />
        </JigglyBombIndicator>
      );
    }
  }

  return (
    <JigglyBombIndicator holdingBomb={holdingBomb} intensity={bombIntensity}>
      <Heading>Select your powerup</Heading>
      <div className="margins-off">
        <PowerupSelector
          availablePowerups={getPlayerPowerups(player.tags)}
          selectedPowerupName={selectedPowerupName}
          onPowerupSelected={powerupName => setSelectedPowerupName(powerupName)}
        />
      </div>
      <div>
        <Heading>Make your move</Heading>
        <MoveContainer className="margins-off" style={{ marginBottom: '20px' }}>
          {themedMoves &&
            Object.keys(themedMoves).map(moveId => (
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
          Play!
        </PrimaryButton>
      </div>
    </JigglyBombIndicator>
  );
};
