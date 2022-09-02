import React from 'react';
import { Router } from '@reach/router';
import GlobalStyle from '../uplift/GlobalStyle';
import { MoveThemeProvider } from './providers/MoveThemeProvider';
import { InvitationsProvider } from './providers/InvitationsProvider';
import { PlayersProvider } from './providers/PlayersProvider';
import { MatchupProvider } from './providers/MatchupProvider';
import { GameSettingsProvider } from './providers/GameSettingsProvider';
import { ThemedUi } from './components/ui/Theme';
import { SoundProvider } from './providers/SoundProvider';
import { MobLeaderboardProvider } from './providers/MobLeaderboardProvider';
import { ScreenWithMatchup } from './screens/spectator';
import { ChoosePlayerScreen } from './screens/choose-players';
import { SnakesAndLaddersScreen } from './screens/snakes-and-ladders';
import { DonkeyKongScreen } from './screens/donkey-kong';
import { CreateMobScreen } from './screens/mob/create';
import { MobSpectatorScreen } from './screens/mob/spectator';
import {
  SelectPlayerScreen,
  SelectMatchupScreen,
  PlayMatchupScreen,
  PlayMobScreen,
  PlayGasScreen,
} from './screens/play';
import { GameEngineScreen } from './screens/game-engine';
import { RacingTrackScreen } from './screens/racing-track';
import { PlayerAdminScreen } from './screens/player-admin';
import { PlayerProfileScreen } from './screens/player-profile';
import { GameHistoryScreen } from './screens/game-history';
import { PlayerChoiceProvider } from './providers/PlayerChoiceProvider';
import { MobProvider } from './providers/MobProvider';
import { MobAchievementsScreen } from './screens/mob/achievements';
import { MobPointsInstructionsScreen } from './screens/mob/points-instructions';
import { GasProvider } from './providers/GasProvider';
import { CreateGasGameScreen } from './screens/gas-out/create';
import { GasGameSpectatorScreen } from './screens/gas-out/spectator';
import { PacManScreen } from './screens/pac-man';
import { ChooseGameScreen } from './screens/choose-game';
import { WhosThatSupersquadMemberScreen } from './screens/whos-that-supersquad-member';
import { MiniTournamentScreen } from './screens/mini-tournament';
import { TestScreen } from './screens/test';

export default () => {
  return (
    <MoveThemeProvider>
      <GlobalStyle />
      <MatchupProvider>
        <PlayersProvider>
          <InvitationsProvider>
            <GameSettingsProvider>
              <SoundProvider>
                <PlayerChoiceProvider>
                  <MobProvider>
                    <MobLeaderboardProvider>
                      <GasProvider>
                        <ThemedUi>
                          <Router>
                            <ChooseGameScreen path="/" />
                            <ChoosePlayerScreen path="/classic" />
                            <ScreenWithMatchup
                              path="/spectator/:matchupId"
                              matchupId=""
                            />
                            <SnakesAndLaddersScreen path="/snakes-and-ladders" />
                            <DonkeyKongScreen path="/donkey-kong" />
                            <PacManScreen path="/pac-man" />
                            <CreateMobScreen path="/mob/start" />
                            <MobSpectatorScreen
                              path="/mob/spectator/:mobGameId"
                              mobGameId=""
                            />
                            <SelectPlayerScreen path="/play" />
                            <SelectMatchupScreen path="/play/:playerId" />
                            <PlayMatchupScreen path="/play/:playerId/matchup/:matchupId" />
                            <PlayMobScreen path="/play/:playerId/mob/:mobGameId" />
                            <PlayGasScreen path="/play/:playerId/gas/:gasGameId" />
                            <PlayerProfileScreen
                              path="/player-profile"
                              playerName=""
                            />
                            <PlayerProfileScreen
                              path="/player-profile/:playerName"
                              playerName=""
                            />
                            <MobAchievementsScreen path="/mob-achievements" />
                            <MobPointsInstructionsScreen path="/mob-points-explanation" />
                            <GameHistoryScreen path="/game-history" />
                            <PlayerAdminScreen path="/player-admin" />
                            <GameEngineScreen path="/game-engine" />
                            <RacingTrackScreen path="/race-track" />
                            <CreateGasGameScreen path="gas/start" />
                            <GasGameSpectatorScreen
                              path="gas/game/:gameId"
                              gameId=""
                            />
                            <WhosThatSupersquadMemberScreen path="whos-that-supersquad-member" />
                            <MiniTournamentScreen path="mini-tournament" />
                            <TestScreen path="test" />
                          </Router>
                        </ThemedUi>
                      </GasProvider>
                    </MobLeaderboardProvider>
                  </MobProvider>
                </PlayerChoiceProvider>
              </SoundProvider>
            </GameSettingsProvider>
          </InvitationsProvider>
        </PlayersProvider>
      </MatchupProvider>
    </MoveThemeProvider>
  );
};
