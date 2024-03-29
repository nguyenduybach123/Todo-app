import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import components
import GlobalStyles from './components/GlobalStyles';
import { TodoProvider } from './context/TodoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </TodoProvider>
  </React.StrictMode>
);


