import React from "react";
import styled from "styled-components";

const StyledFullPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const StyledHeader = styled.header`
  background-color: goldenrod;
  height: 10vh;
`;

const StyledPageHeading = styled.h1`
  margin: 0;
  padding: 0;
`;

const StyledBodyWrapper = styled.div`
  background-color: steelblue;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const StyledFooter = styled.footer`
  background-color: darkred;
  height: 10vh;
`;

const StyledBody = styled.section``;

export const FullPage = ({ pageTitle, bodyComponent }) => {
  return (
    <StyledFullPage>
      <StyledHeader>
        <StyledPageHeading>{pageTitle}</StyledPageHeading>
      </StyledHeader>
      <StyledBodyWrapper>
        <StyledBody>{bodyComponent}</StyledBody>
      </StyledBodyWrapper>
      <StyledFooter />
    </StyledFullPage>
  );
};
