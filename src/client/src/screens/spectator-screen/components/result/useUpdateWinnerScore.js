
import { useEffect, useContext } from 'react';
import ScoreboardContext from '../../../../contexts/ScoreboardContext';

const delayMilliseconds = 6500;

export const useGetScoreboardUpdate = (winningPlayerName) => {

    const scores = useContext(ScoreboardContext);
    if (!scores) return;

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log('Use effect scores', scores, winningPlayerName);
            scores[winningPlayerName].add(scores);
        }, delayMilliseconds);

        return () => {
            clearTimeout(timeout);
        }
    }, [])
}
