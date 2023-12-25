import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserRoutes from "../src/routes/userRoutes";
import './App.css';
import { Login } from './pages/Login';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<Login/>}/>
    <Route path="/user/*" element={<UserRoutes/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
