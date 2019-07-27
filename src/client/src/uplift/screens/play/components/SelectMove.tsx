import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../../screens/styled';
import { MatchupContext } from '../../../contexts/MatchupProvider';
import { MoveSummary } from './MoveSummary';
import { LoadingSpinner } from '../../../components/loading-spinner';
import { GameThemeContext } from '../../../contexts/ThemeProvider';

const MoveContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Move = styled.button<{ selected?: boolean }>`
  flex: 1;
  margin: 0 5px;
  border: 2px solid
    ${props =>
      props.selected
        ? props.theme.headerBackgroundColor
        : props.theme.textColor};
  color: white;
  background-color: ${props =>
    props.selected ? props.theme.headerBackgroundColor : props.theme.textColor};
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
  playerId: string;
};

export const SelectMove = ({ matchupId, teamId, playerId }: MakeMoveProps) => {
  const { themedMoves } = useContext(GameThemeContext);
  const { makeMove, currentMatchup } = useContext(MatchupContext);
  const [selectedMoveId, setSelectedMoveId] = useState<string>();
  const [moveMade, setMoveMade] = useState(false);

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
      <div>
        <h2>Make your move</h2>
        <MoveContainer className="margins-off" style={{ marginBottom: '20px' }}>
          {Object.keys(themedMoves).map(moveId => (
            <Move
              key={moveId}
              selected={selectedMoveId === moveId}
              onClick={() => !moveMade && setSelectedMoveId(moveId)}
            >
              {themedMoves[moveId].name}
              <br />
              {themedMoves[moveId].translation}
            </Move>
          ))}
        </MoveContainer>
        {!moveMade && (
          <Button
            type="button"
            disabled={!selectedMoveId}
            className={!!selectedMoveId && !moveMade ? 'radioactive' : ''}
            style={{ display: 'block', width: '100%' }}
            onClick={() => {
              !moveMade &&
                selectedMoveId &&
                makeMove(matchupId, teamId, {
                  playerId,
                  moveId: selectedMoveId,
                  powerUpId: 'NONE',
                });
              setMoveMade(true);
            }}
          >
            Play!
          </Button>
        )}
      </div>
    </div>
  );
};
