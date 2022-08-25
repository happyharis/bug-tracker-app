import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./App.css";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
