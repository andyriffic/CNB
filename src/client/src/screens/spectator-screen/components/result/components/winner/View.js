import React from 'react';
import styled, { keyframes } from 'styled-components';

const WinnerView = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  position: relative;
`;

const extremeFadeAndScale = keyframes`
    0% {
        opacity: 0;
        transform: scale(.5, .5);
    }
    60% {
        opacity: 1;
        transform: scale(1.3, 1.3);
    }
    100% {
        opacity: 1;
        transform: scale(1, 1);
    }
`;

const WinnerHeading = styled.h2`
  //opacity: 0;
  //animation: ${extremeFadeAndScale} 1s linear 4s 1 forwards;
  text-align: center;
  margin: 0;
`;

const TranslatedWinnerText = ({ winner }) => {
  if (winner === 'XIAN') {
    return (
      <React.Fragment>
        XIAN WINS! <br />
        西安勝
      </React.Fragment>
    );
  }

  if (winner === 'MELB') {
    return (
      <React.Fragment>
        MELB WINS! <br />
        墨爾本獲勝
      </React.Fragment>
    );
  }

  return null;
};

const View = ({ player1, player2, result, setContainerRef = () => {} }) => {
  const winner = result.winner === 'player1' ? player1 : player2;

  return (
    <WinnerView ref={setContainerRef}>
      {/* <ResultContainer>
        <WinnerAnimated>
          { theme.characters.nameMapping[winner.move] }
        </WinnerAnimated>
        <BeatsAnimated>beats 打败</BeatsAnimated>
        <LoserAnimated>
          { theme.characters.nameMapping[loser.move] }
        </LoserAnimated>
      </ResultContainer> */}
      <WinnerHeading>
        <TranslatedWinnerText winner={winner.name} />
      </WinnerHeading>
    </WinnerView>
  );
};

export default View;
