import { useMemo } from 'react';
import {
  CreatedPlayerChoice,
  usePlayerChoice,
} from '../../contexts/PlayerChoiceContext';

type Props = {
  choiceId: string;
};

export function DebugPlayerChoice({ choiceId }: Props): JSX.Element {
  const { allPlayerChoices, selectChoice } = usePlayerChoice();

  const joinMobChoices = useMemo<CreatedPlayerChoice[]>(
    () =>
      allPlayerChoices
        ? allPlayerChoices.filter((c) =>
            c.choices.find((c) => c.id === choiceId)
          )
        : [],
    [allPlayerChoices, choiceId]
  );

  return (
    <div>
      <h4>Choices</h4>
      <div>
        {joinMobChoices.map((playerChoice) => (
          <div key={`${playerChoice.id}-${playerChoice.playerId}`}>
            <div>{playerChoice.playerId}</div>
            <div>
              {playerChoice.choices.map((choice) => (
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
