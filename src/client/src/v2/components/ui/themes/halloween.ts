import { ThemeStyles } from '../Theme';
import defaultTheme from './default';

const theme: ThemeStyles = {
  ...defaultTheme,
  fontFamily: {
    feature: "'Creepster', cursive",
  },
  color: {
    ...defaultTheme.color,
    text01: '#5E32BA',
    text03: '#BFDA7A',
    border01: '#E9804D',
    background01: '#cccccc',
    background02: '#666666',
    background03: '#EB6123',
  },
};

export default theme;
