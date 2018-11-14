/* @flow */
import React from 'react';
import styled from 'styled-components';

import SelectionMade from '../selection-made';
import NoSelection from '../no-selection';

type Props = {
  moved: boolean,
  name: string,
}

const PlayerStatusView = styled.div`
  border: 1px solid black;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const NameHeading = styled.div`
  align-self: center;
`

const View = ( { moved, name }: Props ) => {
  return (
    <PlayerStatusView>
      {
        moved ? <SelectionMade /> : <NoSelection />
      }
      <NameHeading>{ name }</NameHeading>
    </PlayerStatusView>
  );
}

export default View;
