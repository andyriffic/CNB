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
                      <ThemedUi>
                        <Router>
                          <ChoosePlayerScreen path="/classic" />
                          <ScreenWithMatchup
                            path="/spectator/:matchupId"
                            matchupId=""
                          />
                          <SnakesAndLaddersScreen path="/snakes-and-ladders" />
                          <DonkeyKongScreen path="/donkey-kong" />
                          <CreateMobScreen path="/" />
                          <MobSpectatorScreen
                            path="/mob/spectator/:mobGameId"
                            mobGameId=""
                          />
                          <SelectPlayerScreen path="/play" />
                          <SelectMatchupScreen path="/play/:playerId" />
                          <PlayMatchupScreen path="/play/:playerId/matchup/:matchupId" />
                          <PlayMobScreen path="/play/:playerId/mob/:mobGameId" />
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
                        </Router>
                      </ThemedUi>
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
