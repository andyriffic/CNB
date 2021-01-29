import { ThemeStyles } from '../components/ui/Theme';
import { SoundMap } from '../providers/SoundProvider';
import defaultTheme from './default';
import halloweenTheme from './halloween';
import xmasTheme from './xmas';
import chineseTheme from './chinese';

export type ThemeName = 'default' | 'halloween' | 'xmas' | 'chinese';

export type MoveThemeNames =
  | 'rock-paper-scissors-classic'
  | 'rock-paper-scissors-halloween'
  | 'rock-paper-scissors-xmas'
  | 'rock-paper-scissors-chinese';

export type DecorationPlacements = 'spectatorScreen' | 'moveWaiting';

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
};
