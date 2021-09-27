import { BrowserRouter as Router } from 'react-router-dom'
import RoutesManager from './routes';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <Router>
      <Header></Header>
      <RoutesManager />
    </Router>
    
  );
}

export default App;

