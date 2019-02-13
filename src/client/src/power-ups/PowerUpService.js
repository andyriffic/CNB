const TOKEN_TYPE = 0;
const TOKEN_POWER_UP_TYPE = 1;
const TOKEN_PLAYER = 2;

class PowerUpService {
  powerUpsByPlayer = {};

  initialisePlayerPowerUps(counters) {
    Object.keys(counters).forEach(counterId => {
      const counter = counters[counterId];
      const tokens = counter.name.split('_');

      if (tokens[TOKEN_TYPE] !== 'POWER') {
        return;
      }

      const playerName = tokens[TOKEN_PLAYER];
      const powerUp = tokens[TOKEN_POWER_UP_TYPE];

      const playerPowerUps = this.powerUpsByPlayer[playerName] || [];
      playerPowerUps.push({ type: powerUp, count: counter.value });
      this.powerUpsByPlayer[playerName] = playerPowerUps;
    });
  }

  getPowerUpsForPlayer = playerName => {
    return this.powerUpsByPlayer[playerName];
  };
}

export default PowerUpService;
