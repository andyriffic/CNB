import { ThemeStyles } from '../../components/ui/Theme';
import defaultStyle from '../default/style';

const theme: ThemeStyles = {
  ...defaultStyle,
  fontFamily: {
    ...defaultStyle.fontFamily,
    feature: "'Creepster', cursive",
  },
  color: {
    ...defaultStyle.color,
    text01: '#5E32BA',
    text03: '#BFDA7A',
    border01: '#E9804D',
    background01: '#cccccc',
    background02: '#666666',
    background03: '#EB6123',
  },
};

export default theme;
