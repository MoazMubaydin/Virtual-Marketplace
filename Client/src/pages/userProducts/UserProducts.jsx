import { Badge, Button, Card, Group } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function UserProducts() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [products, setProducts] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await axios.get(`${DB_URL}/api/user/products/${userId}`);
      if ("products" in response.data) {
        console.log(response.data.products);
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="homepage">
      {products ? (
        products.map((product) => {
          return (
            <div key={product._id} className="cardHP">
              <Card>
                <Card.Section>
                  <img src={product.image} alt={product.name} />
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
                    onClick={() => callbackToAddItem(product)}
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
        })
      ) : (
        <p>no products yet</p>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
