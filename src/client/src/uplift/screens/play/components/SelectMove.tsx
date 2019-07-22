import React, { useState } from 'react';
import styled from 'styled-components';
import { Player, PlayersContext } from '../../../contexts/PlayersProvider';
import { LoadingSpinner } from '../../../components/loading-spinner';
import {
  MatchupContext,
  MatchupForPlayer,
  GAME_STATUS,
} from '../../../contexts/MatchupProvider';

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

export const SelectMove = ({ matchupId, teamId }: MakeMoveProps) => {
  const [selectedMove, setSelectedMove] = useState<Move>();

  return (
    <div>
      <div>
        <h2>Make your move</h2>
        <MoveContainer className="margins-off">
          {moves.map(move => (
            <Move
              key={move.id}
              selected={selectedMove && selectedMove.id === move.id}
              onClick={() => setSelectedMove(move)}
            >
              {move.name}
            </Move>
          ))}
        </MoveContainer>
      </div>
    </div>
  );
};
