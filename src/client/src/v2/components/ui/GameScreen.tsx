import React from 'react';
import styled, { css } from 'styled-components';
import { rainbowAnimation } from '../../../uplift/components/animations';
import { GameSettings } from '../GameSettings';

export const featureFontFamily = "'Alfa Slab One', cursive";

const FullPage = styled.div<{ powerMode: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: ${({ theme }) => theme.color.text02};
  background-color: ${({ theme }) => theme.color.background02};
  background-image: ${({ theme }) =>
    `linear-gradient(${theme.color.background01}, ${theme.color.background02})`};
  ${({ powerMode }) =>
    powerMode &&
    css`
      background: linear-gradient(
        124deg,
        #ff2400,
        #e81d1d,
        #e8b71d,
        #e3e81d,
        #1de840,
        #1ddde8,
        #2b1de8,
        #dd00f3,
        #dd00f3
      );
      background-size: 1800% 1800%;
      animation: ${rainbowAnimation} 3s infinite;
    `}
`;

const Body = styled.div<{
  scrollable: boolean;
}>`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: ${props => (props.scrollable ? 'scroll' : 'hidden')};
`;

const BodyContent = styled.section<{ widthPercent: number }>`
  width: ${({ widthPercent }) => `${widthPercent}%`};
`;

type FullPageScreenLayoutProps = {
  children: React.ReactNode | React.ReactNodeArray;
  scrollable?: boolean;
  showGameSettings?: boolean;
  powerMode?: boolean;
  widthPercent?: number;
};

export const GameScreen = ({
  children,
  scrollable = true,
  showGameSettings = true,
  powerMode = false,
  widthPercent = 75,
}: FullPageScreenLayoutProps) => {
  return (
    <FullPage className="margins-off" powerMode={powerMode}>
      {showGameSettings && <GameSettings />}
      <Body scrollable={scrollable} className="margins-off">
        <BodyContent widthPercent={widthPercent}>{children}</BodyContent>
      </Body>
    </FullPage>
  );
};
