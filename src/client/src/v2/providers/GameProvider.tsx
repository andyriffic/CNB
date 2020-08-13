import React, { ReactNode, useContext } from 'react';
import { MatchupContext } from '../../uplift/contexts/MatchupProvider';

export type GameService = {};

export const GameContext = React.createContext<GameService | undefined>(
  undefined
);

export const GameProvider = ({
  children,
  matchupId,
}: {
  children: ReactNode;
  matchupId: string;
}) => {
  const { subscribeToMatchup } = useContext(MatchupContext);

  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};

export function useGameProvider() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error(
      'useGameProvider must be used within a InvitationsProvider'
    );
  }
  return context;
}
