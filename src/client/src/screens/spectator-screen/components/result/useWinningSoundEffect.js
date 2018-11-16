import { useEffect } from 'react';
import { getWinningSound } from '../../../../sounds/soundService';

export const useWinningSoundEffect = (winningMove, delay = 0) => {

    useEffect(() => {
        const winningSound = getWinningSound(winningMove);

        const timeout = setTimeout(() => {
            winningSound.play();
        }, delay)

        return () => {
            clearTimeout(timeout);
        }
    }, [])
}