import React, { useContext } from 'react';
import styled from 'styled-components';
import GameThemeContext from '../../contexts/GameThemeContext';
import { IS_PRODUCTION } from '../../environment';
import { ConfettiProvider } from '../../uplift/contexts/ConfettiProvider';

const FullPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: ${props => props.textColor || 'black'};
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.headerBackgroundColor || '#9DADBC'};
`;

const PageHeading = styled.h1`
  margin: 0;
  padding: 0;
`;

const Body = styled.div`
  background-color: ${props => props.pageBackgroundColor || '#6ba2cc'};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.alignTop ? 'flex-start' : 'center')};
  overflow: hidden;
`;

const Footer = styled.footer`
  background-color: ${props => props.pageBackgroundColor || '#6ba2cc'};
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

const View = ({ pageTitle, alignTop, children }) => {
  const theme = useContext(GameThemeContext);

  return (
    <ConfettiProvider>
      <FullPage {...theme.style} className="margins-off">
        {pageTitle && (
          <Header {...theme.style}>
            <PageHeading>{pageTitle}</PageHeading>
          </Header>
        )}
        <Body {...theme.style} alignTop={alignTop}>
          <BodyContent>{children}</BodyContent>
        </Body>
        <Footer {...theme.style}>
          <FooterText>{IS_PRODUCTION ? 'Production' : 'Test'}</FooterText>
        </Footer>
      </FullPage>
    </ConfettiProvider>
  );
};

export default View;
