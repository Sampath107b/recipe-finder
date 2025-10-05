import {Routes,Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
function App () {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path='/recipe/:recipeId' element={< RecipePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;