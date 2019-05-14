import React from 'react';
import { Button, PlayerSpectatorContainer } from '../../../styled';
import PageLayout from '../../../../components/page-layout/FullPage';

const View = ({ onReplayGame, onResetGame }) => {
  return (
    <PageLayout pageTitle="Replay game?">
      <PlayerSpectatorContainer>
        <Button onClick={onResetGame}>
          Start a new game
          <br />
          開始一個新遊戲
        </Button>
        <Button onClick={onReplayGame}>
          View last game
          <br />
          查看上一場比賽
        </Button>
      </PlayerSpectatorContainer>
    </PageLayout>
  );
};

export default View;
