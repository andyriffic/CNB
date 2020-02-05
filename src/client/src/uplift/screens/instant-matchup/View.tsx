import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider, Player } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { MatchupContext } from '../../contexts/MatchupProvider';
import { RandomPlayers } from './RandomPlayers';
import { GameSettingsDrawer } from '../../../game-settings';
import { SoundService } from '../../contexts/types';
import GameSoundContext from '../../../contexts/GameSoundContext';
import { PrimaryButton } from '../../components/PrimaryButton';
import { MainHeading } from '../../components/Heading';
import NewYearBackgroundImg from '../../../images/instant-matchup.jpg';

const MatchupsContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
`;

const NewYearBackground = styled.div`
  background-image: url(${NewYearBackgroundImg});
  background-size: 100% 100%;
  height: 100vh;
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
        <NewYearBackground>
          <GameSettingsDrawer />
          <MainHeading>Select your players</MainHeading>
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
                onClick={() => {
                  addInstantMatchup(
                    player1.id,
                    player2.id,
                    2,
                    'chinese-new-year-2020',
                    matchupId => {
                      navigate && navigate(`/matchup/${matchupId}`);
                    }
                  );
                }}
              >
                Play
              </PrimaryButton>
            </div>
          )}
        </NewYearBackground>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
