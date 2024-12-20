import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Home from "./pages/home/Home";
import Product from "./pages/productCard/ProductCard";
import UserProducts from "./pages/userProducts/UserProducts";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import OrderDetails from "./pages/order/OrderDetails";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
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
        setUserProducts={setUserProducts}
        setHomeProducts={setHomeProducts}
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
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route path="/user/orders" element={<Order />} />

        <Route
          path="/products/:productId"
          element={<Product callbackToAddItem={addItem} />}
        />
        <Route
          path="/user/shopping-cart/:userId"
          element={
            <IsPrivate>
              <Cart cart={cart} setCart={setCart} />
            </IsPrivate>
          }
        />
        <Route
          path="/user/orders/:orderId"
          element={
            <IsPrivate>
              <OrderDetails cart={cart} setCart={setCart} />
            </IsPrivate>
          }
        />
        <Route
          path="/user/products/:userId"
          element={
            <IsPrivate>
              <UserProducts
                products={userfiltered}
                setProducts={setUserProducts}
              />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
