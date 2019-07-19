import React, { useContext, useState, useEffect } from 'react';

import useGetGameState from '../hooks/useGetGameState';
import usePlayerState from './hooks/usePlayerState';
import SelectMove from './components/select-move';
import SelectedMove from './components/selected-move';
import SelectPowerUp from './components/select-power-up';
import SelectAvatar from './components/select-avatar';
import GameResult from './components/game-result';
import ServerMessagesContext from '../../contexts/ServerMessagesContext';
import GameStateContext from '../../contexts/GameStateContext';
import Switch from '../../components/switch';
import PageLayout from '../../components/page-layout/FullPage';
import AwardedPowerUps from './components/awarded-power-ups';

import { safeGetTranslation } from '../../components/translated-player-name/View';
import PowerUpContext from '../../contexts/PowerUpContext';

const hasGameResult = gameState => !!(gameState && gameState.result);
const playerHasMoved = (gameState, playerState) =>
  playerState && playerState.player && playerState.player.moved;
const hasSelectedAvatar = (playerState, selectedAvatar) =>
  selectedAvatar ||
  (playerState && playerState.player && playerState.player.avatar);

const View = ({ playerKey }) => {
  const playerState = usePlayerState(playerKey);

  const [selectedPowerUp, setSelectedPowerUp] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(
    playerState && playerState.player && playerState.player.avatar
  );
  const serverMessages = useContext(ServerMessagesContext);
  const gameState = useContext(GameStateContext);
  const powerUpsState = useContext(PowerUpContext);

  useEffect(() => {
    if (playerState && !selectedPowerUp) {
      setSelectedPowerUp(playerState.player.powerUp);
    }
  }, [gameState]);

  useEffect(() => {
    if (playerState && !selectedAvatar) {
      setSelectedAvatar(playerState.player.avatar);
    }
  }, [gameState]);

  useGetGameState();

  const onSelection = move => {
    serverMessages.makeMove(
      playerState.slot,
      move,
      selectedPowerUp,
      selectedAvatar
    );
  };

  const onPowerUpSelected = powerUp => {
    setSelectedPowerUp(powerUp);
  };

  const onAvatarSelected = avatar => {
    console.log('SELECTED AVATAR', avatar);
    setSelectedAvatar(avatar);
  };

  const onAwardedPowerUpsClose = () => {
    powerUpsState.awardedPowerUpsSeen();
    window.location.reload(); // Hack this for now, can't be bothered syncing up powerups etc :)
  };

  if (!playerState) return null;

  return (
    <PageLayout
      pageTitle={safeGetTranslation(playerState.player.name)}
      alignTop
    >
      <Switch>
        <SelectAvatar
          showIf={!hasSelectedAvatar(playerState, selectedAvatar)}
          onAvatarSelected={onAvatarSelected}
          playerKey={playerKey}
        />
        <SelectPowerUp
          showIf={
            hasSelectedAvatar(playerState, selectedAvatar) && !selectedPowerUp
          }
          playerKey={playerKey}
          onPowerUpSelected={onPowerUpSelected}
        />
        <SelectMove
          showIf={
            selectedPowerUp &&
            !hasGameResult(gameState) &&
            !playerHasMoved(gameState, playerState)
          }
          onSelection={onSelection}
        />
        <SelectedMove
          showIf={
            !hasGameResult(gameState) && playerHasMoved(gameState, playerState)
          }
          title="You chose 你选择了"
          selectedMove={playerState.player.move}
          selectedPowerUp={selectedPowerUp}
          avatar={selectedAvatar}
        />
        <GameResult
          showIf={hasGameResult(gameState)}
          gameState={gameState}
          playerState={playerState}
        />
        <AwardedPowerUps
          showIf={powerUpsState.awarded}
          onClose={onAwardedPowerUpsClose}
          awardedPowerUp={powerUpsState.awardedPowerUps[playerKey]}
        />
      </Switch>
    </PageLayout>
  );
};

export default View;
