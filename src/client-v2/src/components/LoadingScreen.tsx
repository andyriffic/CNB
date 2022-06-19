import { usePlayers } from '../contexts/PlayersContext';
import { useMemo } from 'react';
import { UiGameScreen } from './ui/GameScreen';
import { UiTitle } from './ui/Title';
import { LayoutCentered } from './ui/Layouts';

type Props = {
  children: JSX.Element;
};

export function LoadingScreen({ children }: Props): JSX.Element {
  const { allPlayers } = usePlayers();

  const loaded = useMemo(() => {
    return !!allPlayers.length;
  }, [allPlayers]);

  return loaded ? (
    children
  ) : (
    <UiGameScreen>
      <LayoutCentered>
        <UiTitle>Loading...</UiTitle>
      </LayoutCentered>
    </UiGameScreen>
  );
}
