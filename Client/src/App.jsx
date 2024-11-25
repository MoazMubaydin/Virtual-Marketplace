import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
import UserProducts from "./pages/userProducts/UserProducts";
function App() {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    cart.push(item);
    setCart(cart);
    console.log(cart);
  };
  return (
    <div className="App">
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home callbackToAddItem={addItem} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products/:productId"
          element={<Product callbackToAddItem={addItem} />}
        />
        <Route path="/user/products/:userId" element={<UserProducts />} />
      </Routes>
    </div>
  );
}

export default App;
