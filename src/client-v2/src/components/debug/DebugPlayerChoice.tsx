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

  const allChoices = useMemo<CreatedPlayerChoice[]>(
    () =>
      allPlayerChoices
        ? allPlayerChoices.filter((c) =>
            c.choices.find((c) => c.id === choiceId)
          )
        : [],
    [allPlayerChoices, choiceId]
  );

  const selectedChoices = useMemo(() => {
    return allChoices.filter((c) => !!c.selectedChoiceId);
  }, [allChoices]);

  const unselectedChoices = useMemo(() => {
    return allChoices.filter((c) => !c.selectedChoiceId);
  }, [allChoices]);

  return (
    <div>
      <h4>Choices</h4>
      <h5>Unselected</h5>
      <div>
        {unselectedChoices.map((playerChoice) => (
          <div key={`${playerChoice.id}-${playerChoice.playerId}`}>
            <div>{playerChoice.playerId}</div>
            <div>
              {playerChoice.choices.map((choice) => {
                return (
                  <button
                    key={choice.id}
                    onClick={() => selectChoice(playerChoice.id, choice.id)}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <h5>Selected</h5>
      <div>
        {selectedChoices.map((playerChoice) => (
          <div key={`${playerChoice.id}-${playerChoice.playerId}`}>
            <strong>{playerChoice.playerId}</strong>
            <div>{playerChoice.selectedChoiceId}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
