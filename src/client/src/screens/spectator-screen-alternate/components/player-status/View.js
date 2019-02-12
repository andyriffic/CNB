/* @flow */
import React from 'react';
import styled, { keyframes } from 'styled-components';

import SelectionMade from '../selection-made';
import NoSelection from '../no-selection';
import TranslatedPlayerName from '../../../../components/translated-player-name';

type Props = {
  moved: boolean,
  name: string,
};

const Rainbow = keyframes`
  0% { background-position:0% 82%; }
  50% { background-position:100% 19%; }
  100% { background-position:0% 82%; }
`;

// const Rainbow = keyframes`
//   0% { background-color: #ff2400; }
//   50% { background-color: #1de840; }
//   100% { background-color: #dd00f3; }
// `;

const Container = styled.div`
  background-color: #ffb758;
  border-radius: 20px;
  height: 24vmin;
  width: 24vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s linear;
  opacity: ${props => (props.moved ? '1' : '0.5')};
  &.moved {
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
    animation: ${Rainbow} 10s ease infinite;
    box-shadow: 0 0 100px #ffffff;
  }
`;

const Title = styled.div`
  margin: 0;
  padding: 5px 0;
  font-size: 1rem;
  color: #20253f;
  text-align: center;
`;

const View = ({ moved, name, animationDelay }: Props) => {
  return (
    <Container moved={moved} className={moved ? 'moved' : ''}>
      <Title>
        <TranslatedPlayerName playerName={name} />
      </Title>
      {/* {moved ? (
        <SelectionMade />
      ) : (
        <NoSelection animationDelay={animationDelay} />
      )} */}
    </Container>
  );
};

export default View;
