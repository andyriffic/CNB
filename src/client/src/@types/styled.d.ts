import 'styled-components';
import { ThemeStyles } from '../v2/components/ui/Theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeStyles {}
}
