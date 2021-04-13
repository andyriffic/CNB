import { ThemeStyles } from '../components/ui/Theme';
import { SoundMap } from '../providers/SoundProvider';
import defaultTheme from './default';
import halloweenTheme from './halloween';
import xmasTheme from './xmas';
import chineseTheme from './chinese';
import retroTheme from './retro';

export type ThemeName = 'default' | 'halloween' | 'xmas' | 'chinese' | 'retro';

export type MoveThemeNames =
  | 'rock-paper-scissors-classic'
  | 'rock-paper-scissors-halloween'
  | 'rock-paper-scissors-xmas'
  | 'rock-paper-scissors-chinese'
  | 'rock-paper-scissors-retro';

export type DecorationPlacements =
  | 'spectatorScreen'
  | 'moveWaiting'
  | 'playerMovedIcon'
  | 'prizeIcon'
  | 'bombIcon'
  | 'mainGameOverAction';

export type MoveKeys = 'A' | 'B' | 'C';

export type ThemeComponents = {
  moveThemeName: MoveThemeNames;
  sounds: SoundMap;
  style: ThemeStyles;
  moves: { [key in MoveKeys]: JSX.Element };
  decorations: {
    [key in DecorationPlacements]?: JSX.Element;
  };
};

export type ThemeComponentsMap = {
  [key in ThemeName]: ThemeComponents;
};

export const themeComponentMap = {
  default: defaultTheme,
  halloween: halloweenTheme,
  xmas: xmasTheme,
  chinese: chineseTheme,
  retro: retroTheme,
};
