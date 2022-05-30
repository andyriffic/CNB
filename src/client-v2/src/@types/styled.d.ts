import 'styled-components';
import { ThemeStyles } from '../types/GameUi';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeStyles {}
}
