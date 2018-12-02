/* @flow */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import PlayerResult from '../player-result';
import PlayerScore from '../player-score';
import Draw from '../draw';
import Winner from '../winner';
import Switch from '../../../../components/switch';
import { PlayerSpectatorContainer, PlayerSpectatorSection, Button, PageFooterContainer, Page, PageHeader, PageBody } from '../../../styled';
import GameSoundContext from '../../../../contexts/GameSoundContext';
import GameThemeContext from '../../../../contexts/GameThemeContext';

type Props = {
  result: Object,
  player1: Object,
  player2: Object,
  resetGame: () => void,
}

const BonusPointSection = styled.div``;
const BonusHeading = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const View = ( { result, player1, player2, resetGame}: Props ) => {

  const theme = useContext(GameThemeContext);
  const soundService = useContext(GameSoundContext);

  const winner = result.winner === 'player1' ? player1 : player2;
  const isPlayer1Winner = (result.winner === 'player1');
  const isPlayer2Winner = (result.winner === 'player2');

  useEffect(() => {
    const timeout = setTimeout(() => {
      soundService.playWinningSound(winner.move, result.draw);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, [])

  return (
    <Page { ...theme.style }>
      <PageHeader { ...theme.style }>Result 结果</PageHeader>
      <PageBody column={ true }>
        <PlayerSpectatorContainer>
          <PlayerSpectatorSection>
            <PlayerResult
              player={player1}
              isWinner={isPlayer1Winner}
              otherPlayersMove={player2.move}
              isDraw={result.draw}
              isLeft={true}
            />
            <PlayerScore playerKey={player1.name}/>
          </PlayerSpectatorSection>

          <PlayerSpectatorSection>
            <Switch>
              <Draw showIf={ result.draw } />
              <Winner
                showIf={ !result.draw }
                player1={ player1 }
                player2={ player2 }
                result={ result }
              />
            </Switch>
          </PlayerSpectatorSection>

          <PlayerSpectatorSection>
            <PlayerResult
              player={player2}
              isWinner={isPlayer2Winner}
              otherPlayersMove={player1.move}
              isDraw={result.draw}
              isLeft={false}
            />
            <PlayerScore playerKey={player2.name}/>
          </PlayerSpectatorSection>

        </PlayerSpectatorContainer>
        <BonusPointSection>
          <BonusHeading>BONUS 獎金</BonusHeading>
          <PlayerScore playerKey={'BONUS'}/>
        </BonusPointSection>
        <PageFooterContainer>
          <Button onClick={resetGame}>
            Play again <br/> 再玩一次
          </Button>
        </PageFooterContainer>
      </PageBody>
    </Page>
  );
}

export default View;
