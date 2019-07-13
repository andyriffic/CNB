import React, { useEffect, useContext, useState } from 'react';
import { MatchupContext } from '../socket-context/MatchupProvider';
import { DebugView } from './DebugView';

export const MatchupAdminView = () => {
  const { matchups, addMatchup, watchMatchup } = useContext(MatchupContext);
  const [addMatchupTeam1, setAddMatchupTeam1] = useState('');
  const [addMatchupTeam2, setAddMatchupTeam2] = useState('');

  useEffect(() => {
    console.log('Matchups::mount');
  }, []);

  return (
    <div>
      <form>
        <fieldset>
          <legend>Add Matchup</legend>
          <label>Team 1</label>
          <input
            type="text"
            maxLength="20"
            value={addMatchupTeam1}
            onChange={e => setAddMatchupTeam1(e.target.value)}
          />
          <label>Team 2</label>
          <input
            type="text"
            maxLength="20"
            value={addMatchupTeam2}
            onChange={e => setAddMatchupTeam2(e.target.value)}
          />
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              if (addMatchupTeam1 && addMatchupTeam2) {
                addMatchup(addMatchupTeam1, addMatchupTeam2);
              }
            }}
          >
            Add Matchup
          </button>
        </fieldset>
      </form>
      <div>
        <h3>Matchups</h3>
        {/* <DebugView title="Matchups" value={matchups} /> */}
        {matchups &&
          matchups.map(matchup => (
            <button
              type="button"
              key={matchup.id}
              onClick={() => watchMatchup(matchup.id)}
            >
              {matchup.id}
            </button>
          ))}
      </div>
    </div>
  );
};
