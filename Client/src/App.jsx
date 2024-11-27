import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Home from "./pages/home/Home";
import Product from "./pages/productCard/ProductCard";
import UserProducts from "./pages/userProducts/UserProducts";
import Cart from "./pages/cart/Cart";
function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(null);

  const addItem = (item) => {
    cart.push(item);
    setCart(cart);
    console.log(cart);
  };
  return (
    <div className="App">
      <Navbar cart={cart} setProducts={setProducts} />
      <Routes>
        <Route path="/" element={<Home callbackToAddItem={addItem} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products/:productId"
          element={<Product callbackToAddItem={addItem} />}
        />
        <Route
          path="/user/shopping-cart/:userId"
          element={<Cart cart={cart} />}
        />
        <Route
          path="/user/products/:userId"
          element={
            <UserProducts products={products} setProducts={setProducts} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
