import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { PlayerResult } from './PlayerResult';
import { GameResult } from './GameResult';
import { GameScreen } from '../../components/ui/GameScreen';
import { FeatureText } from '../../components/ui/Atoms';
import { useGameHistory } from '../../../uplift/hooks/useGameHistory';

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
  margin: 0 30px;
  font-size: 0.3rem;
`;

export default () => {
  const [gameHistory] = useGameHistory(7);

  return (
    <GameScreen scrollable={true}>
      <Container>
        <FeatureText>Game History</FeatureText>
        <div>
          {gameHistory &&
            gameHistory.map(gameHistoryGroup => (
              <ResultContainer key={gameHistoryGroup.matchupId}>
                <div>
                  {moment(gameHistoryGroup.date).calendar()} -{' '}
                  {gameHistoryGroup.gameMode}
                </div>
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
    </GameScreen>
  );
};
