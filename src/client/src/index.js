import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UpliftApp from './socket-uplift/test-view';
import { isFeatureEnabled } from './featureToggle';

if (isFeatureEnabled('uplift')) {
  ReactDOM.render(<UpliftApp />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
