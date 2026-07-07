import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import StoreContextProvider from './context/StoreContext.jsx';
import './index.css';
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </Provider>
  </BrowserRouter>,
);
