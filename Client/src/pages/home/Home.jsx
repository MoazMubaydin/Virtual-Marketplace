import axios from "axios";

import "./home.css";
import { useEffect, useState } from "react";
import Products from "../../components/Product/Products";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Home({ callbackToAddItem }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get(`${DB_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="homepage">
      <Products
        products={products}
        errorMessage={errorMessage}
        callbackToAddItem={callbackToAddItem}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
