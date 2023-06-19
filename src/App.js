import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import { ThemeProvider } from '@mui/material';
import AppRouter from './router/AppRouter';
import { theme } from './themes/theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
    
  );
}

export default App;