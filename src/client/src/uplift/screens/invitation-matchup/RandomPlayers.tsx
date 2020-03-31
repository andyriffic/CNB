import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RandomPlayerSelector } from './RandomPlayerSelector';
import { useFetchJson } from '../../hooks/useFetchJson';
import { GameHistory } from '../../types';
import { STATS_API_BASE_URL } from '../../../environment';
import { PlayersContext, Player } from '../../contexts/PlayersProvider';
import { getRandomPlayer } from './getRandomPlayer';
import {
  Invitation,
  useInvitationsProvider,
} from '../../contexts/InvitationsProvider';

const PlayersContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const PlayerSide = styled.div`
  flex: 1;
  text-align: center;
  justify-content: center;
`;

const InstructionText = styled.p`
  text-align: center;
`;

type RandomPlayerProps = {
  player1?: Player;
  setPlayer1: (player: Player) => void;
  player2?: Player;
  setPlayer2: (player: Player) => void;
  invitation?: Invitation;
};

export const RandomPlayers = ({
  player1,
  setPlayer1,
  player2,
  setPlayer2,
  invitation,
}: RandomPlayerProps) => {
  // const { allPlayers } = useContext(PlayersContext);
  console.log('PLAYER SELECTOR');

  const { allPlayers, loadingPlayers } = useContext(PlayersContext);
  const [discardedPlayers, setDiscardedPlayers] = useState<Player[]>([]);
  const invitationsContext = useInvitationsProvider();

  const [loadingGameHistory, gameHistory] = useFetchJson<GameHistory>(
    `${STATS_API_BASE_URL}/game-result-history.json`
  );

  useEffect(() => {
    if (
      allPlayers.length &&
      gameHistory &&
      !loadingGameHistory &&
      !player1 &&
      !player2
    ) {
      const randomPlayer1 = getRandomPlayer(
        allPlayers,
        gameHistory.result,
        discardedPlayers
      );
      const randomPlayer2 = getRandomPlayer(allPlayers, gameHistory.result, [
        ...discardedPlayers,
        randomPlayer1,
      ]);
      setPlayer1(randomPlayer1);
      setPlayer2(randomPlayer2);

      setDiscardedPlayers([...discardedPlayers, randomPlayer1, randomPlayer2]);
    }
  }, [
    loadingPlayers,
    allPlayers,
    loadingGameHistory,
    gameHistory,
    player1,
    player2,
  ]);

  const rerollPlayer = (
    currentPlayer: Player,
    setPlayer: (player: Player) => void
  ) => () => {
    const randomPlayer = getRandomPlayer(
      allPlayers,
      gameHistory!.result,
      discardedPlayers
    );
    invitationsContext.replacePlayerOnInvitation(
      invitationsContext.invitations![0].id,
      currentPlayer,
      randomPlayer,
      () => {
        setPlayer(randomPlayer);
        setDiscardedPlayers([...discardedPlayers, randomPlayer]);
      }
    );
  };

  return (
    <React.Fragment>
      {player1 && player2 && (
        <InstructionText>cnb.finx-rocks.com/play</InstructionText>
      )}

      <PlayersContainer>
        <PlayerSide>
          {invitation && player1 && (
            <RandomPlayerSelector
              selectedPlayer={player1}
              reroll={rerollPlayer(player1, setPlayer1)}
              playerInvitation={invitation.playerInvitations.find(
                i => i.player.id === player1.id
              )}
            />
          )}
        </PlayerSide>

        <PlayerSide>
          {invitation && player2 && (
            <RandomPlayerSelector
              selectedPlayer={player2}
              playerPosition="right"
              reroll={rerollPlayer(player2, setPlayer2)}
              playerInvitation={invitation.playerInvitations.find(
                i => i.player.id === player2.id
              )}
            />
          )}
        </PlayerSide>
      </PlayersContainer>
    </React.Fragment>
  );
};
