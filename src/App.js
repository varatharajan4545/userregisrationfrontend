import logo from './logo.svg';
import './App.css';
import Login from './pages/Login'
import Register from './pages/Register';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { ProtectedRoute } from './componets/protectedroute';
function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />

    </Routes>
  );
}

export default App;
