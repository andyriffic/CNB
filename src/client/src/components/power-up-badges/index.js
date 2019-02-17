import React from 'react';
import Switch from '../switch';

import BaseBadge from './BaseBadge';

const View = ({ type, bigText }) => {
  return (
    <Switch>
      <BaseBadge
        showIf={type === 'HIDDEN'}
        bigText={bigText}
        text="?"
        backgroundColor="#000000"
        textColor="#cccccc"
      />
      <BaseBadge
        showIf={type === 'DOUBLE'}
        bigText={bigText}
        text={
          <React.Fragment>
            Double
            <br />
            points
          </React.Fragment>
        }
        backgroundColor="#7e00df"
      />
    </Switch>
  );
};

export default View;
