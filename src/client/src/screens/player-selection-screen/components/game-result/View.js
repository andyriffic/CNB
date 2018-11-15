import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import Switch from '../../../../components/switch';
import Winner from '../outcome-winner';
import Loser from '../outcome-loser';
import Draw from '../outcome-draw';
import WaitingIcon from '../../../../components/icons/loading';

const gameIsDraw = (gameState) => gameState.result.draw;
const playerWins = (gameState, player) => !gameIsDraw(gameState) && gameState.result.winner === player;
const playerLoses = (gameState, player) => !gameIsDraw(gameState) && gameState.result.winner !== player;


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FadeInContainer = styled.div`
  opacity:0;
  animation: ${fadeIn} 2s 1 forwards;
  width: 100%;
`

const View = ({gameState, playerState}) => {
    const [isWaiting, setIsWaiting] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsWaiting(false);
      }, 7000)
    }, []);

    return (
        <React.Fragment>
          {
            isWaiting ?
            (
              <React.Fragment>
                <WaitingIcon animationDelay={0} />
                <h3>Running game 跑步比賽</h3>
              </React.Fragment>
            ) : (
              <FadeInContainer>
                <Switch>
                  <Draw
                    showIf={ gameIsDraw(gameState) }
                    selectedMove={ playerState.player.move }/>
                  <Loser
                    showIf={ playerLoses(gameState, playerState.slot) }
                    selectedMove={ playerState.player.move }/>
                  <Winner
                    showIf={ playerWins(gameState, playerState.slot) }
                    selectedMove={ playerState.player.move }/>
                </Switch>
              </FadeInContainer>
            )
          }
        </React.Fragment>
    )
}

export default View;
