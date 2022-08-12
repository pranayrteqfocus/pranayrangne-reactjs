import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./pages/details";
import Home from "./pages/home";
import Register from "./pages/register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/details:id" element={<Details/>} />
          <Route path="/register" element={<Register/>} />
          {/* <Route path="expenses" element={<Expenses />} />
      <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
