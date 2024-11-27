import { Badge, Button, Card, Group, Image } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "./products.css";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Products({
  products,
  errorMessage,
  deleteProduct,
  callbackToAddItem,
}) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const notify = () => toast.success("Item deleted");
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="cardPage">
      {products &&
        products.map((product) => {
          return (
            <div key={product._id}>
              <Card radius="lg" withBorder m="md" className="cardHP">
                <Card.Section>
                  <Image src={product.image} height={160} alt={product.name} />
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

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
