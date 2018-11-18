export const FEATURE_WAITING_MUSIC = 'music';

export const isFeatureEnabled = (feature) => {
    var urlParams = new URLSearchParams(window.location.search);

    const featureToggleUrlParam = urlParams.get('feature');
    if (!featureToggleUrlParam) {
        return;
    }
    
    const featuresActive = featureToggleUrlParam.split(',');
    return featuresActive.includes(feature);
}