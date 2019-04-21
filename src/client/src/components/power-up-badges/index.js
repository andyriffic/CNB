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
            1.0
          </React.Fragment>
        }
        backgroundColor="#0a9323"
        count={count}
      />
      <BaseBadge
        showIf={type === 'TROPHY'}
        bigText={bigText}
        text={
          <React.Fragment>
            Trophy
            <br />
            Points
            <br />
            beta
          </React.Fragment>
        }
        backgroundColor="#b42c79"
        textColor="#79468c"
        textShadowColor="#fff"
        count={count}
      />
      <BaseBadge
        showIf={type === 'AVATAR'}
        bigText={bigText}
        text={
          <React.Fragment>
            Player
            <br />
            Avatars
            <br />
            beta
          </React.Fragment>
        }
        backgroundColor="#cad877"
        textColor="#1d5b00"
        textShadowColor="#040f00"
        count={count}
      />
    </Switch>
  );
};

export default View;
