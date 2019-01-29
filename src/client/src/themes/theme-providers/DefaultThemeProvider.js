/* @flow */
import type { ThemeProvider } from './types';
import CowboyNinjaBearTheme from '../cowboy-ninja-bear';

class Provider implements ThemeProvider {
  getTheme = () => {
    return CowboyNinjaBearTheme;
  };
}

export default Provider;
