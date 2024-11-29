import { Badge, Button, Card, Group, Image, Modal, Text } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import EditProduct from "./EditProduct";
import { useLocation, useNavigate } from "react-router-dom";
import "./products.css";
import { AuthContext } from "../../context/auth.context";
import { useContext, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
export default function Products({
  products,
  setProducts,
  errorMessage,
  deleteProduct,
  callbackToAddItem,
}) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const notify = (name) =>
    toast(
      <div>
        <p>{name} successfully added to shopping bag</p>
        <Button onClick={() => navigate(`/user/shopping-cart/${user._id}`)}>
          Shopping bag
        </Button>
      </div>
    );
  const notifyDelete = (name) => toast(<p>{name} successfully Deleted</p>);
  const navigate = useNavigate();
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [productToUpdate, setProductToUpdate] = useState("");
  return (
    <div className="cardPage">
      <Modal opened={opened} onClose={close} title="Update Product">
        <EditProduct
          close={close}
          product={productToUpdate}
          setProducts={setProducts}
        />
      </Modal>
      <Modal opened={authModalOpen} onClose={() => setAuthModalOpen(false)}>
        <Text align="center" weight={500} size="lg" mb={20}>
          Login or signup to add item to bag
        </Text>
        <Group justify="center" gap="lg">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/signup")}>Signup</Button>
        </Group>
      </Modal>
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
                    <Button
                      id="button"
                      color="blue"
                      variant="outline"
                      radius="md"
                      mr={40}
                      onClick={() => {
                        navigate(`/products/${product._id}`);
                      }}
                    >
                      More details
                    </Button>
                    <IconEdit
                      className="clickable"
                      color="#c2c2c2"
                      radius="md"
                      stroke={1.25}
                      onClick={() => {
                        setProductToUpdate(product);
                        open();
                      }}
                    />
                    <IconTrash
                      className="clickable"
                      color="red"
                      stroke={1}
                      variant="outline"
                      radius="md"
                      onClick={() => {
                        deleteProduct(product._id);
                        notifyDelete();
                      }}
                    />
                  </Group>
                ) : (
                  <Group>
                    <Button
                      color="blue"
                      radius="md"
                      onClick={() => {
                        if (isLoggedIn) {
                          callbackToAddItem(product);
                          notify(product.name);
                        } else {
                          setAuthModalOpen(true);
                        }
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
        })}{" "}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={true}
        transition:Bounce
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
