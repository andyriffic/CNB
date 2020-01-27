import React from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { PlayersProvider } from '../../contexts/PlayersProvider';
import { FullPageScreenLayout } from '../../components/layouts/FullPageScreenLayout';
import { GameSettingsDrawer } from '../../../game-settings';
import { MainHeading } from '../../components/Heading';
import { fadeInRightAnimation } from '../../components/animations';
import { useGameHistory } from '../../hooks/useGameHistory';
import moment from 'moment';
import { PlayerResult } from './PlayerResult';
import { GameResult } from './GameResult';

const Container = styled.div`
  width: 790px;
  margin: 0 auto 50px auto;
`;

const ResultContainer = styled.div``;

const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GamePlayerContainer = styled.div``;

const GameHistoryContainer = styled.div`
  flex: 1;
`;

export default ({ navigate }: RouteComponentProps) => {
  const [gameHistory] = useGameHistory();

  return (
    <PlayersProvider>
      <FullPageScreenLayout title="" alignTop={true} scrollable={true}>
        <GameSettingsDrawer />
        <Container>
          <MainHeading>Game History</MainHeading>
          <div>
            {gameHistory &&
              gameHistory.map(gameHistoryGroup => (
                <ResultContainer key={gameHistoryGroup.matchupId}>
                  <div>{moment(gameHistoryGroup.date).calendar()}</div>
                  <GameContainer className="margins-off">
                    <GamePlayerContainer>
                      <PlayerResult playerName={gameHistoryGroup.player1} />
                    </GamePlayerContainer>
                    <GameHistoryContainer>
                      {gameHistoryGroup.games.map(gameHistoryRecord => (
                        <GameResult
                          key={gameHistoryRecord.date.toString()}
                          history={gameHistoryRecord}
                        />
                      ))}
                    </GameHistoryContainer>
                    <GamePlayerContainer>
                      <PlayerResult
                        playerName={gameHistoryGroup.player2}
                        onRight={true}
                      />
                    </GamePlayerContainer>
                  </GameContainer>
                </ResultContainer>
              ))}
          </div>
        </Container>
      </FullPageScreenLayout>
    </PlayersProvider>
  );
};
