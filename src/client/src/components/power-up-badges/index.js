import React from 'react';
import Switch from '../switch';
import BaseBadge from './BaseBadge';

const View = ({ type, bigText, count }) => {
  return (
    <Switch>
      <BaseBadge
        showIf={type === 'HIDDEN'}
        bigText={bigText}
        text="✨"
        backgroundColor="#000000"
        textColor="#cccccc"
        count={count}
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
        count={count}
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
        count={count}
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
        count={count}
      />
      <BaseBadge
        showIf={type === 'BANNER'}
        bigText={bigText}
        text={
          <React.Fragment>
            PowerUps
            <br />
            beta*
          </React.Fragment>
        }
        backgroundColor="#0a9323"
        count={count}
      />
    </Switch>
  );
};

export default View;
