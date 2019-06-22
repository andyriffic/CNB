const ALL_PLAYERS = [
  { name: 'Bin', imageName: 'bin', team: 'XIAN' },
  { name: 'Shuming', imageName: 'shuming', team: 'XIAN' },
  { name: 'Yingjian', imageName: 'yingjian', team: 'XIAN' },
  { name: 'Yixing', imageName: 'yixing', team: 'XIAN' },
  { name: 'Albert', imageName: 'albert', team: 'MELB' },
  { name: 'Alex', imageName: 'alex', team: 'MELB' },
  { name: 'Andy', imageName: 'andy', team: 'MELB' },
  { name: 'Azra', imageName: 'azra', team: 'MELB' },
  { name: 'Bjorn', imageName: 'bjorn', team: 'MELB' },
  { name: 'Chris', imageName: 'chris', team: 'MELB' },
  { name: 'Du', imageName: 'du', team: 'MELB' },
  { name: 'Duyen', imageName: 'duyen', team: 'MELB' },
  { name: 'Jatin', imageName: 'jatin', team: 'MELB' },
  { name: 'Jay', imageName: 'jay', team: 'MELB' },
  { name: 'Jim', imageName: 'jim', team: 'MELB' },
  { name: 'Liujing', imageName: 'liujing', team: 'MELB' },
  { name: 'Marion', imageName: 'marion', team: 'MELB' },
  { name: 'Michael B', imageName: 'michael_b', team: 'MELB' },
  { name: 'Michael W', imageName: 'michael_w', team: 'MELB' },
  { name: 'Stacey', imageName: 'stacey', team: 'MELB' },
  { name: 'Ray', imageName: 'ray', team: 'MELB' },
  { name: 'Yujin', imageName: 'yujin', team: 'MELB' },
];

export const getAllPlayers = () => {
  return Promise.resolve(ALL_PLAYERS);
};
