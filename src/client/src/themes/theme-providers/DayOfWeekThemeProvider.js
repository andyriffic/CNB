/* @flow */
import type { ThemeProvider } from './types';
import CowboyNinjaBearTheme from '../cowboy-ninja-bear';
import PandaPizzaPirateTheme from '../panda-pizza-pirate';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class Provider implements ThemeProvider {
  _date: Date;

  constructor(date: Date = new Date()) {
    this._date = date;
  }

  getTheme = () => {
    const dayOfWeek = DAYS[this._date.getDay()];

    switch (dayOfWeek) {
      case 'Mon':
      case 'Wed':
      case 'Fri':
        return PandaPizzaPirateTheme;

      case 'Tue':
      case 'Thu':
        return CowboyNinjaBearTheme;
    }
  };
}

export default Provider;
