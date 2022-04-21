import './App.css';
import Login from './components/login';
import Home from './components/home';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>;
      <Route path="/home" element={<Home />}></Route>;
    </Routes >
  );
}

export default App;