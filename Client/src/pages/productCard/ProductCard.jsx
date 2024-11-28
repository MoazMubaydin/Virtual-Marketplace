import { Badge, Button, Card, Group, Image } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productCard.css";
import { toast, ToastContainer } from "react-toastify";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Product({ callbackToAddItem }) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const notify = (name) =>
    toast(
      <div>
        <p>{name} successfully added to shopping bag</p>
        <Button onClick={() => navigate(`/user/shopping-cart/${user._id}`)}>
          Shopping bag
        </Button>
      </div>
    );
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
            <Image src={product.image} height={400} alt={product.name} />
          </Card.Section>
          <Group justify="space-between" mt="md" mb="xs">
            <p>{product.name}</p>
            <Badge color="green">{product.price}</Badge>
          </Group>
          <p>{product.description || "Product does not have a description"}</p>
          <Button
            color="blue"
            mt="md"
            radius="md"
            onClick={() => {
              callbackToAddItem(product);

              notify(product.name);
            }}
          >
            Add to shopping cart
          </Button>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss={false}
            pauseOnHover={true}
            transition:Bounce
          />
        </Card>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}
