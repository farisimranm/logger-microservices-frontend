import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import { ThemeProvider, createTheme } from '@mui/material';
import AppRouter from './router/AppRouter';

const theme = createTheme();

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