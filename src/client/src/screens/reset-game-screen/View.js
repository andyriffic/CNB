/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import { Button, PageFooterContainer, Page, PageHeader, PageBody, PageSubTitle } from '../styled';

const View = () => {
  const serverMessages = useContext(ServerMessagesContext);

  return (
    <Page>
      <PageHeader>Reset Game 重置游戏</PageHeader>
      <PageBody column={ true }>
        <PageSubTitle>Are you sure?</PageSubTitle>
        <PageFooterContainer>
          <Button onClick={ serverMessages.resetGame }>Reset Game</Button>
        </PageFooterContainer>
      </PageBody>
    </Page>
  )
};

export default View;
