import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { Button } from '../../../screens/styled';
import { MatchupContext } from '../../contexts/MatchupProvider';
import { RandomPlayers } from './RandomPlayers';
import { GameSettingsDrawer } from '../../../game-settings';
import { SoundService } from '../../contexts/types';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { PrimaryButton } from '../../components/PrimaryButton';

const MatchupsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
`;

export default ({ navigate }: RouteComponentProps) => {
  const { addInstantMatchup } = useContext(MatchupContext);
  const soundService = useContext<SoundService>(GameSoundContext);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();

  useEffect(() => {
    soundService.load();
  }, []);

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true}>
        <GameSettingsDrawer />
        <MatchupsContainer className="margins-off">
          <RandomPlayers
            player1={player1}
            setPlayer1={setPlayer1}
            player2={player2}
            setPlayer2={setPlayer2}
          />
        </MatchupsContainer>
        {player1 && player2 && (
          <div style={{ textAlign: 'center' }}>
            <PrimaryButton
              onClick={() =>
                addInstantMatchup(
                  player1.id,
                  player2.id,
                  2,
                  'cnbop',
                  matchupId => {
                    navigate && navigate(`/matchup/${matchupId}`);
                  }
                )
              }
            >
              CNBOP
            </PrimaryButton>{' '}
            <PrimaryButton
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
              CNB
            </PrimaryButton>
          </div>
        )}
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
