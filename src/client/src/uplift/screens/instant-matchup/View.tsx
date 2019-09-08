import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { RandomPlayerSelector } from './components/RandomPlayerSelector';
import { Button } from '../../../screens/styled';
import { MatchupContext } from '../../contexts/MatchupProvider';

const MatchupsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
`;

const PlayerSide = styled.div`
  flex: 1;
  text-align: center;
  justify-content: center;
`;

export default ({ navigate }: RouteComponentProps) => {
  const { addInstantMatchup } = useContext(MatchupContext);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();
  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true}>
        <MatchupsContainer className="margins-off">
          <PlayerSide>
            <RandomPlayerSelector
              selectedPlayer={player1}
              setSelectedPlayer={setPlayer1}
            />
          </PlayerSide>

          <PlayerSide>
            <RandomPlayerSelector
              selectedPlayer={player2}
              setSelectedPlayer={setPlayer2}
            />
          </PlayerSide>
        </MatchupsContainer>
        {player1 && player2 && (
          <div style={{ textAlign: 'center' }}>
            <Button
              onClick={() =>
                addInstantMatchup(
                  player1.id,
                  player2.id,
                  2,
                  'cnb',
                  matchupId => {
                    navigate && navigate(`/matchup/${matchupId}`);
                  }
                )
              }
            >
              START
            </Button>
          </div>
        )}
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
