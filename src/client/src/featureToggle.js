import React from 'react';

export const isFeatureEnabled = feature => {
  var urlParams = new URLSearchParams(window.location.search);

  const featureToggleUrlParam = urlParams.get('feature');
  if (!featureToggleUrlParam) {
    return false;
  }

  const featuresActive = featureToggleUrlParam.split(',');
  return featuresActive.includes(feature);
};

export const isPersistantFeatureEnabled = feature => {
  return document.cookie
    .split(';')
    .find(keyValuePair => keyValuePair.split('=')[0].includes(feature));
};

export const FeatureToggle = ({ children, feature }) => {
  return <React.Fragment>{children(isFeatureEnabled(feature))}</React.Fragment>;
};
