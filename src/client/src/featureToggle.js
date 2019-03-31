/* @flow */
import React from 'react';
import type { Node } from 'react';
export type IsFeatureEnabled = string => boolean;

type Props = {
  children: boolean => Node,
  feature: string,
};

export const isFeatureEnabled: IsFeatureEnabled = feature => {
  var urlParams = new URLSearchParams(window.location.search);

  const featureToggleUrlParam = urlParams.get('feature');
  if (!featureToggleUrlParam) {
    return false;
  }

  const featuresActive = featureToggleUrlParam.split(',');
  return featuresActive.includes(feature);
};

export const FeatureToggle = ({ children, feature }: Props) => {
  return <React.Fragment>{children(isFeatureEnabled(feature))}</React.Fragment>;
};
