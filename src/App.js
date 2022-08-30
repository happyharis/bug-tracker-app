import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Login from "./pages/Login";
import Board from "./pages/Board";
import BoardBootstrap from "./pages/BoardBootstrap";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<Dashboard />} />
        <Route path="board" element={<Board />} />
        <Route path="board-bs" element={<BoardBootstrap />} />
      </Routes>
    </div>
  );
}

export default App;
