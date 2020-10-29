import { useThemeComponents } from '../providers/hooks/useThemeComponents';
import { DecorationPlacements } from '../themes';

type Props = {
  placement: DecorationPlacements;
};

export const ShowThemedVariant = ({ placement }: Props) => {
  const themeComponents = useThemeComponents();
  if (!themeComponents) {
    return null;
  }

  const component = themeComponents.decorations[placement] || null;
  return component;
};
