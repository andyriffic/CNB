import styled, { css, keyframes } from 'styled-components';

const sizes = {
  largeScreen: 769,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const PageSubTitle = styled.div`
  font-size: 1.5rem;
  padding: 2vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffeccc;
`;

export const PlayerSpectatorContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const PlayerSpectatorSection = styled.div`
  padding: 0 2vw;
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const PageFooterContainer = styled.div`
  text-align: center;
  padding: 5vh 0;
`;

const radioactive = keyframes`
  0% { background-color: #749a02; box-shadow: 0 0 9px #333; }
  50% { background-color: #91bd09; box-shadow: 0 0 18px #91bd09; }
  100% { background-color: #749a02; box-shadow: 0 0 9px #333; }
`;

export const Button = styled.button`
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  padding: 3vh;
  font-family: inherit;
  background-color: #ffe758;
  color: #ff9303;
  transition: opacity 1s linear;

  &:hover {
    color: white;
    background-color: #f95568;
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }

  &.radioactive {
    animation: ${radioactive} 1s linear infinite;
    color: white;
  }
`;
