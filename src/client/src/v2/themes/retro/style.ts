import { ThemeStyles } from '../../components/ui/Theme';
import defaultStyle from '../default/style';

const theme: ThemeStyles = {
  ...defaultStyle,
  fontFamily: {
    feature: "'8BitWonder', sans-serif",
  },
  color: {
    ...defaultStyle.color,
    text01: '#E40010',
    text02: '#FFF',
    text03: '#FFF',
    border01: '#F5AC27',
    background01: '#000',
    background02: '#2A3492',
    background03: '#EF4423',
  },
};

export default theme;
