import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import Layout from "./Components/Layout";
import Carcard from "./Components/Carcard";
import Adminpan from "./Components/Adminpan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Carcard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminpan" element={<Adminpan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
