import CowboyNinjaBearTheme from '../cowboy-ninja-bear';
import PandaPizzaPirateTheme from '../panda-pizza-pirate';
import XmasTheme from '../xmas';
import NewYearTheme from '../new-year';
import AustraliaTheme from '../australia';
import EasterTheme from '../easter';

class Provider {
  _featureEnabled = () => {
    throw new Error('Feature Enabled function has not been set');
  };

  constructor(isFeatureEnabled) {
    this._featureEnabled = isFeatureEnabled;
  }

  getTheme = () => {
    if (this._featureEnabled('cnb')) {
      return CowboyNinjaBearTheme;
    } else if (this._featureEnabled('ppp')) {
      return PandaPizzaPirateTheme;
    } else if (this._featureEnabled('xmas')) {
      return XmasTheme;
    } else if (this._featureEnabled('new-year')) {
      return NewYearTheme;
    } else if (this._featureEnabled('australia')) {
      return AustraliaTheme;
    } else if (this._featureEnabled('easter')) {
      return EasterTheme;
    }
  };
}

export default Provider;
