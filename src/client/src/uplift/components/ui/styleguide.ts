import tinyColor from 'tinycolor2';

export const primaryBackgroundColorHex = '#31aae0';
export const primaryBackgroundColorDarkHex = tinyColor(
  primaryBackgroundColorHex
)
  .darken(15)
  .toString();

export const primaryBackgroundColorLightHex = tinyColor(
  primaryBackgroundColorHex
)
  .lighten(15)
  .toString();

export const primaryTextColorHex = '#ffffff';
export const primaryTextColor_variant_2_Hex = tinyColor(primaryTextColorHex)
  .darken(10)
  .toString();

export const featureTextColorHex = '#F64609';
