import { ThemeStyles } from '../../components/ui/Theme';
import defaultStyle from '../default/style';

const theme: ThemeStyles = {
  ...defaultStyle,
  fontFamily: {
    feature: "'ChineseDragon', cursive",
  },
  color: {
    ...defaultStyle.color,
    text01: '#E40010',
    text02: '#A3262A',
    text03: '#A3262A',
    border01: '#F5AC27',
    background01: '#F5AC27',
    background02: '#CC232A',
    background03: '#FFD84B',
  },
};

export default theme;
