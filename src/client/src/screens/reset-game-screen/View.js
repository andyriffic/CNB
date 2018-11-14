/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import { Button, PageFooterContainer, Page, PageHeader } from '../styled';

const View = () => {
  const serverMessages = useContext(ServerMessagesContext);

  return (
    <Page>
      <PageHeader>Are you sure?</PageHeader>
      <PageFooterContainer>
        <Button onClick={ serverMessages.resetGame }>Reset Game</Button>
      </PageFooterContainer>
    </Page>
  )
};

export default View;
