import { Button, Table, Image } from "@mantine/core";

export default function Cart({ cart }) {
  const rows = cart.map((product, i) => (
    <Table.Tr key={product._id}>
      <Table.Td>{i}</Table.Td>
      <Table.Td>
        <Image src={product.image} height={50} radius="md" />
      </Table.Td>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.quantity}</Table.Td>
      <Table.Td>{product.price}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table.ScrollContainer minWidth={500}>
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
      <Button>Place Order</Button>
    </>
  );
}
