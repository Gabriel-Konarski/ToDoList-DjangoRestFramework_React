import './App.css';

import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'

// Pages
import ListsPage from './pages/ListsPage'
import ListPage from './pages/ListPage'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<ListsPage />} />
            <Route path='/list/:id' element={<ListPage />} />
          </Route>
          <Route path='login/' element={<LoginPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
