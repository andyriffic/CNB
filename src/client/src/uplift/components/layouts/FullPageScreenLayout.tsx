import React, { useContext } from 'react';
import styled from 'styled-components';
import { IS_PRODUCTION } from '../../../environment';
import { ThemeStyle } from '../../contexts/ThemeProvider';

const FullPage = styled.div<{ theme: ThemeStyle }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #e77120;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d1145;
  background-color: ${props => props.theme.headerBackgroundColor};
  transition: background-color 800ms ease-out;
`;

const PageHeading = styled.h1`
  margin: 0;
  padding: 0;
`;

const Body = styled.div<{
  theme: ThemeStyle;
  alignTop: boolean;
  scrollable: boolean;
}>`
  transition: background-color 800ms ease-out;
  background-image: radial-gradient(#969696, #1b1919);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.alignTop ? 'flex-start' : 'center')};
  overflow: ${props => (props.scrollable ? 'scroll' : 'hidden')};
`;

const Footer = styled.footer<{ theme: ThemeStyle }>`
  transition: background-color 800ms ease-out;
  background-color: #d9d6e2;
  color: white;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
`;

const FooterText = styled.p`
  opacity: 0.5;
`;

const BodyContent = styled.section``;

type FullPageScreenLayoutProps = {
  title: string;
  alignTop: boolean;
  children: React.ReactNode | React.ReactNodeArray;
  scrollable?: boolean;
};

export const FullPageScreenLayout = ({
  title,
  alignTop,
  children,
  scrollable = false,
}: FullPageScreenLayoutProps) => {
  return (
    <FullPage className="margins-off">
      {title && (
        <Header>
          <PageHeading>{title}</PageHeading>
        </Header>
      )}
      <Body alignTop={alignTop} scrollable={scrollable} className="margins-off">
        <BodyContent>{children}</BodyContent>
      </Body>
      {/* <Footer>
        <FooterText>{IS_PRODUCTION ? 'Production' : 'Test'}</FooterText>
      </Footer> */}
    </FullPage>
  );
};
