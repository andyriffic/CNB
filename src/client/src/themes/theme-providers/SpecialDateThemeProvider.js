import NewYearTheme from '../new-year';
import AustraliaTheme from '../australia';
import PizzaPandaPirate from '../panda-pizza-pirate';
import EasterTheme from '../easter';

class Provider {
  _date;

  constructor(date = new Date()) {
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
    } else if (month === 2 && (date >= 17 && date <= 24)) {
      // PowerUps beta!
      return PizzaPandaPirate;
    } else if (month === 4 && date === 16) {
      // Jatin citizenship
      return AustraliaTheme;
    } else if (month === 4 && (date >= 15 && date <= 26)) {
      return EasterTheme;
    }
  };
}

export default Provider;
