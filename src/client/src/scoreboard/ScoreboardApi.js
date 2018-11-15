import React, { useEffect, useState } from 'react';
import ScoreboardContext from '../contexts/ScoreboardContext';

const API_BASE_URL = `https://counterapi.tangarineturkey.com/api/counter/group/2d45227e-b6a0-46cf-b155-d95ef57ebf5e`

const ScoreboardApi = ({ children }) => {

    const [scores, setScores] = useState(null);

    useEffect(()=> {
        fetch(`${API_BASE_URL}`)
        .then(resp => resp.json())
        .then(scoreboard => scoreboard.counters)
        .then(scores => { 
            const mappedScores = createScoreboardService(scores, setScores);
            setScores(mappedScores); 
        })
    }, [])

    return (
        <ScoreboardContext.Provider value={ scores }>
            {children}
        </ScoreboardContext.Provider>
    );

}

export default ScoreboardApi;

const createScoreboardService = (scores, setScores) => {

    // TODO: rethink this idea :/
    let mappedScores = {};
    Object.keys(scores).forEach(counterId => {
        mappedScores[scores[counterId].name] = {
            value: scores[counterId].value,
            add: (currentScores) => {
                fetch(
                    `${API_BASE_URL}/${counterId}`,
                    {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({type: 'INCREMENT'})
                    }
                )
                .then(resp => resp.json())
                .then(result => {
                    const newScores = {
                        ...currentScores,
                        [scores[counterId].name]: {
                            ...currentScores[scores[counterId].name],
                            value: Object.values(result)[0].value,
                        }
                    }
                    setScores(newScores);
                })
            }
        }
    })

    return mappedScores;
}