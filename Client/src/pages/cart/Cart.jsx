import { Button, Table, Image, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Cart({ cart, setCart }) {
  const [totalPrice, setTotalPrice] = useState();
  const removeItem = (item) => {
    cart.splice(item, 1);
    setCart([...cart]);
  };
  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cart]);
  const rows = cart.map((product, i) => {
    return (
      <Table.Tr key={i}>
        <Table.Td>{i}</Table.Td>
        <Table.Td>
          <Image src={product.image} height={50} radius="md" />
        </Table.Td>
        <Table.Td>{product.name}</Table.Td>
        <Table.Td>{product.quantity}</Table.Td>

        <Table.Td>{product.price * product.quantity + "€"}</Table.Td>
        <Table.Td>
          <IconTrash color="red" stroke={1} onClick={() => removeItem(i)} />
        </Table.Td>
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
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Group>
        <h3>Total Price: {totalPrice} €</h3>
        <Button ml={30}>Place Order</Button>
      </Group>
    </>
  );
}
