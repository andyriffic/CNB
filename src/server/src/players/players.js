const ALL_PLAYERS = [
  { name: 'Albert', imageName: 'albert', team: 'MELB', slot: 'player2' },
  { name: 'Alex', imageName: 'alex', team: 'MELB', slot: 'player2' },
  { name: 'Andy', imageName: 'andy', team: 'MELB', slot: 'player2' },
  { name: 'Azra', imageName: 'azra', team: 'MELB', slot: 'player2' },
  { name: 'Bin', imageName: 'bin', team: 'XIAN', slot: 'player1' },
  { name: 'Bjorn', imageName: 'bjorn', team: 'MELB', slot: 'player2' },
  { name: 'Chris', imageName: 'chris', team: 'MELB', slot: 'player2' },
  { name: 'Du', imageName: 'du', team: 'MELB', slot: 'player2' },
  { name: 'Duyen', imageName: 'duyen', team: 'MELB', slot: 'player2' },
  { name: 'Jatin', imageName: 'jatin', team: 'MELB', slot: 'player2' },
  { name: 'Jay', imageName: 'jay', team: 'MELB', slot: 'player2' },
  { name: 'Jim', imageName: 'jim', team: 'MELB', slot: 'player2' },
  { name: 'Liujing', imageName: 'liujing', team: 'MELB', slot: 'player2' },
  { name: 'Marion', imageName: 'marion', team: 'MELB', slot: 'player2' },
  { name: 'Michael B', imageName: 'michael_b', team: 'MELB', slot: 'player2' },
  { name: 'Michael W', imageName: 'michael_w', team: 'MELB', slot: 'player2' },
  { name: 'Stacey', imageName: 'stacey', team: 'MELB', slot: 'player2' },
  { name: 'Ray', imageName: 'ray', team: 'MELB', slot: 'player2' },
  { name: 'Shuming', imageName: 'shuming', team: 'XIAN', slot: 'player1' },
  { name: 'Yingjian', imageName: 'yingjian', team: 'XIAN', slot: 'player1' },
  { name: 'Yixing', imageName: 'yixing', team: 'XIAN', slot: 'player1' },
  { name: 'Yujin', imageName: 'yujin', team: 'MELB', slot: 'player2' },
];

export const getAllPlayers = () => {
  return Promise.resolve(ALL_PLAYERS);
};
