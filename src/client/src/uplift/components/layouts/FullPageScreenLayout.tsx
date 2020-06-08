import React, { useContext } from 'react';
import styled from 'styled-components';
import backgroundImage from './candy-background-01.jpg';
import { IS_PRODUCTION } from '../../../environment';

export const featureFontFamily = "'Bubblegum Sans', cursive";

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: #ff7682;
  background: transparent url(${backgroundImage}) no-repeat center center;
  background-size: cover;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7682;
  background-color: ${props => props.theme.headerBackgroundColor};
  transition: background-color 800ms ease-out;
`;

const PageHeading = styled.h1`
  margin: 0;
  padding: 0;
`;

const Body = styled.div<{
  alignTop: boolean;
  scrollable: boolean;
}>`
  transition: background-color 800ms ease-out;
  /* background-image: radial-gradient(#caa8e6, #a86fba); */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.alignTop ? 'flex-start' : 'center')};
  overflow: ${props => (props.scrollable ? 'scroll' : 'hidden')};
`;

const Footer = styled.footer`
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
  bodyStyle?: React.CSSProperties;
};

export const FullPageScreenLayout = ({
  title,
  alignTop,
  children,
  scrollable = false,
  bodyStyle = {},
}: FullPageScreenLayoutProps) => {
  return (
    <FullPage className="margins-off">
      {title && (
        <Header>
          <PageHeading>{title}</PageHeading>
        </Header>
      )}
      <Body
        style={bodyStyle}
        alignTop={alignTop}
        scrollable={scrollable}
        className="margins-off"
      >
        <BodyContent>{children}</BodyContent>
      </Body>
      {/* <Footer>
        <FooterText>{IS_PRODUCTION ? 'Production' : 'Test'}</FooterText>
      </Footer> */}
    </FullPage>
  );
};
