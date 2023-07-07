import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BOARD_CELL_TYPE, GameBoard, GameBoardCellWithPlayers } from '../types';
import { BoardCell } from './BoardCell';
import { BoardPlayer, PLAYER_MOVE_ANIMATION_TIMEOUT_MS } from './BoardPlayer';
import { useGameBoardProvider } from '../providers/GameBoardProvider';
import { PositionedPlayer } from './PositionedPlayer';
import { LoadingSpinner } from '../../../../uplift/components/loading-spinner';
import { Barrels } from './Barrels';
import { SplashText } from '../../../components/SplashText';
import { Button } from '../../../components/ui/buttons';
import { useSoundProvider } from '../../../providers/SoundProvider';
import { WinnerDonkeyChoice } from './WinnerDonkeyChoice';
import { Player, usePlayersProvider } from '../../../providers/PlayersProvider';
import { WinningPlayer } from './WinningPlayer';

enum PlayState {
  WaitingToPlay = 'WaitingToPlay',
  ShowingPlayersIntro = 'ShowingPlayersIntro',
  MovingPlayers = 'MovingPlayers',
  ShowingBarrelsIntro = 'ShowingBarrelsIntro',
  CreatingBarrels = 'CreatingBarrels',
  ThrowingBarrels = 'ThrowingBarrels',
  CheckWinner = 'CheckWinner',
  DetermineWinner = 'DetermineWinner',
  GameOver = 'GameOver',
}

const BoardContainer = styled.div<{
  boardImage: any;
  width: string;
  height: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};
  background: transparent url(${props => props.boardImage}) no-repeat top left;
  background-size: contain;
  position: relative;
  margin: 0 auto;
`;

const getPlayersInEndCell = (
  cellsWithPlayers: GameBoardCellWithPlayers[]
): Player[] => {
  const playersInFinalCell = cellsWithPlayers.filter(
    cell => cell.type === BOARD_CELL_TYPE.END
  );

  console.log('END PLAYERS', playersInFinalCell);

  if (playersInFinalCell.length === 0) {
    return [];
  }

  return playersInFinalCell[0].players.map(gp => gp.player);
};

type Props = {
  boardImage: any;
  width: string;
  height: string;
};

export const Board = ({ boardImage, width, height }: Props) => {
  const {
    gameBoardPlayers,
    cellsWithPlayers,
    moveAllPlayers,
  } = useGameBoardProvider();
  const { setNextFinishedPlacing } = usePlayersProvider();
  const [playState, setPlayState] = useState(PlayState.WaitingToPlay);
  const [winningPlayer, setWinningPlayer] = useState<Player | undefined>();
  const { play } = useSoundProvider();

  useEffect(() => {
    if (playState === PlayState.CheckWinner) {
      if (getPlayersInEndCell(cellsWithPlayers).length > 0) {
        setPlayState(PlayState.DetermineWinner);
      } else {
        setPlayState(PlayState.GameOver);
      }
    }
  }, [playState, cellsWithPlayers]);

  useEffect(() => {
    if (playState === PlayState.GameOver) {
      play('DonkeyKongGameOver');
    }
  }, [playState]);

  useEffect(() => {
    if (playState === PlayState.ShowingBarrelsIntro) {
      play('DonkeyKongAngry');
    }
  }, [playState]);

  useEffect(() => {
    if (playState === PlayState.MovingPlayers) {
      moveAllPlayers().then(() => {
        setPlayState(PlayState.ShowingBarrelsIntro);
      });
    }
  }, [playState]);

  if (!(gameBoardPlayers.length && cellsWithPlayers.length)) {
    return <LoadingSpinner text="Loading players" />;
  }

  return (
    <BoardContainer boardImage={boardImage} width={width} height={height}>
      {cellsWithPlayers.map(cell => (
        <BoardCell key={cell.number} cell={cell} />
      ))}
      {gameBoardPlayers.map(boardPlayer => {
        return (
          <PositionedPlayer
            key={`${boardPlayer.player.id}`}
            cell={cellsWithPlayers[boardPlayer.boardCellIndex]}
            playerId={boardPlayer.player.id}
          >
            <BoardPlayer
              gameBoardPlayer={boardPlayer}
              cell={cellsWithPlayers[boardPlayer.boardCellIndex]}
            />
          </PositionedPlayer>
        );
      })}
      {playState === PlayState.WaitingToPlay && (
        <div
          style={{ position: 'absolute', top: '46%', left: '42%', zIndex: 1 }}
        >
          <Button onClick={() => setPlayState(PlayState.ShowingPlayersIntro)}>
            Start
          </Button>
        </div>
      )}

      <Barrels
        autoCreateBarrels={playState === PlayState.CreatingBarrels}
        autoThrowBarrels={playState === PlayState.ThrowingBarrels}
        onBarrelsCreated={() => setPlayState(PlayState.ThrowingBarrels)}
        onBarrelsThrown={() => setPlayState(PlayState.CheckWinner)}
      />
      {playState === PlayState.DetermineWinner && !winningPlayer && (
        <WinnerDonkeyChoice
          playersAtEnd={getPlayersInEndCell(cellsWithPlayers)}
          onComplete={result => {
            if (result.winningPlayers.length === 1) {
              const winner = result.winningPlayers[0];
              setWinningPlayer(winner);
              setNextFinishedPlacing(winner.id, 'sl_finish');
            } else {
              setPlayState(PlayState.GameOver);
            }
          }}
        />
      )}
      {winningPlayer && <WinningPlayer player={winningPlayer} />}
      {playState === PlayState.ShowingPlayersIntro && (
        <SplashText onComplete={() => setPlayState(PlayState.MovingPlayers)}>
          Moving players
        </SplashText>
      )}

      {playState === PlayState.ShowingBarrelsIntro && (
        <SplashText onComplete={() => setPlayState(PlayState.CreatingBarrels)}>
          Zijian refactors code
        </SplashText>
      )}

      {playState === PlayState.GameOver && (
        <SplashText onComplete={() => {}}>Game over</SplashText>
      )}
    </BoardContainer>
  );
};
