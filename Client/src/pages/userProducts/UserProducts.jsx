import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../../components/Product/Products";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function UserProducts() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [products, setProducts] = useState(null);
  const { userId } = useParams();
  const deleteProduct = async (productId) => {
    try {
      console.log(productId);
      const response = await axios.delete(
        `${DB_URL}/api/products/${productId}`
      );
      getProducts();
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get(`${DB_URL}/api/user/products/${userId}`);
      if ("products" in response.data) {
        setProducts(response.data.products);
      }
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
        setErrorMessage={setErrorMessage}
        deleteProduct={deleteProduct}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
