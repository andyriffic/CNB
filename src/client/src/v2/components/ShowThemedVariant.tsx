import { ThemeName, useThemeName } from '../providers/hooks/useThemeName';

type Props = {
  forTheme: { [key in ThemeName]?: JSX.Element };
};

export const ShowThemedVariant = ({ forTheme }: Props) => {
  const themeName = useThemeName();
  const component = forTheme[themeName] || null;
  return component;
};
