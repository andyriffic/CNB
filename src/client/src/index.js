import React from 'react';
import ReactDOM from 'react-dom';
import UpliftApp from './uplift';
import UpliftTest from './socket-uplift/test-view';
import UpliftSpectatorApp from './socket-uplift/test-spectator-view';
import UpliftPlayerApp from './socket-uplift/test-player-view';
import { isFeatureEnabled } from './featureToggle';
import AppV2 from './v2/App';

const v2 = window.location.pathname.includes('/v2');

if (v2) {
  ReactDOM.render(<AppV2 />, document.getElementById('root'));
} else if (isFeatureEnabled('uplift-test')) {
  ReactDOM.render(<UpliftTest />, document.getElementById('root'));
} else if (isFeatureEnabled('uplift-spectator')) {
  ReactDOM.render(<UpliftSpectatorApp />, document.getElementById('root'));
} else if (isFeatureEnabled('uplift-player')) {
  ReactDOM.render(<UpliftPlayerApp />, document.getElementById('root'));
} else {
  ReactDOM.render(<UpliftApp />, document.getElementById('root'));
}
