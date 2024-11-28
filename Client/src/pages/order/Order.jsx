import { Card, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function Order() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await axios.get(`${DB_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      setError(error);
    }
  };
  if (!orders || orders.length === 0) {
    return <p>You have no orders</p>;
  }
  const rows = orders.map((order, i) => {
    return (
      <Table.Tr key={order._id}>
        <Table.Td>{i}</Table.Td>
        <Table.Td>{order.createdAt}</Table.Td>
        <Table.Td>{order.products.length}</Table.Td>
      </Table.Tr>
    );
  });
  return (
    <>
      <Table.ScrollContainer minWidth={500}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Ordered At</Table.Th>
              <Table.Th>number of items</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
