import { useEffect, useState } from "react";
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
  const [userProducts, setUserProducts] = useState(null);
  const [query, setQuery] = useState("");
  const [userfiltered, setUserFiltered] = useState(userProducts);
  const [homeProducts, setHomeProducts] = useState(null);
  const [homefiltered, setHomeFiltered] = useState(homeProducts);
  const [itemNum, setItemNum] = useState();

  useEffect(() => {
    if (userProducts) {
      setUserFiltered(
        userProducts.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        })
      );
    }
    if (homeProducts) {
      setHomeFiltered(
        homeProducts.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        })
      );
    }
  }, [query, userProducts, homeProducts]);
  useEffect(() => {
    updateBagNum();
  }, [cart]);

  const updateBagNum = () => {
    const newNum = cart.reduce((sum, item) => (sum += item.quantity), 0);
    setItemNum(newNum);
  };
  const addItem = (newItem) => {
    const existingItemIndex = cart.findIndex(
      (item) => item._id === newItem._id
    );
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += newItem.quantity || 1;
    } else {
      setCart([...cart, { ...newItem, quantity: 1 }]);
    }
    updateBagNum();
  };
  return (
    <div className="App">
      <Navbar
        cart={cart}
        setProducts={setUserProducts}
        products={userProducts}
        query={query}
        setQuery={setQuery}
        itemNum={itemNum}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              callbackToAddItem={addItem}
              products={homefiltered}
              setProducts={setHomeProducts}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products/:productId"
          element={<Product callbackToAddItem={addItem} />}
        />
        <Route
          path="/user/shopping-cart/:userId"
          element={<Cart cart={cart} setCart={setCart} />}
        />
        <Route
          path="/user/products/:userId"
          element={
            <UserProducts
              products={userfiltered}
              setProducts={setUserProducts}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
