/* @flow */
import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import GameThemeContext from "../../../../contexts/GameThemeContext";

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

const pulse = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.2, 1.2, 1.2);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const SymbolTitle = styled.h5`
  text-align: center;
  margin: 0;
  padding: 0;
  opacity: 0.8;
`;

const PlayerSymbol = styled.div`
  flex-basis: 33%;
  padding: 0 20px;
  opacity: 0;
  animation: ${extremeFadeAndScale} 1s linear ${props => props.animationDelay}ms
    1 forwards;  
`;

const Symbol = styled.div`
  margin: 0 auto;
  width: 130px;
  height: 130px;
  animation: ${pulse} 2s linear ${props => props.pulseDelay}s infinite forwards;
`;

const View = () => {
  const theme = useContext(GameThemeContext);

  return (
    <Wrapper>
      {Object.keys(theme.characters.characterMapping).map((key, index) => {
        const Component = theme.characters.characterMapping[key];
        return (
          <PlayerSymbol key={key} animationDelay={index * 500} pulseDelay={(index * 1) + 3}>
            <SymbolTitle>{theme.characters.nameMapping[key]}</SymbolTitle>
            <Symbol pulseDelay={(index * 1) + 8}>
              <Component />
            </Symbol>
          </PlayerSymbol>
        );
      })}
    </Wrapper>
  );
};

export default View;
