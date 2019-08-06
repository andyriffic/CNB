export type PlayerList = Player[];
export type TeamList = Team[];

export type Player = {
  id: string;
  name: string;
  tags: string[];
};

export type Team = {
  id: string;
  name: string;
}
