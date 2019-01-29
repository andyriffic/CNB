/* @flow */
import type { ThemeProvider } from './types';
import NewYearTheme from '../new-year';
import AustraliaTheme from '../australia';

class Provider implements ThemeProvider {
  _date: Date;

  constructor(date: Date = new Date()) {
    this._date = date;
  }

  getTheme = () => {
    const month = this._date.getMonth() + 1; // Add 1 since getMonth returns 0 based index
    const date = this._date.getDate();

    if (
      (month === 1 && date === 29) ||
      (month === 2 && (date >= 4 && date <= 8))
    ) {
      return AustraliaTheme;
    } else if (
      (month === 1 && (date >= 21 && date <= 31)) ||
      (month === 2 && date === 1)
    ) {
      return NewYearTheme;
    }
  };
}

export default Provider;
