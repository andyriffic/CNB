import React, { useContext } from 'react';
import styled from 'styled-components';
import { IS_PRODUCTION } from '../../../environment';
import { ThemeStyle } from '../../contexts/ThemeProvider';
import xmasDecorationImage from './christmas-corner-border-7.png';
import santaImage from './santa-hello.gif';

const FullPage = styled.div<{ theme: ThemeStyle }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #f8b229;
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
  background-image: radial-gradient(#ff7878, #ff0000);
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

const XmasDecoration1 = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
`;

const XmasDecoration2 = styled.img`
  transform: scaleX(-1);
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
`;

const Santa = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
`;

type FullPageScreenLayoutProps = {
  title: string;
  alignTop: boolean;
  children: React.ReactNode | React.ReactNodeArray;
  scrollable?: boolean;
  showHolly?: boolean;
  showSanta?: boolean;
};

export const FullPageScreenLayout = ({
  title,
  alignTop,
  children,
  scrollable = false,
  showHolly = false,
  showSanta = false,
}: FullPageScreenLayoutProps) => {
  return (
    <FullPage className="margins-off">
      {showHolly && (
        <>
          <XmasDecoration1 src={xmasDecorationImage} />
          <XmasDecoration2 src={xmasDecorationImage} />
        </>
      )}
      {showSanta && <Santa src={santaImage} />}
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
