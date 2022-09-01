import "./App.css";
import Dashboard from "containers/Dashboard";
import { Routes, Route } from "react-router-dom";
import CountryDetail from "containers/CountryDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/detail/:code" element={<CountryDetail />} />
    </Routes>
  );
}

export default App;
