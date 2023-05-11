import { useMemo } from 'react';
import {
  getPlayerIntegerAttributeValue,
  isPlayersBirthday,
  isPriorityPlayer,
} from '../../../../../uplift/utils/player';
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
    //Birthday players first

    const playersWithBirthdays = joinedPlayers.filter(isPlayersBirthday);
    if (playersWithBirthdays.length > 0) {
      return selectRandomOneOf(playersWithBirthdays);
    }

    const priorityPlayers = joinedPlayers.filter(isPriorityPlayer);
    if (priorityPlayers.length > 0) {
      return selectRandomOneOf(priorityPlayers);
    }

    // const lowestPacSquare = Math.min(
    //   ...joinedPlayers
    //     .filter(
    //       p => getPlayerIntegerAttributeValue(p.tags, 'rt_finish', 0) === 0
    //     )
    //     .map(p => getPlayerIntegerAttributeValue(p.tags, 'rt_section', 0))
    // );

    // const lowestRaceTrackPlayers = joinedPlayers.filter(
    //   p =>
    //     getPlayerIntegerAttributeValue(p.tags, 'rt_section', 0) ===
    //     lowestPacSquare
    // );

    // const everyoneExceptCastleDefender = joinedPlayers.filter(
    //   p => !p.tags.includes('castle_defender')
    // );

    const lowestPacSquare = Math.min(
      ...joinedPlayers.map(p =>
        getPlayerIntegerAttributeValue(p.tags, 'pac_square', 0)
      )
    );

    const lowestPacPlayers = joinedPlayers.filter(
      p =>
        getPlayerIntegerAttributeValue(p.tags, 'pac_square', 0) ===
        lowestPacSquare
    );

    // const lowestSnakesSquare = Math.min(
    //   ...joinedPlayers.map(p =>
    //     getPlayerIntegerAttributeValue(p.tags, 'sl_cell', 0)
    //   )
    // );

    // const lowestPlayers = joinedPlayers.filter(
    //   p =>
    //     getPlayerIntegerAttributeValue(p.tags, 'sl_cell', 0) ===
    //     lowestSnakesSquare
    // );

    return selectRandomOneOf(lowestPacPlayers);
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
