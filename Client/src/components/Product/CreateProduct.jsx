import {
  Button,
  FileInput,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import { useState } from "react";
const DB_URL = import.meta.env.VITE_DATABASE_API_URL;

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategoroy] = useState("");
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState(1);

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const priceChange = (value) => {
    setPrice(value);
  };
  const categoryChange = (value) => {
    setCategoroy(value);
  };

  const stockChange = (value) => {
    setStock(value);
  };
  const handleFileChange = (files) => {
    const fileNames = files.map((file) => file.name);
    setImages(fileNames);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = { name, description, price, category, images, stock };
    console.log("Payload being sent:", newItem);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.post(`${DB_URL}/api/products`, newItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setName("");
    setDescription("");
    setPrice(0);
    setCategoroy("");
    setImages([]);
    setStock(1);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        required
        value={name}
        onChange={nameChange}
        placeholder="Enter the products name"
      />
      <Textarea
        resize="vertical"
        label="Description"
        placeholder="Product description"
        value={description}
        onChange={descriptionChange}
      />
      <NumberInput
        required
        label="Price"
        placeholder="Euro"
        prefix="€"
        mb="md"
        value={price}
        onChange={priceChange || 0.0}
      />
      <NumberInput
        label="Stock"
        required
        placeholder="stock"
        suffix=" Items in stock"
        mt="md"
        value={stock}
        onChange={stockChange || 1}
      />
      <Select
        label="Category"
        required
        placeholder="Pick value"
        data={["food", "pottery", "jewelry, clothing", "art"]}
        value={category}
        onChange={categoryChange}
        searchable
      />
      <FileInput
        label="Upload images"
        placeholder="Upload images"
        multiple
        value={images}
        onChange={handleFileChange}
      />
      <Button onClick={handleSubmit}>Create Product</Button>
    </form>
  );
}
