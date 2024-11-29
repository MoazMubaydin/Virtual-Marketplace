import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../../components/Product/Products";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function UserProducts({ setProducts, products }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { userId } = useParams();
  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await axios.delete(
        `${DB_URL}/api/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="homepage">
      <Products
        setProducts={setProducts}
        products={products}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        deleteProduct={deleteProduct}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
