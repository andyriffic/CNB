export function isDebugFeatureEnabled(): boolean {
  return isFeatureEnabled('debug') || isPersistantFeatureEnabled('cnb-debug');
}

export function isFeatureEnabled(featureName: string): boolean {
  var urlParams = new URLSearchParams(window.location.search);

  const featureToggleUrlParam = urlParams.get('feature');
  if (!featureToggleUrlParam) {
    return false;
  }

  const featuresActive = featureToggleUrlParam.split(',');
  return featuresActive.includes(featureName);
}

export function isPersistantFeatureEnabled(featureName: string): boolean {
  return !!document.cookie
    .split(';')
    .find((keyValuePair) => keyValuePair.split('=')[0].includes(featureName));
}
