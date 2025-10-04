import {Routes,Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';

function App () {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path='/recipe/:recipeId' element={< RecipePage/>} />
      </Routes>
    </div>
  );
}

export default App;