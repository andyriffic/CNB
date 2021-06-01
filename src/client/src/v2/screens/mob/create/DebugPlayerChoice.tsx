import React, { useMemo } from 'react';
import {
  CreatedPlayerChoice,
  usePlayerChoiceProvider,
} from '../../../providers/PlayerChoiceProvider';
import { MOB_JOINED_CHOICE_ID } from './hooks/useMobSelection';

export function DebugPlayerChoice(): JSX.Element {
  const { allPlayerChoices, selectChoice } = usePlayerChoiceProvider();

  const joinMobChoices = useMemo<CreatedPlayerChoice[]>(
    () =>
      allPlayerChoices
        ? allPlayerChoices.filter(c =>
            c.choices.find(c => c.id === MOB_JOINED_CHOICE_ID)
          )
        : [],
    [allPlayerChoices]
  );

  return (
    <div>
      <h4>Choices</h4>
      <div>
        {joinMobChoices.map(playerChoice => (
          <div key={`${playerChoice.id}-${playerChoice.playerId}`}>
            <div>{playerChoice.playerId}</div>
            <div>
              {playerChoice.choices.map(choice => (
                <button
                  key={choice.id}
                  onClick={() => selectChoice(playerChoice.id, choice.id)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
