import { ThemeStyles } from '../../components/ui/Theme';
import defaultStyle from '../default/style';

const theme: ThemeStyles = {
  ...defaultStyle,
  color: {
    ...defaultStyle.color,
    text01: '#E40010',
    text02: '#FFFFFF',
    text03: '#FFFFFF',
    border01: '#FFFFFF',
    background01: '#1FD537',
    background02: '#00B32C',
    background03: '#B3000C',
  },
};

export default theme;
