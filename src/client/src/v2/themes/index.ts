import { ThemeStyles } from '../components/ui/Theme';
import { SoundMap } from '../providers/SoundProvider';
import defaultTheme from './default';
import halloweenTheme from './halloween';

export type ThemeName = 'default' | 'halloween';

export type MoveThemeNames =
  | 'rock-paper-scissors-classic'
  | 'rock-paper-scissors-halloween';

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
  [key in ThemeName]?: ThemeComponents;
};

export const themeComponentMap = {
  default: defaultTheme,
  halloween: halloweenTheme,
};
