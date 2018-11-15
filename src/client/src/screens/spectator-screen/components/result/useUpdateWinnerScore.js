
import { useEffect, useContext } from 'react';
import ScoreboardContext from '../../../../contexts/ScoreboardContext';

export const useGetScoreboardUpdate = (winningPlayerName) => {

    const scores = useContext(ScoreboardContext);
    if (!scores) return;

    useEffect(() => {
        setTimeout(() => {
            console.log('Use effect scores', scores, winningPlayerName);
            scores[winningPlayerName].add(scores);
        }, 3000);
    }, [])
}
