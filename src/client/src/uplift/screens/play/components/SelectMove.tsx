import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../../../screens/styled';
import { MatchupContext } from '../../../contexts/MatchupProvider';

const MoveContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Move = styled.div<{ selected?: boolean }>`
  border: 1px solid
    ${props =>
      props.selected
        ? props.theme.headerBackgroundColor
        : props.theme.textColor};
  color: ${props =>
    props.selected ? props.theme.headerBackgroundColor : props.theme.textColor};
  padding: 10px;
  font-size: 1.8rem;
  cursor: pointer;
`;

type Move = {
  id: string;
  name: string;
};

type MakeMoveProps = {
  matchupId: string;
  teamId: string;
  playerId: string;
};

const moves: Move[] = [
  {
    id: 'A',
    name: 'Move A',
  },
  {
    id: 'B',
    name: 'Move B',
  },
  {
    id: 'C',
    name: 'Move C',
  },
];

export const SelectMove = ({ matchupId, teamId, playerId }: MakeMoveProps) => {
  const { makeMove } = useContext(MatchupContext);
  const [selectedMove, setSelectedMove] = useState<Move>();
  const [moveMade, setMoveMade] = useState(false);

  return (
    <div>
      <div>
        <h2>Make your move</h2>
        <MoveContainer className="margins-off" style={{ marginBottom: '20px' }}>
          {moves.map(move => (
            <Move
              key={move.id}
              selected={selectedMove && selectedMove.id === move.id}
              onClick={() => !moveMade && setSelectedMove(move)}
            >
              {move.name}
            </Move>
          ))}
        </MoveContainer>
        <Button
          type="button"
          disabled={!selectedMove}
          className={!!selectedMove && !moveMade ? 'radioactive' : ''}
          style={{ display: 'block', width: '100%' }}
          onClick={() => {
            !moveMade &&
              selectedMove &&
              makeMove(matchupId, teamId, {
                playerId,
                moveId: selectedMove.id,
                powerUpId: 'NONE',
              });
            setMoveMade(true);
          }}
        >
          {moveMade ? 'Watch result on the screen' : 'Play!'}
        </Button>
      </div>
    </div>
  );
};
