import React, { useContext } from 'react';
import { PageSubTitle } from '../../../styled';
import GameThemeContext from '../../../../contexts/GameThemeContext';

const View = ({selectedMove, title, loser}) => {

  const theme = useContext(GameThemeContext);
  const Component = theme.characters.selectMoveMapping[selectedMove];

  return (
      <React.Fragment>
          <PageSubTitle>{ title }</PageSubTitle>
          <Component selected={ true } loser={ loser }/>
      </React.Fragment>
  )
}

export default View;
