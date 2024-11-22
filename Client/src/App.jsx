import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products/:productId"
          element={<Product callbackToAddItem={addItem} />}
        />
      </Routes>
    </div>
  );
}

export default App;
