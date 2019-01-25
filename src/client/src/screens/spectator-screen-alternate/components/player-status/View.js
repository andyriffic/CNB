/* @flow */
import React from 'react';
import styled from 'styled-components';

import SelectionMade from '../selection-made';
import NoSelection from '../no-selection';
import TranslatedPlayerName from '../../../../components/translated-player-name';

type Props = {
  moved: boolean,
  name: string,
};

const Container = styled.div`
  background-color: #ffb758;
  border-radius: 20px;
  height: 24vmin;
  width: 24vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 1s linear;
  opacity: ${props => props.moved ? '1' : '0.5'};
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
    <Container moved={moved}>
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
