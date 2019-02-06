/* @flow */
export const FEATURE_ANIMATED = 'animated';

export type IsFeatureEnabled = string => boolean;

export const isFeatureEnabled: IsFeatureEnabled = feature => {
  var urlParams = new URLSearchParams(window.location.search);

  const featureToggleUrlParam = urlParams.get('feature');
  if (!featureToggleUrlParam) {
    return false;
  }

  const featuresActive = featureToggleUrlParam.split(',');
  return featuresActive.includes(feature);
};
