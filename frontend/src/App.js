import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { AdminPage } from './Components/AdminPage';
import { LandingPage } from './Components/LandingPage';
import { MarketPlace } from './Components/MarketPlace';

function App() {
  return (
    <BrowserRouter>
      <Route
        exact
        path="/"
        render={() => (
          <LandingPage />
        )}
      />
      <Route
        path="/market/:branch"
        render={() => (
          <MarketPlace />
        )}
      />
      <Route
        path="/admin/:branch"
        render={() => (
          <AdminPage />
        )}
      />
    </BrowserRouter>
  );
}

export default App;
