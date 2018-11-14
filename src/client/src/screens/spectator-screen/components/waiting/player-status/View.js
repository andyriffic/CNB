/* @flow */
import React from 'react';
import SelectionMade from '../selection-made';
import NoSelection from '../no-selection';

type Props = {
  moved: boolean,
  name: string,
}

const View = ( { moved, name }: Props ) => {
  return (
    <React.Fragment>
      {
        moved ? <SelectionMade /> : <NoSelection />
      }
      <div>{ name }</div>
    </React.Fragment>
  );
}

export default View;
