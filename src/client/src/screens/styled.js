import styled, { css } from 'styled-components';

const sizes = {
    largeScreen: 992,
};

const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label] / 16}em) {
        ${css(...args)}
      }
    `
    return acc
  }, {})
  

export const Page = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #6ba2cc;
    color: #20253F;
`;

export const PageHeader = styled.div`
    font-size: 2rem;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PageBody = styled.div`
  flex: 1;
  height: 90vh;
  overflow: hidden;
  padding: 1vh 1vw;
`;

export const PageSubTitle = styled.div`
  font-size: 1.5rem;
  padding: 1vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFECCC;
`;

export const CenteredContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px 0;
`;

export const PlayerSpectatorContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

export const PlayerSpectatorSection = styled.div`
`

export const PageFooterContainer = styled.div`
    margin-top: 100px;
    text-align: center;
`

export const Button = styled.button`
    border-radius: 50%;
    cursor: pointer;
    font-size: 50px;
    padding: 20px;
    font-family: inherit;
    background-color: #ffe758;
    color: #ff9303;

    &:hover {
        color: white;
        background-color: #f95568;
    }
`;