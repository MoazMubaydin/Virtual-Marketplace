import { useState } from "react";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Order() {
  const [order, setOrder] = useState();
  const [error, setError] = useState();

  const getOrder = async () => {
    try {
      const response = await axios.get(`${DB_URL}/api/orders`);
      console.log(response);
    } catch (error) {
      setError(error);
    }
  };
}
