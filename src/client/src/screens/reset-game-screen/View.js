/* @flow */
// flow:disable no typedefs for useState, useEffect yet
import React, { useContext } from 'react';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import { Button, PageFooterContainer, PageSubTitle } from '../styled';
import PageLayout from '../../components/page-layout/FullPage';

const View = () => {
  const serverMessages = useContext(ServerMessagesContext);

  return (
    <PageLayout pageTitle="Reset Game 重置游戏">
      <PageSubTitle>Are you sure?</PageSubTitle>
      <PageFooterContainer>
        <Button onClick={serverMessages.resetGame}>Reset Game</Button>
      </PageFooterContainer>
    </PageLayout>
  );
};

export default View;
