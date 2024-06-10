import { HashRouter as Router, Route } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
import MovieDescription from '../MovieDescription/MovieDescription';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path='/movie-description/:id'>
          {/* Details page */}
          <MovieDescription />
        </Route>

        {/* Add Movie page */}
        
      </Router>
    </div>
  );
}

export default App;
