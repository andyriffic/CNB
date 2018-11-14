/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import { Button, DesktopPageHeader, PageFooterContainer } from '../styled';

const View = () => {
  const serverMessages = useContext(ServerMessagesContext);

  return (
    <React.Fragment>
      <DesktopPageHeader>Are you sure?</DesktopPageHeader>
      <PageFooterContainer>
        <Button onClick={ serverMessages.resetGame }>Reset Game</Button>
      </PageFooterContainer>
    </React.Fragment>
  )
};

export default View;
