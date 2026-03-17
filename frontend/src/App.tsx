import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import UserManagementPage from './components/UserManagementPage';

// BAD: App-level styled-components not used — just inline styles
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Header />
        <UserManagementPage />
      </div>
    </Provider>
  );
};

export default App;
