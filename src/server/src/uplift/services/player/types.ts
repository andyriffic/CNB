export type PlayerList = Player[];
export type TeamList = Team[];

export type Player = {
  id: string;
  name: string;
  tags: string[];
  avatarImageUrl: string;
};

export type Team = {
  id: string;
  name: string;
}

export type TeamDetails = {
  team: Team;
  players: Player[];
}