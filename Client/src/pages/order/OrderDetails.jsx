import { Button, Table, Image, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function OrderDetails({}) {
  const [totalPrice, setTotalPrice] = useState();
  const [items, setItems] = useState();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const getOrder = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await axios.get(`${DB_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(response.data);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  useEffect(() => {
    if (items) {
      const total = items.products.reduce(
        (sum, item) => (sum += item.price),
        0
      );
      setTotalPrice(total);
    }
  }, [items]);
  if (!items || items.products.length === 0) {
    return <p>no products</p>;
  }

  const rows = items.products.map((product, i) => {
    return (
      <Table.Tr key={i}>
        <Table.Td>{i}</Table.Td>
        <Table.Td>
          <Image src={product.productId.image} height={50} radius="md" />
        </Table.Td>
        <Table.Td>{product.name}</Table.Td>
        <Table.Td>{product.quantity}</Table.Td>

        <Table.Td>{product.price * product.quantity + "€"}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Table.ScrollContainer minWidth={800}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Image</Table.Th>
              <Table.Th>Item</Table.Th>
              <Table.Th>Quantity</Table.Th>

              <Table.Th>Price</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Group>
        <h3>Total price spent: {totalPrice} €</h3>
        <Button onClick={() => navigate("/user/orders")} ml={30}>
          Return
        </Button>
      </Group>
    </>
  );
}
