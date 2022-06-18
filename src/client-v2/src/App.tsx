import { ThemeProvider } from 'styled-components';
import theme from './themes/default';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TestScreen } from './screens/test';
import { GroupJoinScreen } from './screens/group-join';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/v2" element={<TestScreen />} />
          <Route path="/v2/group" element={<GroupJoinScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
