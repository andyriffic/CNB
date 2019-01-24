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
  height: 22vmin;
  width: 22vmin;
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
    <Container>
      <Title>
        <TranslatedPlayerName playerName={name} />
      </Title>
      {moved ? (
        <SelectionMade />
      ) : (
        <NoSelection animationDelay={animationDelay} />
      )}
    </Container>
  );
};

export default View;
