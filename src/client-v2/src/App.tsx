import { ThemeProvider } from 'styled-components';
import theme from './themes/default';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestScreen } from './screens/test';
import { GroupJoinScreen } from './screens/group-join';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingScreen>
        <BrowserRouter>
          <Routes>
            <Route path="/v2" element={<TestScreen />} />
            <Route path="/v2/group" element={<GroupJoinScreen />} />
          </Routes>
        </BrowserRouter>
      </LoadingScreen>
    </ThemeProvider>
  );
}

export default App;
