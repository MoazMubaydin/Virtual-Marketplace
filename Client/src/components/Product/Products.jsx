import { Badge, Button, Card, Group } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "./products.css";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import axios from "axios";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Products({ products, errorMessage, setErrorMessage }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const notify = () => toast.success("Item deleted");
  const navigate = useNavigate();
  const location = useLocation();
  const deleteProduct = async (productId) => {
    try {
      console.log(productId);
      const response = await axios.delete(
        `${DB_URL}/api/products/${productId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  return (
    <div className="cardPage">
      {products &&
        products.map((product) => {
          return (
            <div key={product._id} className="cardHP">
              <Card radius="lg" withBorder>
                <Card.Section>
                  <img src={product.image} alt={product.name} />
                </Card.Section>
                <Group justify="space-between" mt="md" className="name">
                  <h4>{product.name}</h4>
                  <Badge color="green" size="lg">
                    {product.price}
                  </Badge>
                </Group>
                <p className="description">
                  {product.description || "Product does not have a description"}
                </p>
                {isLoggedIn &&
                location.pathname === `/user/products/${user._id}` ? (
                  <Group>
                    <Button color="blue" radius="md">
                      Edit
                    </Button>
                    <Button
                      color="blue"
                      variant="outline"
                      radius="md"
                      onClick={() => {
                        deleteProduct(product._id);
                        notify();
                      }}
                    >
                      Delete
                    </Button>
                  </Group>
                ) : (
                  <Group>
                    <Button
                      color="blue"
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
                      variant="outline"
                      radius="md"
                      onClick={() => {
                        navigate(`/products/${product._id}`);
                      }}
                    >
                      More details
                    </Button>
                  </Group>
                )}
              </Card>
            </div>
          );
        })}
      <ToastContainer
        className="toast"
        position="bottom-right"
        autoClose={2000}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
