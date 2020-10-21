import React from 'react';
import styled from 'styled-components';
import { IS_PRODUCTION } from '../../../environment';
import { GameSettings } from '../GameSettings';
import { ThemedUi } from './Theme';

export const featureFontFamily = "'Alfa Slab One', cursive";

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: ${({ theme }) => theme.color.text02};
  background-color: ${({ theme }) => theme.color.background02};
  background-image: ${({ theme }) =>
    `linear-gradient(${theme.color.background01}, ${theme.color.background02})`};
`;

const Body = styled.div<{
  scrollable: boolean;
}>`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow: ${props => (props.scrollable ? 'scroll' : 'hidden')};
`;

const BodyContent = styled.section`
  width: 75%;
`;

type FullPageScreenLayoutProps = {
  children: React.ReactNode | React.ReactNodeArray;
  scrollable?: boolean;
  showGameSettings?: boolean;
};

export const GameScreen = ({
  children,
  scrollable = true,
  showGameSettings = true,
}: FullPageScreenLayoutProps) => {
  return (
    <ThemedUi>
      <FullPage className="margins-off">
        {showGameSettings && <GameSettings />}
        <Body scrollable={scrollable} className="margins-off">
          <BodyContent>{children}</BodyContent>
        </Body>
      </FullPage>
    </ThemedUi>
  );
};
