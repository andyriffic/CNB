import { useEffect, useMemo, useState } from 'react';
import { getPlayerIntegerAttributeValue } from '../../../../../uplift/utils/player';
import { selectRandomOneOf } from '../../../../../uplift/utils/random';
import { useMobLeaderboard } from '../../../../providers/MobLeaderboardProvider';
import { usePlayerChoiceProvider } from '../../../../providers/PlayerChoiceProvider';
import {
  Player,
  usePlayersProvider,
} from '../../../../providers/PlayersProvider';

type UseMobSelection = {
  joinedPlayers: Player[];
  sendInvites: () => void;
  selectMug: () => Player;
  cleanup: () => void;
};

export const MOB_JOINED_CHOICE_ID = 'join-mob';

export const useMobSelection = (): UseMobSelection => {
  const {
    allPlayerChoices,
    createChoice,
    deletePlayerChoice,
  } = usePlayerChoiceProvider();
  const { allPlayers } = usePlayersProvider();
  const { topMainPlayerStats } = useMobLeaderboard();

  const joinedPlayers = useMemo<Player[]>(() => {
    if (!allPlayerChoices) {
      return [];
    }
    const acceptedPlayersIds = Array.from(
      new Set(
        allPlayerChoices
          .filter(choice => choice.selectedChoiceId === MOB_JOINED_CHOICE_ID)
          .map(choice => choice.playerId)
      )
    );

    return acceptedPlayersIds.map(
      playerId => allPlayers.find(p => p.id === playerId)!
    );
  }, [allPlayerChoices]);

  const selectMug = (): Player => {
    const lowestRaceTrackSection = Math.min(
      ...joinedPlayers.map(p =>
        getPlayerIntegerAttributeValue(p.tags, 'rt_section', 0)
      )
    );

    const lowestRaceTrackPlayers = joinedPlayers.filter(
      p =>
        getPlayerIntegerAttributeValue(p.tags, 'rt_section', 0) ===
        lowestRaceTrackSection
    );

    return selectRandomOneOf(lowestRaceTrackPlayers);
  };

  const sendInvites = () => {
    allPlayers
      .filter(p => !p.tags.includes('retired'))
      .forEach(player => {
        createChoice({
          playerId: player.id,
          choices: [{ id: MOB_JOINED_CHOICE_ID, label: 'JOIN MOB' }],
        });
      });
  };

  const cleanup = () => {
    allPlayers.forEach(p => {
      deletePlayerChoice(p.id);
    });
  };

  return {
    joinedPlayers,
    sendInvites,
    selectMug,
    cleanup,
  };
};
