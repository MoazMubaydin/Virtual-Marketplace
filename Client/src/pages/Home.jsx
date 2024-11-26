import { Badge, Button, Card, Group } from "@mantine/core";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Home({ callbackToAddItem }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [products, setProducts] = useState(null);
  const notify = () => toast.success("Item added");

  const navigate = useNavigate();

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
      <ToastContainer position="bottom-right" autoClose={2000} closeOnClick />
      {products &&
        products.map((product) => {
          return (
            <div key={product._id} className="cardHP">
              <Card>
                <Card.Section>
                  <img src={product.images[0]} alt={product.name} />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                  <p>{product.name}</p>
                  <Badge color="green">{product.price}</Badge>
                </Group>
                <p>
                  {product.description || "Product does not have a description"}
                </p>
                <Group>
                  <Button
                    color="blue"
                    mt="md"
                    radius="md"
                    onClick={() => {
                      callbackToAddItem(product);

                      notify();
                    }}
                  >
                    Add to shopping cart
                  </Button>
                  <Button
                    color="blue"
                    mt="md"
                    radius="md"
                    onClick={() => {
                      navigate(`/products/${product._id}`);
                    }}
                  >
                    more Details
                  </Button>
                </Group>
              </Card>
            </div>
          );
        })}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
