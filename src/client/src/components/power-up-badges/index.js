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
      <BaseBadge
        showIf={type === 'STEAL'}
        bigText={bigText}
        text={
          <React.Fragment>
            Points
            <br />
            stealer
          </React.Fragment>
        }
        backgroundColor="#e0a10f"
        textColor="#e00f8c"
      />
      <BaseBadge
        showIf={type === 'SWAP'}
        bigText={bigText}
        text={
          <React.Fragment>
            Points
            <br />
            swap
          </React.Fragment>
        }
        backgroundColor="#e0364d"
        textColor="#ccfffd"
      />
    </Switch>
  );
};

export default View;
