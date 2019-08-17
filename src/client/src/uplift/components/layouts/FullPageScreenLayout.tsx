import React, { useContext } from 'react';
import styled from 'styled-components';
import { IS_PRODUCTION } from '../../../environment';
import { ThemeStyle } from '../../contexts/ThemeProvider';

const FullPage = styled.div<{ theme: ThemeStyle }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: ${props => props.theme.primaryTextColor};
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.headerBackgroundColor};
`;

const PageHeading = styled.h1`
  margin: 0;
  padding: 0;
`;

const Body = styled.div<{ theme: ThemeStyle; alignTop: boolean }>`
  background-color: ${props => props.theme.pageBackgroundColor};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.alignTop ? 'flex-start' : 'center')};
  overflow: hidden;
`;

const Footer = styled.footer<{ theme: ThemeStyle }>`
  background-color: ${props => props.theme.pageBackgroundColor};
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
};

export const FullPageScreenLayout = ({
  title,
  alignTop,
  children,
}: FullPageScreenLayoutProps) => {
  return (
    <FullPage className="margins-off">
      {title && (
        <Header>
          <PageHeading>{title}</PageHeading>
        </Header>
      )}
      <Body alignTop={alignTop}>
        <BodyContent>{children}</BodyContent>
      </Body>
      <Footer>
        <FooterText>{IS_PRODUCTION ? 'Production' : 'Test'}</FooterText>
      </Footer>
    </FullPage>
  );
};
