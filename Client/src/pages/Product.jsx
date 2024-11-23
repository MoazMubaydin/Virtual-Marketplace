import { Badge, Button, Card, Group } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Product() {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { productId } = useParams();
  const [product, setProduct] = useState();
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(`${DB_URL}/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      {product && (
        <Card>
          <Card.Section>
            <img src={product.images[0]} alt={product.name} />
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <p>{product.name}</p>
            <Badge color="green">{product.price}</Badge>
          </Group>
          <p>{product.description || "Product does not have a description"}</p>
          <Button color="blue" mt="md" radius="md">
            Add to shopping cart
          </Button>
        </Card>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}
