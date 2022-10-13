import { isWhiteSpaceLike } from 'typescript';
import { ThemeStyles } from '../../components/ui/Theme';

const theme: ThemeStyles = {
  fontFamily: {
    feature: "'Bubblegum Sans', cursive",
    numbers: "'Changa One', cursive",
  },
  color: {
    primaryBackground: '#31aae0',
    background01: '#2193b0',
    background02: '#6dd5ed',
    background03: '#f7b004',
    text01: '#ff7f50',
    text02: '#000000',
    text03: '#ffffff',
    border01: '#000000',
    points: {
      backgroundVariant01: 'steelblue',
      backgroundVariant02: 'darkkhaki',
      backgroundVariant03: 'goldenrod',
    },
    gasGame: {
      cardTextColor01: 'crimson',
      cardBorderColor: 'white',
      cardBackgroundColor: 'greenyellow',
      cardTextColorSpecial: '#EFB9AD',
      cardBackgroundColorSpecial: '#680003',
    },
  },
  fontSize: {
    extraSmall: '0.4rem',
    smallish: '0.55rem',
    small: '0.8rem',
    medium: '1rem',
    large: '1.5rem',
    extraLarge: '3rem',
  },
};

export default theme;
