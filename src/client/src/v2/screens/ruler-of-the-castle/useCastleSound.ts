import { useEffect, useRef } from 'react';
import { useSoundProvider } from '../../providers/SoundProvider';
import { UseCastleStateResult } from './useCastleState';

export const useCastleSound = (
  castleState: UseCastleStateResult,
  points: number,
  showAnimations: boolean
): void => {
  const originalPoints = useRef(points);
  const { play } = useSoundProvider();

  useEffect(() => {
    !castleState.outcome && play('DonkeyKongAngry');
  }, [castleState]);

  useEffect(() => {
    castleState.outcome &&
      points > originalPoints.current &&
      play('SelectPrizePoints');
  }, [castleState, points]);

  useEffect(() => {
    if (
      castleState.outcome &&
      castleState.defendingPlayer &&
      castleState.defendingPlayer.battleWinner
    ) {
      play('FastestFinger');
    }
  }, [castleState]);

  useEffect(() => {
    if (
      castleState.outcome &&
      castleState.attackingPlayer &&
      castleState.attackingPlayer.battleWinner
    ) {
      play('MobWin_1');
    }
  }, [castleState]);

  useEffect(() => {
    if (
      showAnimations &&
      castleState.outcome &&
      castleState.attackingPlayer &&
      castleState.attackingPlayer.battleWinner
    ) {
      play('Fall');
    }
  }, [castleState, showAnimations]);
};
